import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  private base_url = 'http://127.0.0.1:5000/'

  fetchTasks(): Observable<any> {
    return this.http.get<any[]>(this.base_url + 'tasks')
  }

  addTask(taskText: string): Observable<any> {
    return this.http.post(this.base_url + 'tasks/create', { "taskText": taskText });
  }

  removeTask(taskId: number): Observable<any> {
    // added body of options parameter to provide taskId through DELETE method
    return this.http.delete(`${this.base_url}tasks/remove`, { body: { id: taskId } });
  }
}
