import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authStub: any;

  beforeEach(async () => {
    authStub = {
      getToken: jasmine.createSpy('getToken').and.returnValue(''),
      login: jasmine.createSpy('login'),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [{ provide: AuthService, useValue: authStub }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows a specific message when the user is disabled', () => {
    authStub.login.and.returnValue(
      throwError(() => ({ error: { errorCause: 'disabled', message: "L'utilisateur est désactivé !" } })),
    );
    component.user = Object.assign(new User(), { username: 'nadh', password: 'pass123' });

    component.onLoggedin();

    expect(component.errorMessage).toBe('Utilisateur désactivé, Veuillez contacter votre Administrateur');
  });
});
