import { Component, OnInit, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Todo } from '../../todo.interface';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @select((s) => s.todoState.todos) todosList: Todo[];

  constructor(private service: TodosService) { }

  ngOnInit(): void {
    this.service.loadTodos();
  }

  add(todoInput: HTMLInputElement) {
    // tslint:disable-next-line: curly
    if (!todoInput.value) return;

    this.service.addTodo(todoInput.value);
    todoInput.value = '';
  }

  check(todo: Todo) {
    this.service.updateTodo(todo);
  }

  remove(todo: Todo) {
    this.service.removeTodo(todo);
  }

}
