import express from "express";
import { TodoController } from "../controller/todoController";

const todoRoutes = express.Router();
const todoController = new TodoController();

todoRoutes.get("/todos", todoController.getAllTodos);

todoRoutes.post("/todos", todoController.createTodo);

todoRoutes.delete("/todos/:id", todoController.deleteTodoById);

todoRoutes.delete("/todos/",todoController.deleteAllCompletedTodos);

todoRoutes.put("/todos/:id", todoController.updateTodoById);

todoRoutes.put("/todos", todoController.updateAllTodos);

module.exports = todoRoutes;
