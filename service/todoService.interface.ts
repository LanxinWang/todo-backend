import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import { ITodo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<ITodo[] | null>;
    createATodo(todo: ITodo): Promise<ITodo>;
    updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null>;
    // updateAllTodos(isChecked: boolean): Promise<string>;
    // deleteTodoById(_id: number): Promise<UpdateResult>;
    // deleteAllCompletedTodos(): Promise<string>;
}