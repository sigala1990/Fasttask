import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Ssesion_util {

    clearSessionData(): void {
    window.sessionStorage.clear();
    console.log('sesionStorage limpiada: '+ window.sessionStorage.getItem('nameUserr'));
  }
}
