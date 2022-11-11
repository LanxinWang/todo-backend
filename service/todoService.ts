import { Todo } from "../model/todoModel";
import { ITodo, TODO_STATUS } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<ITodo[] | null> {
        const todos: ITodo[] | [] = await Todo.find({}).sort({ _id: -1 });
        return todos;
    }

    async createATodo(aTodo: ITodo): Promise<ITodo> {
        const todo: ITodo = await Todo.create(aTodo);
        return todo;
    }

    async updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null > {
        await Todo.findByIdAndUpdate(
            _id, 
            { $set: { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE } }
            );
        const todo: ITodo| null = await Todo.findById(_id);
        return todo;
    }

    async updateAllTodos(isChecked: boolean): Promise<string> {
        const result = await Todo.updateMany(
                { status: { $nin: [TODO_STATUS.DELETED] } },
                { $set: 
                    { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE }
                }
            )            
        return `${result.modifiedCount} todos updated status`;
    }

    async deleteATodoById(_id: number): Promise<ITodo | null> {
        await Todo.findByIdAndUpdate({ _id  }, 
            { $set: { status: TODO_STATUS.DELETED } });
        const todo: ITodo| null = await Todo.findById(_id);
        return todo;
    }

    async deleteAllCompletedTodos(): Promise<string> {
        const result = await Todo.updateMany(
            { status: TODO_STATUS.COMPLETED }, 
            { $set: { status: TODO_STATUS.DELETED }}
        )
        return `${result.modifiedCount} todos deleted.`;
    }
    
}