import { apiConstants } from './../apiConstants/apiConstants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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

  createUserr(userr: Userr): Observable<Userr> {
    return this.httpClient.post<Userr>(`${apiConstants.baseUrl}api/userr/create`, userr)
      .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          // Puedes manejar aquí el error específico de usuario duplicado
          // Por ejemplo, lanzar un error con mensaje claro
          return throwError(() => new Error('El usuario o email ya existe.'));
        }
        // Para otros errores, relanzar o manejar según convenga
        return this.handleError(error);
      })
    );
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(error.status);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
