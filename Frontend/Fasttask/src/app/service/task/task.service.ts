import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Task } from 'src/app/model/task/task.model';
import { catchError, Observable } from 'rxjs';
import { apiConstants } from '../apiConstants/apiConstants';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  //get
  switchTaskInSameList(idList: number, previousId: number, currentId: number): Observable<void> {
    //http://localhost:8080/api/tasks/switch1/69/1/3
    return this.httpClient.get<void>(`${apiConstants.baseUrl}api/task/switch1/${idList}/${previousId}/${currentId}`)
      .pipe(catchError(this.handleError));
  }

  switchTaskInDifferentList(idListOrigin: number, idListDestination: number, previousId: number, currentId: number): Observable<void> {
    return this.httpClient.get<void>(`${apiConstants.baseUrl}api/task/switch2/${idListOrigin}/${idListDestination}/${previousId}/${currentId}`)
      .pipe(catchError(this.handleError));
  }

  //post
  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${apiConstants.baseUrl}api/task/create`, task)
      .pipe(catchError(this.handleError));
  }
  
  //put
  updateTask(task: Task): Observable<void> {
    return this.httpClient.put<void>(`${apiConstants.baseUrl}api/task/update`, task)
      .pipe(catchError(this.handleError));
  }

  //delete
   deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${apiConstants.baseUrl}api/task/${id}`)
      .pipe(catchError(this.handleError));
  }

      handleError(error: HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('An error occurred:', error.error.message);
          } else {
            console.log(error.status);
          }
          return throwError('Something bad happened; please try again later.');
        }
}
