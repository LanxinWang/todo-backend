import { InsertOneResult, WithId } from "mongodb";
import { Todo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<WithId<Todo>[]>;
    createTodo(todo: Todo): Promise<InsertOneResult<Todo>>;
    // updateTodoById(req: Request, res: Response):void;
    // updateAllTodos(req: Request, res: Response):void;
    // deleteTodoById(req: Request, res: Response):void;
    // deleteAllCompletedTodos(req: Request, res: Response):void;
}