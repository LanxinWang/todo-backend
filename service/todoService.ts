import { Todo } from "../model/todoModel";
import { ITodo } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<ITodo[] | null> {
        const todos: ITodo[]|[] = await Todo.find({}).sort({_id:-1});
        return todos;
    }

    async createATodo(aTodo: ITodo): Promise<ITodo> {
        const todo: ITodo = await Todo.create(aTodo);
        return todo;
    }

    async updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null > {
        await Todo.findByIdAndUpdate(
            _id, { $set: { status: isChecked ? "completed" : "active" } }
            );
        const todo: ITodo| null = await Todo.findById(_id);
        return todo;
    }

    async updateAllTodos(isChecked: boolean): Promise<string> {
        const result = await Todo.updateMany(
                { status: { $nin: ["deleted"] } },
                { $set: { status: isChecked ? "completed" : "active" } }
            )            
        return `${result.modifiedCount} todos updated status`;
    }

    async deleteATodoById(_id: number): Promise<ITodo | null> {
        await Todo.findByIdAndUpdate({ _id  }, { $set: { status: "deleted" } });
        const todo: ITodo| null = await Todo.findById(_id);
        return todo;
    }

    async deleteAllCompletedTodos(): Promise<string> {
        const result = await Todo.updateMany(
            { status: "completed" }, 
            { $set: { status: "deleted" }}
        )
        return `${result.modifiedCount} todos deleted.`;
    }
    
}