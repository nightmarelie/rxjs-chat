const express = require("express");
const http = require("http");
const Bundler = require("parcel-bundler");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
} else {
  const bundler = new Bundler("client/index.html");
  app.use(bundler.middleware());
}

const server = http.createServer(app);

module.exports = server;
