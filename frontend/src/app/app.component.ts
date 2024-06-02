import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from '../DataType';
import { TasksService } from './tasks.service';

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

  errorWhileFetchingData?: string;

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
    this.tasksService.fetchTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks
      },
      error: (err) => {
        if (err.name = "HttpErrorResponse") {
          this.errorWhileFetchingData = "Backend API cannot be accessed"
        } else {
          this.errorWhileFetchingData = err.message;
        }
      }
    })
  }
}
