import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UniqueComponent } from './unique.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('UniqueComponent', () => {
  let component: UniqueComponent;
  let fixture: ComponentFixture<UniqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniqueComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(UniqueComponent);
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
