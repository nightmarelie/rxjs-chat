import { of, fromEvent } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import io from "socket.io-client";

const socket$ = of(io());

const connection$ = socket$.pipe(
  switchMap((socket) => fromEvent(socket, "connect").pipe(map(() => socket)))
);
