import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ModelResultBadgeComponent } from './model-result-badge.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('ModelResultBadgeComponent', () => {
  let component: ModelResultBadgeComponent;
  let fixture: ComponentFixture<ModelResultBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelResultBadgeComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(ModelResultBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display un-selected chip if the model is unmanaged', () => {
    component.model = { result: { valid: true } };
    component.unmanaged = true;
    fixture.detectChanges();

    const matChipUnmanaged = fixture.nativeElement.querySelector('.unmanaged');
    expect(matChipUnmanaged).toBeTruthy();
    const matChipValid = fixture.nativeElement.querySelector('.valid');
    expect(matChipValid).toBeFalsy();
    const matChipInvalid = fixture.nativeElement.querySelector('.invalid');
    expect(matChipInvalid).toBeFalsy();
  });

  it('should display primary chip if the model is valid', () => {
    component.model = { result: { valid: true } };
    fixture.detectChanges();

    const matChipUnmanaged = fixture.nativeElement.querySelector('.unmanaged');
    expect(matChipUnmanaged).toBeFalsy();
    const matChipValid = fixture.nativeElement.querySelector('.valid');
    expect(matChipValid).toBeTruthy();
    const matChipInvalid = fixture.nativeElement.querySelector('.invalid');
    expect(matChipInvalid).toBeFalsy();
  });

  it('should display warn chip if the model is not valid', () => {
    component.model = { result: { valid: false } };
    fixture.detectChanges();

    const matChipUnmanaged = fixture.nativeElement.querySelector('.unmanaged');
    expect(matChipUnmanaged).toBeFalsy();
    const matChipValid = fixture.nativeElement.querySelector('.valid');
    expect(matChipValid).toBeFalsy();
    const matChipInvalid = fixture.nativeElement.querySelector('.invalid');
    expect(matChipInvalid).toBeTruthy();
  });
});
