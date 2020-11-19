import { Task } from './../../model/task';
import { TaskFilter } from './../../filter/task-filter';
import { TaskService } from './../task.service';

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.css']
})
export class TaskListaComponent implements OnInit {

  tasks = [];
  selectedRowDataArray = [];
  titulo: string;
  status: any[];
  selectedStatus: any;
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.status = [
      {id: 0, value: 'PENDENTE'},
      {id: 1, value: 'CONCLUIDO'},
    ];
  }

  pesquisar() {
    const taskFilter = new TaskFilter();
    taskFilter.titulo = this.titulo;
    if (this.selectedStatus != null) {
      taskFilter.status = this.selectedStatus.id;
    }

    this.taskService.pesquisar(taskFilter, this.pageNumber, this.pageSize)
      .subscribe(res => {
        this.tasks = res.content;
        this.totalElements = res.totalElements;
        this.pageNumber = res.number;
        this.pageSize = res.size;

        this.selectedRowDataArray = this.tasks.filter(task => task.status.toString() === 'CONCLUIDO');
      });
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pageNumber = pagina;
  }

  concluirTask(task: Task, status: string) {
    const taskSelected = task;
    taskSelected.status = 0;

    if (status === 'PENDENTE') {
      taskSelected.status = 1;
    }

    this.taskService.concluirTask(taskSelected)
      .subscribe(res => {
        task.status = res.status;
        task.dataConclusao = res.dataConclusao;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarefa atualizada' });
      });
  }

  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(id);
      }
    });
  }

  private excluir(id: number) {
    this.taskService.excluir(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excluído com sucesso' });
      this.pesquisar();
    });
  }
}
