import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import todoCollection from "../db/conn";
import { Todo } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    static updateTodoById: any;
    getAllTodos(): Promise<WithId<Todo>[]> {
        return todoCollection
        .find({})
        .sort({_id: -1})
        .toArray();
    }

    createTodo(todo: Todo): Promise<InsertOneResult<Todo>> {
        return todoCollection.insertOne(todo);
    }

    updateTodoById(_id: number, isChecked: boolean):Promise<UpdateResult> {
        return todoCollection
            .updateOne({ _id }, { $set: { status: isChecked ? "completed" : "active" } })
    }
    
}