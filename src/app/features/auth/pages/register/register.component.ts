import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Error } from '../../../../shared/models/erro';

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
  passwordMessage: boolean = true;
  errors: Error = new Error();
  submitted = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const qEmail = this.route.snapshot.queryParamMap.get('email');
    this.registerData.email = qEmail ?? (history?.state?.email ?? '');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  sendCode(form: NgForm): void {
    this.submitted = true;
    this.passwordMessage = false;
    this.errors = new Error();
    this.authService.sendRegisterCode(this.registerData)
      .subscribe({
        next: (): void => {
          this.router.navigate(['/auth/verify-email'], { queryParams: { email: this.registerData.email } }).then();
        },
        error: (err: any): void => {
          this.errors = err.error ?? new Error();
          console.log(this.errors);
          try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
        }
      });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']).then();
  }
}
