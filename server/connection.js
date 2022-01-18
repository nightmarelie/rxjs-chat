const { of, fromEvent } = require("rxjs");
const { map, switchMap, mergeMap, takeUntil } = require("rxjs/operators");
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

const listenOnConnection = (event) =>
  connection$.pipe(
    mergeMap(({ io, client }) =>
      fromEvent(client, event).pipe(
        takeUntil(fromEvent(client, "disconnect")),
        map((data) => ({ io, client, data }))
      )
    )
  );

module.exports = {
  connection$,
  disconnect$,
  listenOnConnection,
};
