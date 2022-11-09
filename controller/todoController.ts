import todoCollection from "../db/conn"
import { Request, Response } from "express";
import { Todo } from "../types";
import {todoControllerInterface} from "./todoController.interface"
import { TodoService } from "../service/todoService";
export class TodoController implements todoControllerInterface {
    
    _todoService: TodoService = new TodoService();

    constructor(todoService: TodoService) {
        this._todoService = todoService;
        this.getAllTodos = this.getAllTodos.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.updateTodoById = this.updateTodoById.bind(this);
        this.updateAllTodos = this.updateAllTodos.bind(this);
        this.deleteTodoById = this.deleteTodoById.bind(this);
    }

    getAllTodos(req: Request, res: Response) {
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

    createTodo(req: Request, res: Response) {
        const todo: Todo = req.body.todo ;
        this._todoService
        .createTodo(todo)
        .then(() => {
        res.json(todo);
        })
        .catch(() => {
        res.status(400).send("Error creating todo!");
        });
    }

    updateTodoById(req: Request, res: Response) {
        const _id = Number(req.params.id);
        const { isChecked } = req.body;
        this._todoService.updateTodoById(_id, isChecked)
            .then((result) => {
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

    deleteTodoById(req: Request, res: Response) {
        const _id = Number(req.params.id);
        this._todoService.deleteTodoById(_id)
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