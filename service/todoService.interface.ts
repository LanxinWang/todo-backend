import { WithId } from "mongodb";
import { Todo } from "../types";

export interface todoServiceInterface {
    getAllTodos(): Promise<WithId<Todo>[]>;
    // createTodo(req: Request, res: Response):void;
    // updateTodoById(req: Request, res: Response):void;
    // updateAllTodos(req: Request, res: Response):void;
    // deleteTodoById(req: Request, res: Response):void;
    // deleteAllCompletedTodos(req: Request, res: Response):void;
}