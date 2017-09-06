import { Action, createSelector } from '@ngrx/store';
import shortId from 'shortid';
import _ from 'lodash';
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_DONE,
  INCREASE_TODO_ORDER,
  DECREASE_TODO_ORDER
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
        order: state.length,
        value: action.payload.newValue,
        done: false
      };
      return [...state, newTodo];
    case DELETE_TODO:
      return state.filter((item) => item.id !== action.payload.id);
    case UPDATE_TODO:
      return state.map((item) => {
        return item.id === action.payload.id
          ? { ...item, value: action.payload.newValue }
          // ? Object.assign({}, item, {value: action.payload.newValue})
          : item;
      });
    case TOGGLE_DONE:
      return state.map((item) => {
        return item.id === action.payload.id
          ? { ...item, done: !action.payload.todo.done }
          // ? Object.assign({}, item, {done: !action.payload.todo.done})
          : item;
      });
    case INCREASE_TODO_ORDER:
      return state.map((item, index, array) => {
        if (item.id === action.payload.id) {
          return { ...item, order: Math.max(0, item.order - 1) };
        }

        if (item.order === action.payload.todo.order - 1) {
          return { ...item, order: item.order + 1 };
        }

        return item;
      });
    case DECREASE_TODO_ORDER:
      return state.map((item, index, array) => {
        if (item.id === action.payload.id) {
          return { ...item, order: Math.min(array.length - 1, item.order + 1) };
        }

        if (item.order === action.payload.todo.order + 1) {
          return { ...item, order: item.order - 1 };
        }

        return item;
      });
    default:
      return state;
  }
}
