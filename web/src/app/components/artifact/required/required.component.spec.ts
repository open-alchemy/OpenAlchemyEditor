import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RequiredComponent } from './required.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('RequiredComponent', () => {
  let component: RequiredComponent;
  let fixture: ComponentFixture<RequiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(RequiredComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display badge', () => {
    fixture.detectChanges();

    const chipDebugElement = fixture.debugElement.query(
      By.directive(MatChipStubComponent)
    );
    expect(chipDebugElement).toBeTruthy();
    const chip = chipDebugElement.injector.get(MatChipStubComponent);
    expect(chip).toBeTruthy();
  });
});
