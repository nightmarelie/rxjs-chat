const { of, fromEvent } = require("rxjs");
const { map, switchMap, mergeMap } = require("rxjs/operators");
const io = require("socket.io");
const server = require("./server");

// init socket io and wrap it in observable
const io$ = of(io(server));

// stream of connections for client
const connection$ = io$.pipe(
  switchMap((io) =>
    fromEvent(io, "connection").pipe(map((client) => ({ io, client })))
  )
);

const disconnect$ = connection$.pipe(
  mergeMap(({ client }) =>
    fromEvent(client, "disconnect").pipe(map(() => client))
  )
);

module.exports = {
  connection$,
  disconnect$,
};
