import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent implements OnInit {

  email: string = '';
  code: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      const qEmail = this.route.snapshot.queryParamMap.get('email');
      this.email = qEmail ?? (history?.state?.email ?? '');
  }

  verifyRegisterCode(): void {
    this.authService.verifyRegisterCode(this.email, this.code)
      .subscribe({
        next: (res: void): void => {
          console.log(res);
        },
        error: (err: any): void => {
          console.log(err);
        }
      });
  }
}
