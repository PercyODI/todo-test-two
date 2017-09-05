import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Todo
} from '../reducers/todos/';
import * as todoActions from '../reducers/todos/todo.actions';


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
    private store: Store<any>
  ) { }

  public ngOnInit() {
    console.log('hello `Todos` component');
    this.store.select<Todo[]>((s) => s.todos).subscribe((todos) => {
      this.todos$ = todos;
      this.completedTodos$ = todos.filter((todo) => todo.done);
      this.incompleteTodos$ = todos.filter((todo) => !todo.done).sort((a, b) => {
        let valueA = a.value.toUpperCase(); // ignore upper and lowercase
        let valueB = b.value.toUpperCase(); // ignore upper and lowercase
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
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
}
