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

    async updateAllTodos(isChecked: boolean, updateIds: Number[] ): Promise<((ITodo) | null)[]> {
        const promises = updateIds.map(async (updateId) => {
            return await Todo.findByIdAndUpdate(updateId,
                { $set: 
                    { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE }
                })
        });
        const todos = await Promise.all(promises);
        return todos;
    }

    async deleteATodoById(_id: number): Promise<ITodo | null> {
        await Todo.findByIdAndUpdate({ _id  }, 
            { $set: { status: TODO_STATUS.DELETED } });
        const todo: ITodo| null = await Todo.findById(_id);
        return todo;
    }

    async deleteAllCompletedTodos(deletedIds: Number[]): Promise<((ITodo) | null)[]> {
        const promises = deletedIds.map( async (deletedIds) => {
            return await Todo.findByIdAndUpdate(deletedIds,
                { $set: 
                    { status: TODO_STATUS.DELETED }
                })
        });
        const todos = await Promise.all(promises);
        return todos;
    }
}