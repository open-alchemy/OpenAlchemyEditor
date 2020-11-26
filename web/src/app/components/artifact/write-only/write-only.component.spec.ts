import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { WriteOnlyComponent } from './write-only.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('WriteOnlyComponent', () => {
  let component: WriteOnlyComponent;
  let fixture: ComponentFixture<WriteOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteOnlyComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(WriteOnlyComponent);
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
