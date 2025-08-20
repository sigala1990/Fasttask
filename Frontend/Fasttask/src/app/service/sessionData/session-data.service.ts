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

  clearUserr() {
    this.userrSubject.next(null);
    console.log('userrSubject id: ' + this.userrSubject.value?.id);
    console.log('userrSubject username: ' + this.userrSubject.value?.username);
    console.log('userrSubject email: ' + this.userrSubject.value?.email);
    console.log('userrSubject rol: ' + this.userrSubject.value?.rol);
    console.log(
      'userrSubject fecha_nacimiento: ' +
        this.userrSubject.value?.fecha_nacimiento
    );
  }
}
