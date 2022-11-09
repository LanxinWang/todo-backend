import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import { Todo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<WithId<Todo>[]>;
    createTodo(todo: Todo): Promise<InsertOneResult<Todo>>;
    updateTodoById(_id: number, isChecked: boolean): Promise<UpdateResult>;
    // updateAllTodos(req: Request, res: Response):void;
    // deleteTodoById(req: Request, res: Response):void;
    // deleteAllCompletedTodos(req: Request, res: Response):void;
}