import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailCheckComponent } from './pages/email-check/email-check.component';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'email-check',
    component: EmailCheckComponent
  },
  {
    path: 'confirm-register',
    component: ConfirmRegisterComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
