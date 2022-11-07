import todoCollection from "../db/conn"
import { Request, Response } from "express";
import { Todo } from "../types";

export const getAllTodos = async (req: Request, res: Response) => {
    todoCollection
        .find({})
        .sort({_id: -1})
        .toArray()
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error fetching todos!");
        });
    };
export const createTodo = async (req: Request, res: Response) => {
    const todo: Todo = req.body.todo ;
    todoCollection
        .insertOne(todo)
        .then(() => {
        res.json(todo);
        })
        .catch(() => {
        res.status(400).send("Error creating todo!");
        });
    };
export const updateTodoById = async (req: Request, res: Response) => {
    const _id = Number(req.params.id);
    const { isChecked } = req.body;
    todoCollection
        .updateOne({ _id }, { $set: { status: isChecked ? "completed" : "active" } })
        .then(async (result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error update todo status!");
        });
    }
export const updateAllTodos = async (req: Request, res: Response) => {  
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
    };
export const deleteTodoById = async (req: Request, res: Response) => {
    const _id = Number(req.params.id);
    todoCollection
        .updateOne({ _id  }, { $set: { status: "deleted" } })
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error delete todo!");
        });
    };
export const deleteAllCompletedTodos = async (req: Request, res: Response) => {
    todoCollection
        .updateMany({ status: "completed" }, { $set: { status: "deleted" } })
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error delete all completed todos!");
        });
    }
