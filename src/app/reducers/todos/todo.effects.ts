import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom'
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { GET_TODOS, getTodos, addCompleteTodo, finishGetTodos } from './todo.actions';
import { ActionWithPayload } from '../reducers.models'
import { Todo, TodoPayload } from './todo.models';

@Injectable()
export class GetTodoEffects {

    @Effect() todo$ = this.actions$.ofType(GET_TODOS)
        .map(toPayload)
        .debounceTime(2000)
        .mergeMap<TodoPayload, ActionWithPayload<TodoPayload>>((payload, i) => {
            return testTodosArray.map(todo => {
                return addCompleteTodo(todo);
            }).concat(finishGetTodos())
        })

    constructor(
        private actions$: Actions
    ){}
}

const testTodosArray: Todo[] = [
    {
      "id": "B1yhLzCYb",
      "order": 0,
      "value": "ONe",
      "done": false
    },
    {
      "id": "BkehUfAYZ",
      "order": 1,
      "value": "Two",
      "done": false
    },
    {
      "id": "Syz2LzCF-",
      "order": 2,
      "value": "Three",
      "done": false
    }
  ]