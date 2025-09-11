import { apiConstants } from './../apiConstants/apiConstants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Lista } from 'src/app/model/lista/lista.model';
@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(private httpClient: HttpClient) { }

  //get
  //no hace falta

  //post
  createLista(lista: Lista): Observable<Lista> {
    return this.httpClient.post<Lista>(`${apiConstants.baseUrl}api/lista/create`, lista)
      .pipe(catchError(this.handleError));
  }

  //put
  updateLista(lista: Lista): Observable<Lista> {
    return this.httpClient.put<Lista>(`${apiConstants.baseUrl}api/lista/update`, lista)
      .pipe(catchError(this.handleError));
  }

  //delete
  deleteLista(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${apiConstants.baseUrl}api/lista/${id}`)
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
