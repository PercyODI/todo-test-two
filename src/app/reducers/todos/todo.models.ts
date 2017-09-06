import { Action } from '@ngrx/store';
import shortId from 'shortid';

export interface TodoPayload {
    id?: string;
    done?: boolean;
    todo?: Todo;
    newValue?: string;
}

export interface Todo {
    id: string;
    order: number;
    value: string;
    done: boolean;
}
