import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verif-email.html',
  styleUrl: './verif-email.css',
})
export class VerifEmail implements OnInit {
  code = '';
  user: User = new User();
  err = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getRegistredUser();
  }

  onValidateEmail(): void {
    this.err = '';
    if (!this.code.trim()) {
      this.err = 'Veuillez entrer le code envoyé par mail';
      return;
    }

    this.loading = true;
    this.authService.validateEmail(this.code.trim()).subscribe({
      next: () => {
        this.authService.login(this.user).subscribe({
          next: (data) => {
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.loading = false;
            this.toastr.success('Email validé', 'Confirmation');
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            this.loading = false;
            this.err = err?.error?.message ?? 'Login ou mot de passe erronés..';
          },
        });
      },
      error: (err: any) => {
        this.loading = false;
        if (err?.error?.errorCode === 'INVALID_TOKEN') {
          this.err = 'Code invalide!';
        } else if (err?.error?.errorCode === 'EXPIRED_TOKEN') {
          this.err = "Code a expiré!";
        } else {
          this.err = err?.error?.message ?? 'Une erreur est survenue';
        }
      },
    });
  }
}
