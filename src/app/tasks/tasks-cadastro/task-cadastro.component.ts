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
      descricao: [null],
      dataCriacao: [null],
      dataConclusao: [null]
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
    return Boolean(this.formGroup.value.id);
  }

  private _carregarTask(id: number) {
    this.taskService.buscarPorId(id)
      .subscribe(task => {
        this.formGroup.patchValue({
          id: task.id,
          titulo: task.titulo,
          status: this._verificarStatus(task.status),
          descricao: task.descricao,
          dataCriacao: task.dataCriacao,
          dataConclusao: task.dataConclusao
        });
      });
  }

  private _verificarStatus(status: any): any {
    if (status === 'PENDENTE') {
      return this.status[0];
    }

    return this.status[1];
  }

  private _adicionarTask() {

    this._buildTaskFromForm();

    this.taskService.salvar(this.task)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Adicionado com sucesso' });
        this.formGroup.reset();

        this.task = new Task();
      });
  }

  private _atualizarTask() {

    this._buildTaskFromForm();

    this.taskService.atualizarTask(this.task)
      .subscribe(task => {
        this.task = task;

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Atualizado com sucesso' });
      });
  }

  private _buildTaskFromForm(): void {
    this.task = new Task();
    this.task.id = this.formGroup.value.id;
    this.task.descricao = this.formGroup.value.descricao;
    this.task.titulo = this.formGroup.value.titulo;
    this.task.status = this.formGroup.value.status.id;
    this.task.dataCriacao = this.formGroup.value.dataCriacao;
    this.task.dataConclusao = this.formGroup.value.dataConclusao;
  }

}
