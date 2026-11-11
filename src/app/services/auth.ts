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
  apiURL: string = environment.authURL;
  token = '';
  loggedUser?: string;
  roles?: string[];
  isloggedIn = false;

  private helper = new JwtHelperService();
  private readonly tokenKey = 'jwt';

  constructor(private router: Router, private http: HttpClient) {
    this.loadToken();
  }

  login(user: User): Observable<HttpResponse<User>> {
    const credentials = { username: user.username, password: user.password };
    return this.http.post<User>(this.apiURL, credentials, { observe: 'response' });
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
