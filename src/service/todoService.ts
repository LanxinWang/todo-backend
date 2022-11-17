import { Todo } from "../model/todoModel";
import { ITodo, TODO_STATUS } from "../types";
import { todoServiceInterface } from "./todoService.interface";

export class TodoService implements todoServiceInterface {
    async getAllTodos(): Promise<ITodo[]> {
        let todos: ITodo[] = [];
        try {
            todos = await Todo.find({}).sort({ _id: -1 });
        } catch (error) {
            throw new Error("error:getAllTodos");
        }
        return todos;
    }

    async createATodo(aTodo: ITodo): Promise<ITodo | null> {
        let todo: ITodo| null = null; 
        try {
            todo = await Todo.create(aTodo);
        } catch (error) {
            throw new Error("error:createATodo");
        }
        return todo;
    }

    async updateATodoById(_id: number, isChecked: boolean): Promise<ITodo | null > {
        let todo: ITodo| null = null;
        try {
            await Todo.findByIdAndUpdate(
                _id, 
                { $set: { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE } 
            });
            todo = await Todo.findById(_id);
        } catch (error) {
            throw new Error("error:updateATodoById");
        }
        return todo;
    }

    async updateAllTodos(isChecked: boolean, updateIds: Number[] ): Promise<ITodo[]> {
        let todos: ITodo[] = [];
        try {
            await Todo.updateMany({
                _id: {$in: updateIds}
            },
            {
                $set: 
                    { status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE }
            });
            todos = await Todo.find({_id: {$in: updateIds}});    
        } catch (error) {
            throw new Error("error:updateAllTodos");
        }
        return todos;
    }

    async deleteATodoById(_id: number): Promise<ITodo | null> {
        let todo: ITodo | null = null;
        try {
            await Todo.findByIdAndUpdate({
                 _id  }, 
                { $set: { status: TODO_STATUS.DELETED } 
            });
            todo = await Todo.findById(_id);
        } catch (error) {
            throw new Error("error:deleteATodoById");
        }
        return todo;
    }

    async deleteAllCompletedTodos(deletedIds: Number[]): Promise<ITodo[]> {
        let todos: ITodo[] = [];
        try {
            await Todo.updateMany({
                _id: {$in: deletedIds}
            },
            {
                $set: 
                    { status: TODO_STATUS.DELETED }
            });
            todos = await Todo.find({_id: {$in: deletedIds}});
        } catch (error) {
            throw new Error("error:deleteAllCompletedTodos");
        }
        return todos;
    }
}