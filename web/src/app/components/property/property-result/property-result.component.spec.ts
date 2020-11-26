import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PropertyResultComponent } from './property-result.component';
import { ValidatorResultModel } from '../../../validator.model';
import { ArtifactsPropertyArtifactsModel } from '../../../artifacts.model';

@Component({ selector: 'app-result', template: '' })
class ResultStubComponent {
  @Input() model: ValidatorResultModel;
}

@Component({ selector: 'app-property-artifacts', template: '' })
class PropertyArtifactsStubComponent {
  @Input() artifacts: ArtifactsPropertyArtifactsModel;
}

describe('PropertyResultComponent', () => {
  let component: PropertyResultComponent;
  let fixture: ComponentFixture<PropertyResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyResultComponent,
        ResultStubComponent,
        PropertyArtifactsStubComponent,
      ],
    });

    fixture = TestBed.createComponent(PropertyResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name in the header', () => {
    component.name = 'name 1';
    component.model = { result: { valid: false }, artifacts: null };

    fixture.detectChanges();

    const header: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.header'
    );
    expect(header.innerText).toEqual('name 1');
  });

  it('should not pass the result to the result component if the model is null', () => {
    component.name = 'name 1';
    component.model = null;

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    expect(resultDebugElement).toBeFalsy();
  });

  it('should pass the result to the result component', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: false, reason: 'reason 1' },
      artifacts: null,
    };

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    const result = resultDebugElement.injector.get(ResultStubComponent);
    expect(result.model).toEqual({ valid: false, reason: 'reason 1' });
  });

  it('should not pass the artifacts to the artifacts component if not valid', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: false, reason: 'reason 1' },
      artifacts: null,
    };

    fixture.detectChanges();

    const artifactsDebugElement = fixture.debugElement.query(
      By.directive(PropertyArtifactsStubComponent)
    );
    expect(artifactsDebugElement).toBeFalsy();
  });

  it('should not pass the artifacts to the artifacts component if the model is null', () => {
    component.name = 'name 1';
    component.model = null;

    fixture.detectChanges();

    const artifactsDebugElement = fixture.debugElement.query(
      By.directive(PropertyArtifactsStubComponent)
    );
    expect(artifactsDebugElement).toBeFalsy();
  });

  it('should not pass the artifacts to the artifacts component if the model result is null', () => {
    component.name = 'name 1';
    component.model = {
      result: null,
      artifacts: {
        type: 'SIMPLE',
        open_api: { type: 'integer' },
        extension: { primary_key: false },
        required: false,
      },
    };

    fixture.detectChanges();

    const artifactsDebugElement = fixture.debugElement.query(
      By.directive(PropertyArtifactsStubComponent)
    );
    expect(artifactsDebugElement).toBeFalsy();
  });

  it('should pass the artifacts to the artifacts component if valid', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: true, reason: 'reason 1' },
      artifacts: {
        type: 'SIMPLE',
        open_api: { type: 'integer' },
        extension: { primary_key: false },
        required: false,
      },
    };

    fixture.detectChanges();

    const artifactsDebugElement = fixture.debugElement.query(
      By.directive(PropertyArtifactsStubComponent)
    );
    expect(artifactsDebugElement).toBeTruthy();
    const artifacts = artifactsDebugElement.injector.get(
      PropertyArtifactsStubComponent
    );
    expect(artifacts.artifacts).toEqual({
      type: 'SIMPLE',
      open_api: { type: 'integer' },
      extension: { primary_key: false },
      required: false,
    });
  });
});
