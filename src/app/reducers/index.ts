import * as fromTodos from './todos/todo.reducer';

export * from './todos';

export const reducers = {
    todos: fromTodos.todoReducer
}