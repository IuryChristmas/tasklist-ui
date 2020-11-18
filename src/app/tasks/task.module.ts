import { TaskCadastroComponent } from './tasks-cadastro/task-cadastro.component';
import { TaskListaComponent } from './tasks-lista/task-lista.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [
      TaskListaComponent,
      TaskCadastroComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,

      InputTextModule,
      ButtonModule,
      TableModule,
      CalendarModule,
      RouterModule,
      InputMaskModule,
      ToastModule,
      TooltipModule,
      DropdownModule,
    ],
    exports: [
      TaskListaComponent,
    ]
})
export class TaskModule { }
