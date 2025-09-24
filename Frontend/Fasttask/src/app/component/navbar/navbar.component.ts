import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionDataService } from 'src/app/service/sessionData/session-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  nameUserr: string = '';
  idUserr: string = '';
  currentLang: string = '';
  constructor(
    private router: Router,
    private sessionDataService: SessionDataService,
    private translate: TranslateService
  ) {
    // translate.setDefaultLang('es');
    // const lang = localStorage.getItem('lang') || 'es'; 
    const lang = window.localStorage.getItem('lang') || 'es';
    translate.use(lang);
    this.currentLang = lang;
    console.log('Idioma actual en navbar: ' + this.currentLang);
    
  }

  ngOnInit(): void {
    const id = window.sessionStorage.getItem('idUserr');
    const username = window.sessionStorage.getItem('nameUserr');
    const idioma = window.localStorage.getItem('lang');
 console.log('Idioma actual en navbar2: ' + this.currentLang);
    if (id && username) {
      this.sessionDataService.setIdUserr({
        id: +id,
        username,
        email: '',
        rol: '',
        fecha_nacimiento: '',
      });
      this.sessionDataService.setNameUserr({
        id: +id,
        username,
        email: '',
        rol: '',
        fecha_nacimiento: '',
      });
    }
  

    this.sessionDataService.userr$.subscribe((userr) => {
      this.nameUserr = userr?.username ?? '';
      this.idUserr = userr?.id ? userr.id.toString() : '';
      // this.currentLang = idioma || 'es';
    });
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.currentLang ='es';
    this.sessionDataService.clearUserr();
    this.router.navigate(['home']);

    // console.log('session IdUser: ' + sessionStorage.getItem('idUserr'));
    // console.log('session nameUser: ' + sessionStorage.getItem('nameUserr'));
    //window.location.reload();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
     window.sessionStorage.setItem('lang', lang);
    localStorage.setItem('lang', lang); // opcional: guardar preferencia
  }
}
