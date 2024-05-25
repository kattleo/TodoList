import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from './DataType';
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

  newTaskText: string = '';

  tasks: Task[] = []

  toggleTask(task: Task) {
    task.isComplete = !task.isComplete;
  }

  addNewTask() {
    this.tasksService.addTask(this.newTaskText).subscribe(() => {
      this.getTasksFromDB();
      this.newTaskText = '';
    });
  }

  getTasksFromDB() {
    this.tasksService.getTaskObjects().subscribe((taskList) => {
      console.log(taskList);
      this.tasks = taskList;
    }
    );
  }
}
