import { of } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import { emitOnConnection, listenOnConnection } from "./connection";
import {
  getUsername,
  addUser,
  clearUsers,
  removeUser,
  clearUserInput,
  addMessage,
} from "./utilities";
import sendMessage$ from "./actions";

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

emitOnConnection(sendMessage$)
  .pipe(withLatestFrom(username$))
  .subscribe(([{ socket, data }, username]) => {
    const [message, id] = data;

    clearUserInput();
    addMessage(username, message);
    socket.emit("chat message", { id, message });
  });

listenOnConnection("chat message").subscribe(({ from, message }) => {
  addMessage(from, message);
});
