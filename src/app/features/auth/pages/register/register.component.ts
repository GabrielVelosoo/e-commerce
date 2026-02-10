import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  registerData: RegisterRequest = new RegisterRequest();
  confirmPassword: string = '';
  showPassword: boolean = false;
  errors: Error = new Error();
  submitted = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const qEmail = this.route.snapshot.queryParamMap.get('email');
    this.registerData.email = qEmail ?? (history?.state?.email ?? '');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  register(form: NgForm) {
    this.submitted = true;
    this.errors = new Error();
    form.control.markAllAsTouched();
    if(form.invalid || this.registerData.password.length < 6 || this.registerData.password !== this.confirmPassword) {
      return;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']).then();
  }
}
