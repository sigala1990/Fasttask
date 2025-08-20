import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaClientComponent } from './component/area-client/area-client.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './component/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CreateBoardComponent } from './modal/createBoard/create-board/create-board.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TableroComponent } from './component/tablero/tablero/tablero.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AreaClientComponent,
    SignupComponent,
    NavbarComponent,
    CreateBoardComponent,
    TableroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
