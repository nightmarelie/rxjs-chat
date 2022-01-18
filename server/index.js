const server = require("./server");
const { connection$, disconnect$ } = require("./connection");

const PORT = 3000;

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));

connection$.subscribe(({ client }) => {
  console.log(`connected: ${client.id}`);
});

disconnect$.subscribe(({ client }) => {
  console.log(`disconnected: ${client.id}`);
});
