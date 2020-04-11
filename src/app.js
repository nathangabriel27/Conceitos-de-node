const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
  // TODO
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository)

  return response.json(repository)

  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(400).json({ error: "Projetc not found" })
  }
  repository.title = title;
  repository.url = url;
  repository.techs = techs;


  return response.json(repository)

  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repository = repositories.findIndex(repository => repository.id === id)

  if (repository < 0) {
    return response.status(400).json({ error: "Projetc not found" })
  }

  repositories.splice(repository, 1)
  return response.status(204).send()

  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repository = repositories.find(repository => repository.id === id)


  if (!repository) {
    return response.status(400).send();
  }
  repository.likes += 1

  return response.json(repository)
  // TODO
});

module.exports = app;
