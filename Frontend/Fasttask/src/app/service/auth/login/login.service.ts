import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Token } from '../../../model/token/token.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { apiConstants } from '../../apiConstants/ApiConstants'; // Adjust the path as needed



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

    login(usuario: any): Observable<Token> {
    return this.httpClient.post<Token>(`${apiConstants.baseUrl}login`, usuario).pipe(
      catchError(this.handleError)
    );
  }

     // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
