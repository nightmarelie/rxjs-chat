import { of } from "rxjs";
import { emitOnConnection, listenOnConnection } from "./connection";
import { getUsername } from "./utilities";

const username$ = of(getUsername());

emitOnConnection(username$).subscribe(({ socket, data }) => {
  const username = data;

  console.log(socket);

  socket.emit("save username", username);
});
