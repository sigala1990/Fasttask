import { SignupComponent } from './component/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AreaClientComponent } from './component/area-client/area-client.component';

const routes: Routes = [
    {path:'areaClient', component: AreaClientComponent},
    {path:'signup', component: SignupComponent},
    {path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
