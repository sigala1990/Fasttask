import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Userr } from 'src/app/model/userr/userr.model';

@Injectable({
  providedIn: 'root',
})
export class SessionDataService {
  private userrSubject = new BehaviorSubject<Userr | null>(null);
  userr$ = this.userrSubject.asObservable();

  constructor() {}

  setIdUserr(userr: Userr) {
    this.userrSubject.next(userr.id ? userr : null);
  }

  setNameUserr(userr: Userr) {
    this.userrSubject.next(userr.username ? userr : null);
  }

  setIdiomaUserr(userr: Userr) {
    this.userrSubject.next(userr.idioma ? userr : null);
    
  }

  clearUserr() {
    this.userrSubject.next(null);
 
  }
}
