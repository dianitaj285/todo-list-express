const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const App = express();
const { TodoList } = require("./models");

App.use(bodyParser.json());

App.listen(PORT, console.log("Server running"));

function validateBody(req, res, next) {
  if (req.body !== null) {
    next();
  } else {
    next(new Error("No se puede enviar algo vacio"));
  }
}
App.post("/todos", validateBody, (req, res) => {
  console.log(req.body);
  TodoList.create(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

App.get("/todos", (req, res) => {
  TodoList.findAll()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

App.delete("/todos/:id", (req, res) => {
  console.log(req.params);
  TodoList.destroy({ where: { id: req.params.id } })
    .then((result) => res.send({ ok: true, count: result }))
    .catch((err) => res.send(err));
});
