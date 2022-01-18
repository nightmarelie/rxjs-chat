import { of } from "rxjs";
import { emitOnConnection, listenOnConnection } from "./connection";
import { getUsername, addUser } from "./utilities";

const username$ = of(getUsername());

emitOnConnection(username$).subscribe(({ socket, data }) => {
  const username = data;

  socket.emit("save username", username);
});

listenOnConnection("new user").subscribe(({ id, username }) => {
  addUser(id, username);
});

listenOnConnection("hello").subscribe(({ id, username }) => {
  addUser(id, username);
});
