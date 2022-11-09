import { WithId } from "mongodb";
import todoCollection from "../db/conn";
import { Todo } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    getAllTodos(): Promise<WithId<Todo>[]> {
        return todoCollection
        .find({})
        .sort({_id: -1})
        .toArray();
    }
    
}