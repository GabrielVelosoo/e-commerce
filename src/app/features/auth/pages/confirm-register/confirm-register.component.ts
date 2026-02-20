import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrl: './confirm-register.component.css',
})
export class ConfirmRegisterComponent {

  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const qEmail =  this.route.snapshot.queryParamMap.get('email');
    this.email = qEmail ?? (history?.state?.email ?? '');
  }

  proceedToRegister(): void {
    this.router.navigate(['/auth/register'], { queryParams: { email: this.email } }).then();
  }

  changeEmail(): void {
    this.router.navigate(['/auth/email-check'], { queryParams: { email: this.email } }).then();
  }

  loginWithOther(): void {
    this.router.navigate(['/auth/login']).then();
  }
}
