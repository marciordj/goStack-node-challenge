const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //TODO
});

app.post("/repositories", (request, response) => {
  const {title, techs, url} = request.body;

  const newRepository = {id: uuid(), title, techs, url}

  repositories.push(newRepository)

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
