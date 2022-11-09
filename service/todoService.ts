import { InsertOneResult, UpdateResult, WithId } from "mongodb";
import todoCollection from "../db/conn";
import { Todo } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<WithId<Todo>[]> {
        return await todoCollection
        .find({})
        .sort({_id: -1})
        .toArray();
    }

    async createTodo(todo: Todo): Promise<InsertOneResult<Todo>> {
        return await todoCollection.insertOne(todo);
    }

    async updateTodoById(_id: number, isChecked: boolean): Promise<UpdateResult> {
        return await todoCollection
            .updateOne({ _id }, { $set: { status: isChecked ? "completed" : "active" } })
    }

    async updateAllTodos(isChecked: boolean): Promise<string> {
        await todoCollection
            .updateMany(
                { status: { $nin: ["deleted"] } },
                { $set: { status: isChecked ? "completed" : "active" } }
            )
        return "update all todos' status";
    }

    async deleteTodoById(_id: number): Promise<UpdateResult> {
        return await todoCollection
        .updateOne({ _id  }, { $set: { status: "deleted" } })
    }

    async deleteAllCompletedTodos(): Promise<string> {
        await todoCollection
        .updateMany(
            { status: "completed" }, 
            { $set: { status: "deleted" }}
        )
        return "delete all completed todos";
    }
    
}