import { TaskFilter } from './../../filter/task-filter';
import { TaskService } from './../task.service';

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.css']
})
export class TaskListaComponent implements OnInit {

  tasks = [];
  titulo: string;
  status: number;
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  pesquisar() {
    const taskFilter = new TaskFilter();
    taskFilter.titulo = this.titulo;

    this.taskService.pesquisar(taskFilter, this.pageNumber, this.pageSize)
      .subscribe(res => {
        this.tasks = res.content;
        this.totalElements = res.totalElements;
        this.pageNumber = res.number;
        this.pageSize = res.size;
      });
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pageNumber = pagina;
  }
}
