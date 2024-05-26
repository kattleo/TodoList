import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from './DataType';
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

  toggleTask(task: Task) {
    task.isComplete = !task.isComplete;
  }

  addNewTask() {
    if (this.newTaskText != '') {
      this.tasksService.addTask(this.newTaskText).subscribe(() => {
        this.getTasksFromDB();
        this.newTaskText = '';
      });
    }
  }

  removeTask(taskId?: number) {
    if (taskId) {
      this.tasksService.removeTask(taskId).subscribe(() => {
        this.getTasksFromDB();
      });
    }
  }

  getTasksFromDB() {
    this.tasksService.getTaskObjects().pipe(
      catchError((err: any) => {
        this.errorWhileFetchingData = err;
        return of();
      })
    )
      .subscribe({
        next: (value) => this.tasks = value,
        error: (err) => console.log('HTTP Error', err)
      });
  }
}
