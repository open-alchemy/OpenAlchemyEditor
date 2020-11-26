import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ReadOnlyComponent } from './read-only.component';

/* tslint:disable:component-selector */
@Component({ selector: 'mat-chip', template: '' })
class MatChipStubComponent {}

describe('ReadOnlyComponent', () => {
  let component: ReadOnlyComponent;
  let fixture: ComponentFixture<ReadOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadOnlyComponent, MatChipStubComponent],
    });

    fixture = TestBed.createComponent(ReadOnlyComponent);
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
