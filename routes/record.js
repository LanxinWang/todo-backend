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
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error creating todo!");
    });
});

recordRoutes.route("/todos/delete").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const { id } = req.body;
  dbConnect
    .collection("todoTasks")
    .updateOne({ id }, { $set: { status: "deleted" } })
    .then((result) => {
      console.log("delete todo");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error delete todo!");
    });
});

recordRoutes.route("/todos/deleteCompleted").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("todoTasks")
    .updateMany({ status: "completed" }, { $set: { status: "deleted" } })
    .then((result) => {
      console.log("delete all completed todos");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error delete all completed todos!");
    });
});

recordRoutes.route("/todos/update").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const { id, isChecked } = req.body;
  dbConnect
    .collection("todoTasks")
    .updateOne({ id }, { $set: { status: isChecked ? "completed" : "active" } })
    .then((result) => {
      console.log("change the todo status");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error update todo status!");
    });
});

recordRoutes.route("/todos/updateAll").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const { isChecked } = req.body;
  dbConnect
    .collection("todoTasks")
    .updateMany(
      { status: { $nin: ["deleted"] } },
      { $set: { status: isChecked ? "completed" : "active" } }
    )
    .then((result) => {
      console.log("change the todos status");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error update todos status!");
    });
});

module.exports = recordRoutes;
