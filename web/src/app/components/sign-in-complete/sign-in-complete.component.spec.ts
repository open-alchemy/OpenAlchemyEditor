import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SignInCompleteComponent } from './sign-in-complete.component';
import { LoginService } from '../../login.service';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-spinner', template: '' })
class SpinnerStubComponent {}

describe('SignInCompleteComponent', () => {
  let component: SignInCompleteComponent;
  let fixture: ComponentFixture<SignInCompleteComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

    TestBed.configureTestingModule({
      declarations: [SignInCompleteComponent, SpinnerStubComponent],
      providers: [{ provide: LoginService, useValue: loginServiceSpy }],
    });

    fixture = TestBed.createComponent(SignInCompleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner', () => {
    fixture.detectChanges();

    const spinnerDebugElement = fixture.debugElement.query(
      By.directive(SpinnerStubComponent)
    );
    expect(spinnerDebugElement).toBeTruthy();
  });
});
