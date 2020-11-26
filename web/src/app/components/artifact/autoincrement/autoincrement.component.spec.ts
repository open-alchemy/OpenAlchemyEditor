import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AutoincrementComponent } from './autoincrement.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('AutoincrementComponent', () => {
  let component: AutoincrementComponent;
  let fixture: ComponentFixture<AutoincrementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoincrementComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(AutoincrementComponent);
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
