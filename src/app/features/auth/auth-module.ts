import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { EmailCheckComponent } from './pages/email-check/email-check.component';
import { FormsModule } from '@angular/forms';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';


@NgModule({
  declarations: [
    EmailCheckComponent,
    ConfirmRegisterComponent,
    RegisterComponent,
    VerifyEmailComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
