import { apiConstants } from './../apiConstants/apiConstants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Tablero } from 'src/app/model/tablero/tablero.model';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  constructor(private httpClient: HttpClient) { }

    tableroById(id: number): Observable<Tablero> {
      return this.httpClient.get<Tablero>(`${apiConstants.baseUrl}api/tablero/${id}`)
        .pipe(catchError(this.handleError));
    }

    tableroByUserrId(idUserr: number): Observable<Tablero> {
      return this.httpClient.get<Tablero>(`${apiConstants.baseUrl}api/tableros/${idUserr}`)
        .pipe(catchError(this.handleError));
    }

    createTablero(tablero: Tablero): Observable<Tablero> {
      return this.httpClient.post<Tablero>(`${apiConstants.baseUrl}api/tablero/create`, tablero)
        .pipe(catchError(this.handleError));
    }

    deleteTablero(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${apiConstants.baseUrl}api/tablero/${id}`)
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
