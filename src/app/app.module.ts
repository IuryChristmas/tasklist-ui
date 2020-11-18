import { TaskCadastroComponent } from './tasks/tasks-cadastro/task-cadastro.component';
import { TaskService } from './tasks/task.service';
import { ToastModule } from 'primeng/toast';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskModule } from './tasks/task.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListaComponent } from './tasks/tasks-lista/task-lista.component';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  { path: '', component: TaskListaComponent},
  { path: 'tasks', component: TaskListaComponent },
  { path: 'tasks/novo', component: TaskCadastroComponent},
  { path: 'tasks/:id', component: TaskCadastroComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    TaskModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TaskService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
