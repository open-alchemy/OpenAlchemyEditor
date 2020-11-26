import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UnmanagedModelResultComponent } from './unmanaged-model-result.component';
import {
  ValidatorModelModel,
  ValidatorResultModel,
} from '../../validator.model';

@Component({ selector: 'app-model-result-badge', template: '' })
class ModelResultBadgeStubComponent {
  @Input() model: ValidatorModelModel;
  @Input() unmanaged: boolean;
}

@Component({ selector: 'app-result', template: '' })
class ResultStubComponent {
  @Input() model: ValidatorResultModel;
  @Input() symbol: string;
}

describe('UnmanagedModelResultComponent', () => {
  let component: UnmanagedModelResultComponent;
  let fixture: ComponentFixture<UnmanagedModelResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UnmanagedModelResultComponent,
        ModelResultBadgeStubComponent,
        ResultStubComponent,
      ],
    });

    fixture = TestBed.createComponent(UnmanagedModelResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name in the header', () => {
    component.name = 'name 1';
    component.model = { result: { valid: true } };

    fixture.detectChanges();

    const header: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.header'
    );
    expect(header.innerText).toEqual('name 1');
  });

  it('should pass the model to the badge component', () => {
    component.name = 'name 1';
    component.model = { result: { valid: true, reason: 'reason 1' } };

    fixture.detectChanges();

    const badgeDebugElement = fixture.debugElement.query(
      By.directive(ModelResultBadgeStubComponent)
    );
    const badge = badgeDebugElement.injector.get(ModelResultBadgeStubComponent);
    expect(badge.model).toEqual({
      result: { valid: true, reason: 'reason 1' },
    });
    expect(badge.unmanaged).toBeTrue();
  });

  it('should pass the result to the result component', () => {
    component.name = 'name 1';
    component.model = { result: { valid: true, reason: 'reason 1' } };

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    const result = resultDebugElement.injector.get(ResultStubComponent);
    expect(result.model).toEqual({ valid: true, reason: 'reason 1' });
    expect(result.symbol).toEqual('info');
  });
});
