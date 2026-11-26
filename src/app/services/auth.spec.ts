import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('posts registerUser to /register', () => {
    const user = Object.assign(new User(), {
      username: 'nadh',
      email: 'nadh@example.com',
      password: 'pass123',
    });

    service.registerUser(user).subscribe((response) => expect(response.status).toBe(201));

    const request = httpMock.expectOne(environment.baseURL + '/register');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      username: 'nadh',
      email: 'nadh@example.com',
      password: 'pass123',
    });
    request.flush(user, { status: 201, statusText: 'Created' });
  });

  it('gets validateEmail from /verifyEmail/{code}', () => {
    const user = Object.assign(new User(), { username: 'nadh', enabled: true });

    service.validateEmail('123456').subscribe((response) => expect(response.enabled).toBeTrue());

    const request = httpMock.expectOne(environment.baseURL + '/verifyEmail/123456');
    expect(request.request.method).toBe('GET');
    request.flush(user);
  });

  it('stores the registered user', () => {
    const user = Object.assign(new User(), { username: 'nadh', email: 'nadh@example.com' });

    service.setRegistredUser(user);

    expect(service.getRegistredUser()).toBe(user);
    expect(service.regitredUser.email).toBe('nadh@example.com');
  });
});
