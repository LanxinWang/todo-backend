// import todoCollection from "../db/conn"
import { Request, Response } from "express";
import { ITodo } from "../types";
import {todoControllerInterface} from "./todoController.interface"
import { TodoService } from "../service/todoService";
export class TodoController implements todoControllerInterface {
    
    private _todoService: TodoService = new TodoService();

    public getAllTodos =  (req: Request, res: Response) => {
        //connect db
        //todoService.getAllTodos: Todo[]
        this._todoService
        .getAllTodos()
        .then((result) => {
        res.json(result);
        })
        .catch(() => {
        res.status(400).send("Error fetching todos!");
        });
    }

    // public createTodo = (req: Request, res: Response) => {
    //     const todo: ITodo = req.body.todo ;
    //     this._todoService
    //     .createTodo(todo)
    //     .then(() => {
    //     res.json(todo);
    //     })
    //     .catch(() => {
    //     res.status(400).send("Error creating todo!");
    //     });
    // }

    // public updateTodoById = (req: Request, res: Response) => {
    //     const _id = Number(req.params.id);
    //     const { isChecked } = req.body;
    //     this._todoService.updateTodoById(_id, isChecked)
    //         .then((result) => {
    //         res.json(result);
    //         })
    //         .catch(() => {
    //         res.status(400).send("Error update todo status!");
    //         });
    // }
    
    // public updateAllTodos = (req: Request, res: Response) => {
    //     const { isChecked } = req.body;
    //     this._todoService.updateAllTodos(isChecked)
    //     .then((result) => {
    //     res.json(result);
    //     })
    //     .catch(() => {
    //     res.status(400).send("Error update todos status!");
    //     });
    // }

    // public deleteTodoById = (req: Request, res: Response) => {
    //     const _id = Number(req.params.id);
    //     this._todoService.deleteTodoById(_id)
    //         .then((result) => {
    //         res.json(result);
    //         })
    //         .catch(() => {
    //         res.status(400).send("Error delete todo!");
    //         });
    // }

    // public deleteAllCompletedTodos = (req: Request, res: Response) => {
    //     this._todoService.deleteAllCompletedTodos()
    //         .then((result) => {
    //         res.json(result);
    //         })
    //         .catch(() => {
    //         res.status(400).send("Error delete all completed todos!");
    //         });
    // }

}