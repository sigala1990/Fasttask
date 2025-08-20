import { SignupComponent } from './component/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AreaClientComponent } from './component/area-client/area-client.component';
import { AuthGuard } from './service/auth/guardAuth/auth.guard';

const routes: Routes = [
    {path:'areaClient/:id', component: AreaClientComponent,  canActivate: [AuthGuard]},
    {path:'signup', component: SignupComponent},
    {path:'home', component: HomeComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
