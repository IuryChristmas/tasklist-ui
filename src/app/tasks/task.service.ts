import { Task } from './../model/task';
import { TaskFilter } from './../filter/task-filter';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskService {

  taskUrl: string;

  constructor(private http: HttpClient) {
    this.taskUrl = `${environment.urlApi}/tasks`;
  }

  pesquisar(taskFilter: TaskFilter, page: number, size: number): Observable<any> {
    let params = new HttpParams();

    if (taskFilter.titulo) {
      params = params.set('titulo', taskFilter.titulo);
    }

    if (taskFilter.status) {
      params = params.set('status', taskFilter.status.toString());
    }

    return this.http.get(`${this.taskUrl}`, { params })
      .pipe(
        map((res: any) => res)
      );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete(`${this.taskUrl}/` + id)
      .pipe(
        map((res: any) => res)
      );
  }

  salvar(task: Task): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post(this.taskUrl, task, { headers })
      .pipe(
        map((res: any) => res)
      );
  }

  buscarPorId(id: number): Observable<Task> {
    return this.http.get(`${this.taskUrl}/` + id)
      .pipe(
        map((res: any) => res)
      );
  }

  atualizarTask(task: Task): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(this.taskUrl, task, { headers })
      .pipe(
        map((res: any) => res)
      );
  }

  concluirTask(task: Task): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.taskUrl}/concluir`, task, { headers })
      .pipe(
        map((res: any) => res)
      );
  }

}
