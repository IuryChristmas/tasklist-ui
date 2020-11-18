import { TaskService } from './../task.service';
import { Task } from './../../model/task';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-cadastro',
  templateUrl: './task-cadastro.component.html',
  styleUrls: ['./task-cadastro.component.css']
})
export class TaskCadastroComponent implements OnInit{

  formGroup: FormGroup;
  task: Task = new Task();
  parametroTaskId = 'id';
  status: any[];
  selectedStatus: any;

  constructor(private taskService: TaskService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      titulo: [null, Validators.required],
      status: [null, Validators.required],
      descricao: [null]
    });

    if (this.route.snapshot.params[this.parametroTaskId] != null) {
      this._carregarTask(this.route.snapshot.params[this.parametroTaskId]);
    }

    this.status = [
      {id: 0, value: 'PENDENTE'},
      {id: 1, value: 'CONCLUIDO'},
    ];
  }

  salvar() {
    if (this.editando) {
      this._atualizarTask();
      return;
    }

    this._adicionarTask();
  }

  get editando() {
    return Boolean(this.task.id);
  }

  private _carregarTask(id: number) {
    this.taskService.buscarPorId(id)
      .subscribe(task => {
        this.task = task;
      });
  }

  private _adicionarTask() {
    this.task = new Task();
    this.task.descricao = this.formGroup.value.descricao;
    this.task.titulo = this.formGroup.value.titulo;

    this.taskService.salvar(this.task)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Adicionado com sucesso' });
        this.formGroup.reset();

        this.task = new Task();
      });
  }

  private _atualizarTask() {
    this.taskService.atualizarTask(this.task)
      .subscribe(task => {
        this.task = task;

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Atualizado com sucesso' });
      });
  }
}
