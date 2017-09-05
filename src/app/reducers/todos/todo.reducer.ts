import { Action, createSelector } from '@ngrx/store';
import shortId from 'shortid';
import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    TOGGLE_DONE
 } from './todo.actions';
 import {
     Todo,
     TodoPayload
  } from './todo.models';
  import { ActionWithPayload } from '../reducers.models';

export function todoReducer(state: Todo[] = [], action: ActionWithPayload<TodoPayload>) {
    switch (action.type) {
        case ADD_TODO:
            let newTodo: Todo = {
                id: shortId.generate(),
                value: action.payload.newValue,
                done: false
            }
            return [newTodo, ...state];
        case DELETE_TODO:
            return state.filter((item) => item.id !== action.payload.id);
        case UPDATE_TODO:
            return state.map((item) => {
                return item.id === action.payload.id
                    ? Object.assign({}, item, {value: action.payload.newValue})
                    : item;
            });
        case TOGGLE_DONE:
            return state.map((item) => {
                return item.id === action.payload.id
                    ? Object.assign({}, item, {done: !action.payload.todo.done})
                    : item;
            });
        default:
            return state;
    }
}