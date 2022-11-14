import { Request, Response } from "express";
import { ITodo } from "../types";
import {todoControllerInterface} from "./todoController.interface"
import { TodoService } from "../service/todoService";
export class TodoController implements todoControllerInterface {
    
    private _todoService: TodoService = new TodoService();

    public getAllTodos =  (req: Request, res: Response) => {
        this._todoService
        .getAllTodos()
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error fetching todos!");
        });
    }

    public createATodo = (req: Request, res: Response) => {
        const newTodo: ITodo = req.body.todo ;
        this._todoService
        .createATodo(newTodo)
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error creating todo!");
        });
    }

    public updateATodoById = (req: Request, res: Response) => {
        const _id = Number(req.params.id);
        const { isChecked } = req.body;
        this._todoService.updateATodoById(_id, isChecked)
            .then((result) => {
            res.json(result);
            })
            .catch(() => {
            res.status(400).send("Error update todo status!");
            });
    }
    
    public updateAllTodos = (req: Request, res: Response) => {
        const { isChecked, updateIds } = req.body;
        this._todoService.updateAllTodos(isChecked, updateIds)
        .then((result) => {
            res.json(result);
        })
        .catch(() => {
            res.status(400).send("Error update todos status!");
        });
    }

    public deleteATodoById = (req: Request, res: Response) => {
        const _id = Number(req.params.id);
        this._todoService.deleteATodoById(_id)
            .then((result) => {
            res.json(result);
            })
            .catch(() => {
            res.status(400).send("Error delete todo!");
            });
    }

    public deleteAllCompletedTodos = (req: Request, res: Response) => {
        const {deletedIds} = req.body;
        this._todoService.deleteAllCompletedTodos(deletedIds)
            .then((result) => {
                res.json(result);
            })
            .catch(() => {
                res.status(400).send("Error delete all completed todos!");
            });
    }

}