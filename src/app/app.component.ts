import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    this.tasksService.getTaskObjects().subscribe((taskList) => {
      console.log(taskList);
      this.tasks = taskList;
    }
    );

    this.tasksService.fetchTasks().subscribe((taskList) => {
      console.log(taskList);
    }
    );
  }

  @Input() newTaskText: string = '';

  tasks: Task[] = []

  toggleTask(task: Task) {
    task.isComplete = !task.isComplete;
  }

  addNewTask() {
    this.tasks.push(new Task(this.newTaskText, false));
  }
}
