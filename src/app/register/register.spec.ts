import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authStub: any;
  let toastrStub: any;
  let router: Router;

  beforeEach(async () => {
    authStub = {
      registerUser: jasmine.createSpy('registerUser').and.returnValue(of(new HttpResponse<User>({ status: 201 }))),
      setRegistredUser: jasmine.createSpy('setRegistredUser'),
    };
    toastrStub = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: AuthService, useValue: authStub },
        { provide: ToastrService, useValue: toastrStub },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('marks the form invalid when passwords differ', () => {
    component.myForm.patchValue({
      username: 'nadh',
      email: 'nadh@example.com',
      password: 'pass123',
      confirmPassword: 'autre123',
    });

    expect(component.myForm.hasError('passwordMismatch')).toBeTrue();
    expect(component.myForm.invalid).toBeTrue();
  });

  it('registers, stores the user and navigates to verification', () => {
    spyOn(router, 'navigate').and.resolveTo(true);
    component.myForm.patchValue({
      username: 'nadh',
      email: 'nadh@example.com',
      password: 'pass123',
      confirmPassword: 'pass123',
    });

    component.onRegister();

    expect(authStub.registerUser).toHaveBeenCalled();
    expect(authStub.setRegistredUser).toHaveBeenCalled();
    expect(toastrStub.success).toHaveBeenCalledWith('veillez confirmer votre email', 'Confirmation');
    expect(router.navigate).toHaveBeenCalledWith(['/verifEmail']);
  });
});
