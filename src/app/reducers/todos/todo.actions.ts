import { Todo, TodoPayload } from '.';
import { ActionWithPayload } from '../reducers.models';

export const ADD_TODO = 'ADD_TODO';
export const ADD_COMPLETE_TODO = 'ADD_COMPLETE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const INCREASE_TODO_ORDER = 'INCREASE_TODO_ORDER';
export const DECREASE_TODO_ORDER = 'DECREASE_TODO_ORDER';
export const GET_TODOS = 'GET_TODOS';
export const FINISH_GET_TODOS = 'FINISH_GET_TODOS';

export function addTodoAction(todoValue: string): ActionWithPayload<TodoPayload> {
  return {
    type: ADD_TODO,
    payload: {
      newValue: todoValue
    }
  };
}

export function addCompleteTodo(todoToUpdate: Todo): ActionWithPayload<TodoPayload> {
  return {
    type: ADD_COMPLETE_TODO,
    payload: {
      todo: todoToUpdate
    }
  }
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

export function increaseTodoOrder(todoToUpdate: Todo): ActionWithPayload<TodoPayload> {
  return {
    type: INCREASE_TODO_ORDER,
    payload: {
      id: todoToUpdate.id,
      todo: todoToUpdate
    }
  }
}

export function decreaseTodoOrder(todoToUpdate: Todo): ActionWithPayload<TodoPayload> {
  return {
    type: DECREASE_TODO_ORDER,
    payload: {
      id: todoToUpdate.id,
      todo: todoToUpdate
    }
  }
}

export function getTodos(): ActionWithPayload<TodoPayload> {
  return {
    type: GET_TODOS,
    payload: {}
  }
}

export function finishGetTodos(): ActionWithPayload<TodoPayload> {
  return {
    type: FINISH_GET_TODOS,
    payload: {}
  }
}
