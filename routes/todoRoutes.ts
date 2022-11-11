import express from "express";
import { TodoController } from "../controller/todoController";

const todoRoutes = express.Router();
const todoController = new TodoController();

todoRoutes.get("/todos", todoController.getAllTodos);

todoRoutes.post("/todos", todoController.createATodo);

todoRoutes.delete("/todos/:id", todoController.deleteATodoById);

// todoRoutes.delete("/todos/",todoController.deleteAllCompletedTodos);

todoRoutes.put("/todos/:id", todoController.updateATodoById);

todoRoutes.put("/todos", todoController.updateAllTodos);

module.exports = todoRoutes;
