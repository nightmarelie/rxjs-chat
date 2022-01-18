const express = require("express");
const http = require("http");
const Bundler = require("parcel-bundler");

const app = express();

const bundler = new Bundler("client/index.html");
app.use(bundler.middleware());

const server = http.createServer(app);

module.exports = server;
