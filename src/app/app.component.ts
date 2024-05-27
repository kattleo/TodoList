import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from '../DataType';
import { TasksService } from './tasks.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private tasksService: TasksService) {
    this.getTasksFromDB();
  }

  errorWhileFetchingData?: Error;

  newTaskText: string = '';

  tasks: Task[] = []

  toggleTask(taskId: number) {
    this.tasksService.updateTaskState(taskId).subscribe(() => {
      this.getTasksFromDB();
    })
  }

  addNewTask() {
    if (this.newTaskText != '') {
      this.tasksService.addTask(this.newTaskText).subscribe(() => {
        this.getTasksFromDB();
        this.newTaskText = '';
      });
    }
  }

  removeTask(taskId: number) {
    this.tasksService.removeTask(taskId).subscribe(() => {
      this.getTasksFromDB();
    });
  }

  getTasksFromDB() {
    this.tasksService.fetchTasks().pipe(
      catchError((err: any) => {
        this.errorWhileFetchingData = err;
        return of();
      })
    )
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      })
  }
}
