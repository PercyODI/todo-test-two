import { Todo, TodoPayload } from '.';
import { ActionWithPayload } from '../reducers.models';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_DONE = 'TOGGLE_DONE';

export function addTodoAction(todoValue: string): ActionWithPayload<TodoPayload> {
    return {
        type: ADD_TODO,
        payload: {
            newValue: todoValue
        }
    };
}

export function toggleTodoDone(todoToUpdate: Todo): ActionWithPayload<TodoPayload> {
    return {
        type: TOGGLE_DONE,
        payload: {
            id: todoToUpdate.id,
            todo: todoToUpdate
        }
    }
}

export function editTodoAction(
    todoToUpdate: Todo, 
    newTodoValue: string): ActionWithPayload<TodoPayload> {
    return {
        type: UPDATE_TODO,
        payload: {
            id: todoToUpdate.id,
            newValue: newTodoValue
        }
    }
}
