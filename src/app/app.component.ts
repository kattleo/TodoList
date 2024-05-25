import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from './DataType';

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
