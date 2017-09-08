import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import _ from 'lodash';
import {
  Todo, TodoState
} from '../reducers/todos/';
import * as todoActions from '../reducers/todos/todo.actions';

import { TodosListComponent } from './todos-list.component';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'todos'.
   */
  selector: 'todos',  // <todos></todos>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./todos.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  public searchTodoString: string = '';
  public isLoading = false;
  public todos$: Todo[];
  public completedTodos$: Todo[];
  public incompleteTodos$: Todo[];
  public newTodoValue: string;
  public editing = {};
  public indexToEdit: number | null;
  /**
   * TypeScript public modifiers
   */
  constructor(
    public store: Store<any>
  ) { }

  public ngOnInit() {
    console.log('hello `Todos` component');
    this.store.select<TodoState>((s) => s.todos).subscribe((todoState) => {
      this.isLoading = todoState.loading;
      this.todos$ = todoState.todos;
      this.filterCompletedTodos();
      this.filterIncompleteTodos();
      // this.incompleteTodos$ = todos.filter((todo) => !todo.done).sort((a, b) => {
      //   let valueA = a.value.toUpperCase(); // ignore upper and lowercase
      //   let valueB = b.value.toUpperCase(); // ignore upper and lowercase
      //   if (valueA < valueB) {
      //     return -1;
      //   }
      //   if (valueA > valueB) {
      //     return 1;
      //   }
      //   return 0;
      // });
    });
  }

  public startEditing(todo: Todo) {
    this.editing[todo.id] = todo.value;
  }

  public updateTodo(todo: Todo, newTodoValue: string) {
    this.editing[todo.id] = undefined;
    this.store.dispatch(todoActions.editTodoAction(todo, newTodoValue));
  }

  public addTodo(todoValue: string) {
    this.newTodoValue = '';
    this.store.dispatch(todoActions.addTodoAction(todoValue));
  }

  public toggleDone(todo: Todo) {
    this.store.dispatch(todoActions.toggleTodoDone(todo));
  }

  public getTestTodos() {
    this.store.dispatch(todoActions.getTodos());
  }

  public filterCompletedTodos() {
    this.completedTodos$ = _(this.todos$)
      .filter((todo) => todo.done)
      .filter((todo) =>
        this.searchTodoString
          ? todo.value.toUpperCase().includes(this.searchTodoString.toUpperCase())
          : true)
      .sortBy((todo) => todo.order)
      .value();
  }

  public filterIncompleteTodos() {
    this.incompleteTodos$ = _(this.todos$)
      .filter((todo) => !todo.done)
      .filter((todo) =>
        this.searchTodoString
          ? todo.value.toUpperCase().includes(this.searchTodoString.toUpperCase())
          : true)
      .sortBy((todo) => todo.order)
      .value();
  }

  public increaseTodoOrder(todo: Todo) {
    this.store.dispatch(todoActions.increaseTodoOrder(todo));
  }

  public decreaseTodoOrder(todo: Todo) {
    this.store.dispatch(todoActions.decreaseTodoOrder(todo));
  }
}
