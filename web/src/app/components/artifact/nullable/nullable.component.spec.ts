import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NullableComponent } from './nullable.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('NullableComponent', () => {
  let component: NullableComponent;
  let fixture: ComponentFixture<NullableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NullableComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(NullableComponent);
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
