import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegister(): void {
    this.err = '';
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.user.username = this.myForm.value.username.trim();
    this.user.email = this.myForm.value.email.trim();
    this.user.password = this.myForm.value.password;
    this.loading = true;

    this.authService.registerUser(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.authService.setRegistredUser(this.user);
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        this.loading = false;
        this.err = err?.error?.message ?? err?.error ?? 'Une erreur est survenue';
      },
    });
  }
}
