import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  user = new User();
  erreur = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getToken() && !this.authService.isTokenExpired()) {
      this.router.navigate(['/makeups']);
    }
  }

  onLoggedin(): void {
    this.erreur = false;
    this.authService.login(this.user).subscribe({
      next: (data) => {
        const jwToken =
          data.headers.get('Authorization') ??
          (data.body as { token?: string } | null)?.token ??
          '';
        this.authService.saveToken(jwToken);
        this.router.navigate(['/makeups']);
      },
      error: () => {
        this.erreur = true;
      },
    });
  }
}
