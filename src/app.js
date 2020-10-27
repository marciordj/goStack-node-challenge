const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');
const { isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({error: 'Invalid project id'})
  }

  return next()
}

app.get("/repositories", (request, response) => {
  const {title, techs, url} = request.query;

  const results = repositories;

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, techs, url} = request.body;

  const newRepository = {
    id: uuid(), 
    title, 
    url,
    techs, 
    likes: 0
  }

  repositories.push(newRepository)

  return response.json(newRepository);
});

app.put("/repositories/:id", validateProjectId, (request, response) => {
  const { id } = request.params;
  const {title, techs, url} = request.body;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'})
  }

  const updateRepo = {
    url,
    title,
    techs
  }

  repositories[repositoryIndex] = updateRepo;

  return response.json(updateRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repo not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return response.status(400)
  }

  repository.likes ++;

  return response.json(repository);
});

module.exports = app;
