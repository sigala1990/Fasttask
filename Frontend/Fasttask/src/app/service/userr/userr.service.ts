import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { apiConstants } from '../apiConstants/ApiConstants'; // Adjust the path as needed
import { Userr } from 'src/app/model/userr/userr.model';

@Injectable({
  providedIn: 'root',
})
export class UserrService {
  constructor(private httpClient: HttpClient) {}

  userrByUsername(username: string): Observable<Userr> {
    return this.httpClient.get<Userr>(`${apiConstants.baseUrl}api/userr/by_username/${username}`)
      .pipe(catchError(this.handleError));
  }

  // userrById(): Observable<any[]> {
  //   return this.httpClient
  //     .get<Userr[]>(`${apiConstants.baseUrl}/usuarios`)
  //     .pipe(catchError(this.handleError));
  // }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      //console.log(`Backend returned code ${error.status}, ` +`body was: ${error.error}`);
      console.log(error.status);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
