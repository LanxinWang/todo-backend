const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /todos.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

recordRoutes.route("/todos").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("todoTasks")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching todos!");
      } else {
        console.log("get all todo tasks");
        res.json(result);
      }
    });
});

recordRoutes.post("/todos/create", async (req, res) => {
  const { todo } = req.body;
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("todoTasks")
    .insertOne(todo)
    .then((result) => {
      console.log("create a new todo");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error creating todo!");
    });
});

module.exports = recordRoutes;
