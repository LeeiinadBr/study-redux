import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.interface';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import {
  FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_ERROR,
  ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_ERROR,
  REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_ERROR,
  DELETE_TODOS_REQUEST, DELETE_TODOS_SUCCESS, DELETE_TODOS_ERROR } from './actions';

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  url = '';

  constructor(
    private http: HttpClient,
    private redux: NgRedux<IAppState>
  ) { }

  loadTodos() {
    this.redux.dispatch({ type: FETCH_TODOS_REQUEST });

    this.http.get(this.url).subscribe(
      (todos: Todo[]) => {
        this.redux.dispatch({ type: FETCH_TODOS_SUCCESS, body: todos });
      },
      (err) => {
        this.redux.dispatch({ type: FETCH_TODOS_ERROR, body: err });
      });
  }

  addTodo(todoContent: string) {
    this.redux.dispatch({ type: ADD_TODO_REQUEST, body: todoContent });

    this.http.post(this.url, todoContent).subscribe(
      todo => {
        this.redux.dispatch({ type: ADD_TODO_SUCCESS, body: todo });
      },
      err => {
        this.redux.dispatch({ type: ADD_TODO_ERROR });
      }
    );
  }

  updateTodo(todo: Todo) {
    this.http.put(this.url + todo.id, todo);
  }

  removeTodo(todo: Todo) {
    this.redux.dispatch({ type: REMOVE_TODO_REQUEST, body: todo });

    this.http.delete(this.url + todo.id).subscribe(
      res => {
        this.redux.dispatch({ type: REMOVE_TODO_SUCCESS });
      },
      err => {
        this.redux.dispatch({ type: REMOVE_TODO_ERROR });
      }
    );
  }

  deleteTodos() {
    this.redux.dispatch({ type: DELETE_TODOS_REQUEST });

    this.http.delete(this.url).subscribe(
      res => {
        this.redux.dispatch({ type: DELETE_TODOS_SUCCESS });
      },
      err => {
        this.redux.dispatch({ type: DELETE_TODOS_ERROR });
      }
    );
  }

}
