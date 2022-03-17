import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class TaskModule { }
