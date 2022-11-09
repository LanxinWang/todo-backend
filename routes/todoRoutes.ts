import express from "express";
import { getAllTodos, createTodo, updateTodoById, updateAllTodos, deleteTodoById, deleteAllCompletedTodos } from "../controller/todoController";

const todoRoutes = express.Router();

todoRoutes.get("/todos", getAllTodos);

todoRoutes.post("/todos", createTodo);

todoRoutes.delete("/todos/:id", deleteTodoById);

todoRoutes.delete("/todos/",deleteAllCompletedTodos);

todoRoutes.put("/todos/:id", updateTodoById);

todoRoutes.put("/todos", updateAllTodos);

module.exports = todoRoutes;
