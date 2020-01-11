const express = require("express");
const projectsRouter = require("./data/API/projectsRouter");
const actionsRouter = require("./data/API/actionsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>My Sprint Challenge Server Is Running</h1>");
});

// Middleware...
server.use(logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
  next();
}

module.exports = server;
