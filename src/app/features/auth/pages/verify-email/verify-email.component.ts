import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Error } from '../../../../shared/models/erro';

@Component({
  standalone: false,
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent implements OnInit {

  email: string = '';
  code: string = '';
  errors: Error = new Error();
  resendSuccessMessage: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      const qEmail = this.route.snapshot.queryParamMap.get('email');
      this.email = qEmail ?? (history?.state?.email ?? '');
  }

  changeEmail(): void {
    this.router.navigate(['/auth/email-check'], { queryParams: { email: this.email } }).then();
  }

  verifyRegisterCode(): void {
    this.errors = new Error();
    this.resendSuccessMessage = false;
    this.authService.verifyRegisterCode(this.email, this.code)
      .subscribe({
        next: (): void => {
          this.errors = new Error();
          this.resendSuccessMessage = false;
        },
        error: (err: any): void => {
          this.errors = err.error ?? new Error();
          try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
          console.log(err);
        }
      });
  }

  resendCode(): void {
    this.errors = new Error();
    this.authService.resendRegisterCode(this.email)
      .subscribe({
        next: (): void => {
          this.resendSuccessMessage = true;
          try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
        },
        error: (err: any): void => {
          console.log(err);
        }
      });
  }
}
