const server = require("./server");
const {
  connection$,
  disconnect$,
  listenOnConnection,
} = require("./connection");

const PORT = 3000;

connection$.subscribe(({ io, client }) => {
  const allSockets = io.sockets.sockets;

  const allUsers = Array.from(allSockets)
    .map(([id, socket]) => ({
      id,
      username: socket.username,
    }))
    .filter(({ username }) => username);

  client.emit("all users", allUsers);

  console.log(`connected: ${client.id}`);
});

listenOnConnection("save username").subscribe(({ io, client, data }) => {
  const allSockets = io.sockets.sockets;
  const id = client.id;
  const username = data;

  allSockets.get(id).username = username;

  client.broadcast.emit("new user", { id, username });
});

disconnect$.subscribe(({ client }) => {
  console.log(`disconnected: ${client.id}`);
});

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
