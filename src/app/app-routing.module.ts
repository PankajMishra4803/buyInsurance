import { LoginComponent } from './account/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'insureyou/login', component: LoginComponent},
  { path: 'insureyou', loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },
  {
    path: '',
    redirectTo: 'insureyou/login',
    pathMatch: 'full'
  }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
