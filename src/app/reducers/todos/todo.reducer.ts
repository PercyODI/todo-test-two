import { Action, createSelector } from '@ngrx/store';
import shortId from 'shortid';
import _ from 'lodash';
import {
  ADD_TODO,
  ADD_COMPLETE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_DONE,
  INCREASE_TODO_ORDER,
  DECREASE_TODO_ORDER,
  GET_TODOS,
  FINISH_GET_TODOS
} from './todo.actions';
import {
  Todo,
  TodoPayload,
  TodoState
} from './todo.models';
import { ActionWithPayload } from '../reducers.models';

const initialState: TodoState = {
  loading: false,
  todos: []
}

export function todoReducer(state: TodoState = initialState, action: ActionWithPayload<TodoPayload>) {
  switch (action.type) {
    case ADD_TODO:
      let newTodo: Todo = {
        id: shortId.generate(),
        order: state.todos.length,
        value: action.payload.newValue,
        done: false
      };
      return {...state, todos: [...state.todos, newTodo]};
    case ADD_COMPLETE_TODO:
      return {...state, todos: _([action.payload.todo])
        .unionBy([...state.todos], x => x.id)
        .sortBy(t => t.order)
        .map((todo, index) => { return {...todo, order: index}})
        .value()};
    case DELETE_TODO:
      return {...state, todos: state.todos.filter((item) => item.id !== action.payload.id)};
    case UPDATE_TODO:
      return {...state, todos: state.todos.map((item) => {
        return item.id === action.payload.id
          ? { ...item, value: action.payload.newValue }
          // ? Object.assign({}, item, {value: action.payload.newValue})
          : item;
      })};
    case TOGGLE_DONE:
      return {...state, todos: state.todos.map((item) => {
        return item.id === action.payload.id
          ? { ...item, done: !action.payload.todo.done }
          // ? Object.assign({}, item, {done: !action.payload.todo.done})
          : item;
      })};
    case INCREASE_TODO_ORDER:
      return {...state, todos: state.todos.map((item, index, array) => {
        if (item.id === action.payload.id) {
          return { ...item, order: Math.max(0, item.order - 1) };
        }

        if (item.order === action.payload.todo.order - 1) {
          return { ...item, order: item.order + 1 };
        }

        return item;
      })};
    case DECREASE_TODO_ORDER:
      return {...state, todos: state.todos.map((item, index, array) => {
        if (item.id === action.payload.id) {
          return { ...item, order: Math.min(array.length - 1, item.order + 1) };
        }

        if (item.order === action.payload.todo.order + 1) {
          return { ...item, order: item.order - 1 };
        }

        return item;
      })};
    case GET_TODOS:
      return {...state, loading: true};
    case FINISH_GET_TODOS:
      return {...state, loading: false};
    default:
      return state;
  }
}
