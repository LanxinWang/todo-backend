import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import { ITodo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<ITodo[]>;
    createTodo(todo: ITodo): Promise<InsertOneResult<ITodo>>;
    updateTodoById(_id: number, isChecked: boolean): Promise<UpdateResult>;
    updateAllTodos(isChecked: boolean): Promise<string>;
    deleteTodoById(_id: number): Promise<UpdateResult>;
    deleteAllCompletedTodos(): Promise<string>;
}