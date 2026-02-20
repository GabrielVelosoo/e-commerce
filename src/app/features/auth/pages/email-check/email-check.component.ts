import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckEmailRequest, CheckEmailResponse } from '../../models/auth';
import { Error } from '../../../../shared/models/erro';
import { NgForm } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrl: './email-check.component.css'
})
export class EmailCheckComponent {

  checkEmailData: CheckEmailRequest = new CheckEmailRequest();
  errors: Error = new Error();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const qEmail =  this.route.snapshot.queryParamMap.get('email');
    this.checkEmailData.email = qEmail ?? (history?.state?.email ?? '');
  }

  continue(form: NgForm): void {
    if(form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.errors = new Error();
    this.authService.checkEmail(this.checkEmailData.email)
      .subscribe({
        next: (res: CheckEmailResponse) => {
          if(!res.exists && res.flow === 'REGISTER') {
            this.router.navigate(['/auth/confirm-register'], { queryParams: { email: this.checkEmailData.email } }).then();
            return;
          }
          if(res.exists && res.flow === 'LOGIN') {
            this.router.navigate(['/auth/login'], { queryParams: { email: this.checkEmailData.email } }).then();
            return;
          }
        },
        error: (err) => {
          this.errors = err.error ?? new Error();
          try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
        }
      });
  }
}
