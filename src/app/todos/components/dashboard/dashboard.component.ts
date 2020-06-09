import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @select(s => s.todoState.todos.length) totalItems;
  @select(s => s.todoState.lastUpdate) lastUpdate;

  constructor(private service: TodosService) { }

  ngOnInit(): void {
  }

  deleteTodos() {
    this.service.deleteTodos();
  }

}
