import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Todo } from './../reducers/todos/todo.models';
import * as todoActions from '../reducers/todos/todo.actions';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'todos'.
   */
  selector: 'todos-list',  // <todos></todos>
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
  template: `
      <div *ngFor="let todo of todoList; let i = index">
      <i *ngIf="todo.done" class="fa fa-check-square-o" aria-hidden="true" (click)="toggleDone(todo)"></i>
      <i *ngIf="!todo.done" class="fa fa-square-o" aria-hidden="true" (click)="toggleDone(todo)"></i>
      <span *ngIf="editing[todo.id] === undefined" (click)="startEditing(todo)">
            {{todo.value}}
            <i class="fa fa-arrow-up" aria-hidden="true" (click)="increaseTodoOrder(todo)"></i>
            <i class="fa fa-arrow-down" aria-hidden="true" (click)="decreaseTodoOrder(todo)"></i>
        </span>
      <span *ngIf="editing[todo.id] !== undefined">
            <input [(ngModel)]="editing[todo.id]" (keyup.enter)="updateTodo(todo, editing[todo.id])" />
        </span>
    </div>
  `
})
export class TodosListComponent implements OnInit {
  /**
   * Set our default values
   */
  @Input() public store: Store<any>;
  @Input() public todoList: Todo[];
  @Input() public searchTodoString: string = '';
  public editing = {};
  public indexToEdit: number | null;
  /**
   * TypeScript public modifiers
   */
  constructor(
  ) {

  }

  public ngOnInit() {
    console.log('hello `Todos-List` component');
  }

  public startEditing(todo: Todo) {
    this.editing[todo.id] = todo.value;
  }

  public updateTodo(todo: Todo, newTodoValue: string) {
    this.editing[todo.id] = undefined;
    this.store.dispatch(todoActions.editTodoAction(todo, newTodoValue));
  }

  public toggleDone(todo: Todo) {
    this.store.dispatch(todoActions.toggleTodoDone(todo));
  }

  public increaseTodoOrder(todo: Todo) {
    this.store.dispatch(todoActions.increaseTodoOrder(todo));
  }

  public decreaseTodoOrder(todo: Todo) {
    this.store.dispatch(todoActions.decreaseTodoOrder(todo));
  }
}
