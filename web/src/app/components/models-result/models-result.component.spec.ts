import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { EditorService } from '../../services/editor/editor.service';
import {
  ResultModelModel,
  ValidationResponseResult,
} from '../../services/editor/types';
import { ModelsResultComponent } from './models-result.component';

@Component({ selector: 'app-result', template: '' })
class ResultStubComponent {
  @Input() model: ValidationResponseResult;
}

@Component({ selector: 'app-model-result', template: '' })
class ModelResultStubComponent {
  @Input() name: string;
  @Input() model: ResultModelModel;
}

describe('ModelsResultComponent', () => {
  let editorServiceSpy: jasmine.SpyObj<EditorService>;
  let component: ModelsResultComponent;
  let fixture: ComponentFixture<ModelsResultComponent>;

  beforeEach(() => {
    editorServiceSpy = jasmine.createSpyObj('EditorService', ['result$']);

    TestBed.configureTestingModule({
      declarations: [
        ModelsResultComponent,
        ResultStubComponent,
        ModelResultStubComponent,
      ],
      providers: [
        {
          provide: EditorService,
          useValue: editorServiceSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(ModelsResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the value of the result to the result component', () => {
    component.result$ = of({ result: { valid: true, reason: 'reason 1' } });

    fixture.detectChanges();

    const resultDebugElement = fixture.debugElement.query(
      By.directive(ResultStubComponent)
    );
    const result = resultDebugElement.injector.get(ResultStubComponent);
    expect(result.model).toEqual({ valid: true, reason: 'reason 1' });
  });

  describe('models', () => {
    const parameters = [
      {
        description: 'no models',
        expectation: 'should not display any models',
        result: { result: { valid: true } },
        expectedModels: [],
      },
      {
        description: 'empty models',
        expectation: 'should not display any models',
        result: { result: { valid: true }, models: {} },
        expectedModels: [],
      },
      {
        description: 'single models',
        expectation: 'should display the property',
        result: {
          result: { valid: true, reason: 'reason 1' },
          models: {
            model1: {
              result: { valid: true, reason: 'model 1 reason' },
              artifacts: null,
            },
          },
        },
        expectedModels: [
          {
            name: 'model1',
            model: {
              result: { valid: true, reason: 'model 1 reason' },
              artifacts: null,
            },
          },
        ],
      },
      {
        description: 'multiple models',
        expectation: 'should display the models',
        result: {
          result: { valid: true, reason: 'reason 1' },
          models: {
            model1: {
              result: { valid: true, reason: 'model 1 reason' },
              artifacts: null,
            },
            model2: {
              result: { valid: true, reason: 'model 2 reason' },
              artifacts: null,
            },
          },
        },
        expectedModels: [
          {
            name: 'model1',
            model: {
              result: { valid: true, reason: 'model 1 reason' },
              artifacts: null,
            },
          },
          {
            name: 'model2',
            model: {
              result: { valid: true, reason: 'model 2 reason' },
              artifacts: null,
            },
          },
        ],
      },
    ];

    parameters.forEach(
      ({ description, expectation, result, expectedModels }) => {
        describe(description, () => {
          it(expectation, () => {
            component.result$ = of(result);

            fixture.detectChanges();

            const models = fixture.debugElement
              .queryAll(By.directive(ModelResultStubComponent))
              .map((property) =>
                property.injector.get(ModelResultStubComponent)
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
