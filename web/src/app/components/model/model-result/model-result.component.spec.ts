import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ModelResultComponent } from './model-result.component';
import { ResultModelModel, ResultPropertyModel } from '../../../result.model';
import { ValidatorResultModel } from '../../../validator.model';
import { ArtifactsModelArtifactsModel } from '../../../artifacts.model';

@Component({ selector: 'app-model-result-badge', template: '' })
class ModelResultBadgeStubComponent {
  @Input() model: ResultModelModel;
}

@Component({ selector: 'app-result', template: '' })
class ResultStubComponent {
  @Input() model: ValidatorResultModel;
}

@Component({ selector: 'app-model-artifacts', template: '' })
class ModelArtifactsStubComponent {
  @Input() artifacts: ArtifactsModelArtifactsModel;
}

@Component({ selector: 'app-property-result', template: '' })
class PropertyResultStubComponent {
  @Input() name: string;
  @Input() model: ResultPropertyModel;
}

describe('ModelResultComponent', () => {
  let component: ModelResultComponent;
  let fixture: ComponentFixture<ModelResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelResultComponent,
        ModelResultBadgeStubComponent,
        ResultStubComponent,
        PropertyResultStubComponent,
        ModelArtifactsStubComponent,
      ],
    });

    fixture = TestBed.createComponent(ModelResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name in the header', () => {
    component.name = 'name 1';
    component.model = { result: { valid: true }, artifacts: null };

    fixture.detectChanges();

    const header: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.header'
    );
    expect(header.innerText).toEqual('name 1');
  });

  it('should pass the model to the badge component', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: true, reason: 'reason 1' },
      artifacts: null,
    };

    fixture.detectChanges();

    const badgeDebugElement = fixture.debugElement.query(
      By.directive(ModelResultBadgeStubComponent)
    );
    const badge = badgeDebugElement.injector.get(ModelResultBadgeStubComponent);
    expect(badge.model).toEqual({
      result: { valid: true, reason: 'reason 1' },
      artifacts: null,
    });
  });

  it('should not pass the result to the result component if model is null', () => {
    component.name = 'name 1';
    component.model = null;

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    expect(resultDebugElement).toBeFalsy();
  });

  it('should not pass the result to the result component if it is null', () => {
    component.name = 'name 1';
    component.model = {
      result: null,
      artifacts: null,
    };

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    expect(resultDebugElement).toBeFalsy();
  });

  it('should pass the result to the result component if it is not valid', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: false, reason: 'reason 1' },
      artifacts: null,
    };

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    expect(resultDebugElement).toBeTruthy();
    const result = resultDebugElement.injector.get(ResultStubComponent);
    expect(result.model).toEqual({ valid: false, reason: 'reason 1' });
  });

  it('should not pass the result to the result component if it is valid', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: true, reason: 'reason 1' },
      artifacts: null,
    };

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    expect(resultDebugElement).toBeFalsy();
  });

  it('should not pass the artifacts to the artifacts component if the result is not valid', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: false, reason: 'reason 1' },
      artifacts: null,
    };

    fixture.detectChanges();

    const artifactsDebugElement = fixture.debugElement.query(
      By.directive(ModelArtifactsStubComponent)
    );
    expect(artifactsDebugElement).toBeFalsy();
  });

  it('should pass the artifacts to the artifacts component if the result is valid', () => {
    component.name = 'name 1';
    component.model = {
      result: { valid: true, reason: 'reason 1' },
      artifacts: { tablename: 'table_1' },
    };

    fixture.detectChanges();

    const artifactsDebugElement = fixture.debugElement.query(
      By.directive(ModelArtifactsStubComponent)
    );
    expect(artifactsDebugElement).toBeTruthy();
    const result = artifactsDebugElement.injector.get(
      ModelArtifactsStubComponent
    );
    expect(result.artifacts).toEqual({ tablename: 'table_1' });
  });

  describe('properties', () => {
    const parameters = [
      {
        description: 'no properties',
        expectation: 'should not display any properties',
        model: { result: { valid: true }, artifacts: null },
        expectedModels: [],
      },
      {
        description: 'null properties',
        expectation: 'should not display any properties',
        model: { result: { valid: true }, artifacts: null, properties: null },
        expectedModels: [],
      },
      {
        description: 'empty properties',
        expectation: 'should not display any properties',
        model: { result: { valid: true }, artifacts: null, properties: {} },
        expectedModels: [],
      },
      {
        description: 'single properties',
        expectation: 'should display the property',
        model: {
          result: { valid: true, reason: 'reason 1' },
          artifacts: null,
          properties: {
            prop1: {
              result: { valid: true, reason: 'prop 1 reason' },
              artifacts: null,
            },
          },
        },
        expectedModels: [
          {
            name: 'prop1',
            model: {
              result: { valid: true, reason: 'prop 1 reason' },
              artifacts: null,
            },
          },
        ],
      },
      {
        description: 'multiple properties',
        expectation: 'should display the properties',
        model: {
          result: { valid: true, reason: 'reason 1' },
          artifacts: null,
          properties: {
            prop1: {
              result: { valid: true, reason: 'prop 1 reason' },
              artifacts: null,
            },
            prop2: {
              result: { valid: true, reason: 'prop 2 reason' },
              artifacts: null,
            },
          },
        },
        expectedModels: [
          {
            name: 'prop1',
            model: {
              result: { valid: true, reason: 'prop 1 reason' },
              artifacts: null,
            },
          },
          {
            name: 'prop2',
            model: {
              result: { valid: true, reason: 'prop 2 reason' },
              artifacts: null,
            },
          },
        ],
      },
    ];

    parameters.forEach(
      ({ description, expectation, model, expectedModels }) => {
        describe(description, () => {
          it(expectation, () => {
            component.name = 'name 1';
            component.model = model;

            fixture.detectChanges();

            const models = fixture.debugElement
              .queryAll(By.directive(PropertyResultStubComponent))
              .map((property) =>
                property.injector.get(PropertyResultStubComponent)
              )
              .map((property) => ({
                name: property.name,
                model: property.model,
              }));
            expect(models as any).toEqual(expectedModels);
          });
        });
      }
    );
  });
});
