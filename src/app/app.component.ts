import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

class Task {
  public taskText: string;
  public isComplete: boolean;

  constructor(taskText: string, isComplete: boolean) {
    this.taskText = taskText;
    this.isComplete = isComplete;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input() newTaskText: string = '';

  tasks: Task[] = [
    new Task('Get 100,000$', false),
    new Task('Eat Breakfast', true)
  ]

  toggleTask(task: Task) {
    task.isComplete = !task.isComplete;
  }

  addNewTask() {
    this.tasks.push(new Task(this.newTaskText, false));
  }
}
