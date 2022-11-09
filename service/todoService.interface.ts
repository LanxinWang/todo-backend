import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import { Todo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<Todo[]>;
    createTodo(todo: Todo): Promise<InsertOneResult<Todo>>;
    updateTodoById(_id: number, isChecked: boolean): Promise<UpdateResult>;
    updateAllTodos(isChecked: boolean): Promise<string>;
    deleteTodoById(_id: number): Promise<UpdateResult>;
    deleteAllCompletedTodos(): Promise<string>;
}