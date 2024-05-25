import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from './DataType';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  private base_url = 'http://127.0.0.1:5000/'

  fetchTasks(): Observable<any> {
    return this.http.get<any[]>(this.base_url + 'tasks')
  }

  getTaskObjects(): Observable<Task[]> {
    return this.fetchTasks().pipe(
      map(tasksJSON => this.parseTasksToObjects(tasksJSON))
    );
  }

  private parseTasksToObjects(tasksJSON: any[]): Task[] {
    return tasksJSON.map(task => new Task(task['taskText'], task['done'], task['id']));
  }

  addTask(taskText: string): Observable<any> {
    return this.http.post(this.base_url + 'tasks/create', { "taskText": taskText });
  }

  removeTask(taskId: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id: taskId }
    };
    return this.http.delete(`${this.base_url}tasks/remove`, options);
  }
}
