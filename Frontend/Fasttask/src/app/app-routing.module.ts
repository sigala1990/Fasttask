import { SignupComponent } from './component/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AreaClientComponent } from './component/area-client/area-client.component';
import { AuthGuard } from './service/auth/guardAuth/auth.guard';
import { TableroComponent } from './component/tablero/tablero/tablero.component';
import { TestComponent } from './component/test/test/test.component';

const routes: Routes = [
  { path: 'areaClient/:id/tablero/:idTablero', component: TableroComponent },
  {
    path: 'areaClient/:id',
    component: AreaClientComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
