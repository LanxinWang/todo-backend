import express from "express";
import { getAllTodos, createTodo, updateTodoById, updateAllTodos, deleteTodoById, deleteAllCompletedTodos } from "../controller/todoController";

const recordRoutes = express.Router();

recordRoutes.get("/todos", getAllTodos);

recordRoutes.post("/todos", createTodo);

recordRoutes.delete("/todos/:id", deleteTodoById);

recordRoutes.delete("/todos/",deleteAllCompletedTodos);

recordRoutes.put("/todos/:id", updateTodoById);

recordRoutes.put("/todos", updateAllTodos);

module.exports = recordRoutes;
