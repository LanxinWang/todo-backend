import { Request, Response } from "express";

export interface todoControllerInterface {
    getAllTodos(req: Request, res: Response): void;
    createATodo(req: Request, res: Response): void;
    updateATodoById(req: Request, res: Response): void;
    updateAllTodos(req: Request, res: Response): void;
    deleteATodoById(req: Request, res: Response): void;
    deleteAllCompletedTodos(req: Request, res: Response): void;
}