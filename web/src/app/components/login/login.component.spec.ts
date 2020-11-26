import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', [
      'login',
      'isLoggedIn',
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: LoginService, useValue: loginServiceSpy }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have login button if already logged in', () => {
    loginServiceSpy.isLoggedIn.and.returnValue(true);

    fixture.detectChanges();

    const a: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    expect(a).toBeFalsy();
  });

  it('should not have login button if not logged in', () => {
    loginServiceSpy.isLoggedIn.and.returnValue(false);

    fixture.detectChanges();

    const a: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    expect(a).toBeTruthy();
  });

  it('should trigger login on LoginService on button click', () => {
    loginServiceSpy.isLoggedIn.and.returnValue(false);

    fixture.detectChanges();

    const a: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    expect(a).toBeTruthy();
    a.click();
    expect(loginServiceSpy.login).toHaveBeenCalledTimes(1);
    expect(loginServiceSpy.login).toHaveBeenCalledWith();
  });
});
