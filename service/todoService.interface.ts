import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import { Todo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<WithId<Todo>[]>;
    createTodo(todo: Todo): Promise<InsertOneResult<Todo>>;
    updateTodoById(_id: number, isChecked: boolean): Promise<UpdateResult>;
    // updateAllTodos(isChecked: boolean): Promise<UpdateResult | Document>;
    deleteTodoById(_id: number): Promise<UpdateResult>;
    // deleteAllCompletedTodos(req: Request, res: Response):void;
}