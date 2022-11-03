import express from "express";
import todoCollection from "../db/conn";
import { Todo } from "../types";

const recordRoutes = express.Router();

recordRoutes.get("/todos", async (req, res) => {
  todoCollection
    .find({},{projection:{ _id: 1, name: 1, status: 1}})
    .sort({_id: -1})
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error fetching todos!");
    });
});

recordRoutes.post("/todos", async (req, res) => {
  const { todo } = req.body;
  todoCollection
    .insertOne(todo)
    .then(() => {
      res.json(todo);
    })
    .catch(() => {
      res.status(400).send("Error creating todo!");
    });
});

recordRoutes.delete("/todos/:id", async (req, res) => {
  const _id = Number(req.params.id);
  todoCollection
    .updateOne({ _id  }, { $set: { status: "deleted" } })
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error delete todo!");
    });
});

recordRoutes.delete("/todos/", async (req, res) => {
  todoCollection
    .updateMany({ status: "completed" }, { $set: { status: "deleted" } })
    .then((result) => {
      console.log("delete all completed todos");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error delete all completed todos!");
    });
});

recordRoutes.put("/todos/:id", async (req, res) => {
  const _id = Number(req.params.id);
  const { isChecked } = req.body;
  todoCollection
    .updateOne({ _id }, { $set: { status: isChecked ? "completed" : "active" } })
    .then((result) => {
      console.log("change the todo status");
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error update todo status!");
    });
});

recordRoutes.put("/todos", async (req, res) => {  
  const { isChecked } = req.body;
  todoCollection
    .updateMany(
      { status: { $nin: ["deleted"] } },
      { $set: { status: isChecked ? "completed" : "active" } }
    )
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.status(400).send("Error update todos status!");
    });
});

module.exports = recordRoutes;
