import { Todo } from "../model/todoModel";
import { ITodo } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<ITodo[] | null> {
        const todos: ITodo[] = await Todo.find({}).sort({_id:-1});
        return todos;
    }

    async createATodo(aTodo: ITodo): Promise<ITodo> {
        const todo: ITodo = await Todo.create(aTodo);
        console.log(todo);
        return todo;
    }

    // async updateTodoById(_id: number, isChecked: boolean): Promise<UpdateResult> {
    //     return await todoCollection
    //         .updateOne({ _id }, { $set: { status: isChecked ? "completed" : "active" } })
    // }

    // async updateAllTodos(isChecked: boolean): Promise<string> {
    //     await todoCollection
    //         .updateMany(
    //             { status: { $nin: ["deleted"] } },
    //             { $set: { status: isChecked ? "completed" : "active" } }
    //         )
    //     return "update all todos' status";
    // }

    // async deleteTodoById(_id: number): Promise<UpdateResult> {
    //     return await todoCollection
    //     .updateOne({ _id  }, { $set: { status: "deleted" } })
    // }

    // async deleteAllCompletedTodos(): Promise<string> {
    //     await todoCollection
    //     .updateMany(
    //         { status: "completed" }, 
    //         { $set: { status: "deleted" }}
    //     )
    //     return "delete all completed todos";
    // }
    
}