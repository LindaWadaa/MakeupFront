import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.baseURL;
  apiURL: string = environment.authURL;
  authApiURL: string = environment.authApiURL;
  token = '';
  loggedUser?: string;
  roles?: string[];
  isloggedIn = false;
  regitredUser: User = new User();

  private helper = new JwtHelperService();
  private readonly tokenKey = 'jwt';

  constructor(private router: Router, private http: HttpClient) {
    this.loadToken();
  }

  login(user: User): Observable<HttpResponse<User>> {
    const credentials = { username: user.username, password: user.password };
    return this.http.post<User>(this.baseURL + '/login', credentials, { observe: 'response' });
  }

  registerUser(user: User): Observable<HttpResponse<User>> {
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return this.http.post<User>(this.baseURL + '/register', payload, { observe: 'response' });
  }

  validateEmail(code: string): Observable<User> {
    return this.http.get<User>(this.baseURL + '/verifyEmail/' + code);
  }

  setRegistredUser(user: User): void {
    this.regitredUser = user;
  }

  getRegistredUser(): User {
    return this.regitredUser;
  }

  register(user: User): Observable<string> {
    return this.http.post(this.authApiURL + '/register', user, { responseType: 'text' });
  }

  verifEmail(email: string, code: string): Observable<string> {
    return this.http.post(this.authApiURL + '/verifyEmail', { email, code }, { responseType: 'text' });
  }

  resendCode(email: string): Observable<string> {
    return this.http.post(this.authApiURL + '/resendCode', { email }, { responseType: 'text' });
  }

  saveToken(jwt: string): void {
    const token = (jwt ?? '').replace(/^Bearer\s+/i, '');
    localStorage.setItem(this.tokenKey, token);
    this.token = token;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  loadToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return;
    }

    this.token = token;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT(): void {
    if (!this.token) {
      return;
    }

    try {
      const decodedToken = this.helper.decodeToken(this.token);
      this.roles = decodedToken?.roles;
      this.loggedUser = decodedToken?.sub;
    } catch {
      this.roles = undefined;
      this.loggedUser = undefined;
    }
  }

  isAdmin(): boolean {
    if (!this.roles) {
      return false;
    }

    return this.roles.indexOf('ADMIN') >= 0;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }

    try {
      return this.helper.isTokenExpired(this.token);
    } catch {
      return true;
    }
  }

  logout(): void {
    this.loggedUser = undefined;
    this.roles = undefined;
    this.token = '';
    this.isloggedIn = false;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
