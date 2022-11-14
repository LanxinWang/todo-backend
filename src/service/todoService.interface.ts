import { ITodo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<ITodo[] | null>;
    createATodo(todo: ITodo): Promise<ITodo>;
    updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null>;
    // updateAllTodos(isChecked: boolean): Promise<ITodo[]>;
    updateAllTodos(isChecked: boolean, updateIds: Array<Number>): Promise<((ITodo) | null)[]>;
    deleteATodoById(_id: number): Promise<ITodo | null>;
    deleteAllCompletedTodos(): Promise<string>;
}