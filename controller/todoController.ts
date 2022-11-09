import todoCollection from "../db/conn"
import { Request, Response } from "express";
import { Todo } from "../types";
import {todoControllerInterface} from "./todoController.interface"
export class TodoController implements todoControllerInterface {
    public async getAllTodos(req: Request, res: Response) {
        //connect db
        //todoService.getAllTodos: Todo[]
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
    }
    public async createTodo(req: Request, res: Response) {
        const todo: Todo = req.body.todo ;
        todoCollection
        .insertOne(todo)
        .then(() => {
        res.json(todo);
        })
        .catch(() => {
        res.status(400).send("Error creating todo!");
        });
    }
    public async updateTodoById(req: Request, res: Response) {
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
    public async updateAllTodos(req: Request, res: Response) {
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
    }
    public async deleteTodoById(req: Request, res: Response) {
        const _id = Number(req.params.id);
        todoCollection
            .updateOne({ _id  }, { $set: { status: "deleted" } })
            .then((result) => {
            res.json(result);
            })
            .catch(() => {
            res.status(400).send("Error delete todo!");
            });
    }
    public async deleteAllCompletedTodos(req: Request, res: Response) {
        todoCollection
        .updateMany({ status: "completed" }, { $set: { status: "deleted" } })
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error delete all completed todos!");
        });
    }

}