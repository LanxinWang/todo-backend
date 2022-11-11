import { Request, Response } from "express";
import { TodoService } from "../service/todoService";

export interface todoControllerInterface {
    getAllTodos(req: Request, res: Response): void;
    createATodo(req: Request, res: Response): void;
    updateATodoById(req: Request, res: Response): void;
    // updateAllTodos(req: Request, res: Response): void;
    // deleteTodoById(req: Request, res: Response): void;
    // deleteAllCompletedTodos(req: Request, res: Response): void;
}