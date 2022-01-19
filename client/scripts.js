import { of } from "rxjs";
import { emitOnConnection, listenOnConnection } from "./connection";
import { getUsername, addUser, clearUsers, removeUser } from "./utilities";

const username$ = of(getUsername());

emitOnConnection(username$).subscribe(({ socket, data }) => {
  const username = data;

  socket.emit("save username", username);
});

listenOnConnection("new user").subscribe(({ id, username }) => {
  addUser(id, username);
});

listenOnConnection("all users").subscribe((users) => {
  clearUsers();
  [{ id: "everyone", username: "Everyone" }, ...users].forEach(
    ({ id, username }) => addUser(id, username)
  );
});

listenOnConnection("remove user").subscribe((id) => {
  removeUser(id);
});
