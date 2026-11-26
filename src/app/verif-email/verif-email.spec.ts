import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { VerifEmail } from './verif-email';

describe('VerifEmail', () => {
  let component: VerifEmail;
  let fixture: ComponentFixture<VerifEmail>;
  let authStub: any;
  let toastrStub: any;
  let router: Router;
  const user = Object.assign(new User(), {
    username: 'nadh',
    email: 'nadh@example.com',
    password: 'pass123',
  });

  beforeEach(async () => {
    authStub = {
      regitredUser: user,
      getRegistredUser: jasmine.createSpy('getRegistredUser').and.returnValue(user),
      validateEmail: jasmine.createSpy('validateEmail').and.returnValue(of(user)),
      login: jasmine.createSpy('login').and.returnValue(
        of(new HttpResponse<User>({ headers: new HttpHeaders({ Authorization: 'Bearer token' }) })),
      ),
      saveToken: jasmine.createSpy('saveToken'),
    };
    toastrStub = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      imports: [VerifEmail],
      providers: [
        { provide: AuthService, useValue: authStub },
        { provide: ToastrService, useValue: toastrStub },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifEmail);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('loads the registered user', () => {
    expect(component.user).toBe(user);
  });

  it('validates the code then logs the user in', () => {
    spyOn(router, 'navigate').and.resolveTo(true);
    component.code = '123456';

    component.onValidateEmail();

    expect(authStub.validateEmail).toHaveBeenCalledWith('123456');
    expect(authStub.login).toHaveBeenCalledWith(user);
    expect(authStub.saveToken).toHaveBeenCalledWith('Bearer token');
    expect(toastrStub.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('shows a specific message for an invalid code', () => {
    authStub.validateEmail.and.returnValue(throwError(() => ({ error: { errorCode: 'INVALID_TOKEN' } })));
    component.code = '000000';

    component.onValidateEmail();

    expect(component.err).toBe('Code invalide!');
  });

  it('shows a specific message for an expired code', () => {
    authStub.validateEmail.and.returnValue(throwError(() => ({ error: { errorCode: 'EXPIRED_TOKEN' } })));
    component.code = '000000';

    component.onValidateEmail();

    expect(component.err).toBe("Code a expiré!");
  });
});
