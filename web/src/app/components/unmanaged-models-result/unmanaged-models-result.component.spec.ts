import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UnmanagedModelsResultComponent } from './unmanaged-models-result.component';
import { EditorService } from '../../services/editor/editor.service';
import { ValidationResponseModel } from '../../services/editor/types';

@Component({ selector: 'app-unmanaged-model-result', template: '' })
class UnmanagedModelResultStubComponent {
  @Input() name: string;
  @Input() model: ValidationResponseModel;
}

describe('UnmanagedModelsResultComponent', () => {
  let editorServiceSpy: jasmine.SpyObj<EditorService>;
  let component: UnmanagedModelsResultComponent;
  let fixture: ComponentFixture<UnmanagedModelsResultComponent>;

  beforeEach(() => {
    editorServiceSpy = jasmine.createSpyObj('EditorService', [
      'validateUnManaged$',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        UnmanagedModelsResultComponent,
        UnmanagedModelResultStubComponent,
      ],
      providers: [
        {
          provide: EditorService,
          useValue: editorServiceSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(UnmanagedModelsResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the heading with no models', () => {
    component.result$ = of({
      value: { result: { valid: true, reason: 'reason 1' } },
      loading: false,
      success: true,
    });

    fixture.detectChanges();

    const h1: HTMLHeadElement = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeFalsy();
  });

  it('should not display the heading with models', () => {
    component.result$ = of({
      value: {
        result: { valid: true, reason: 'reason 1' },
        models: { Model1: { result: { valid: false } } },
      },
      loading: false,
      success: true,
    });

    fixture.detectChanges();

    const h1: HTMLHeadElement = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
  });

  describe('models', () => {
    const parameters = [
      {
        description: 'no models',
        expectation: 'should not display any models',
        result: {
          value: { result: { valid: true } },
          loading: false,
          success: true,
        },
        expectedModels: [],
      },
      {
        description: 'empty models',
        expectation: 'should not display any models',
        result: {
          value: { result: { valid: true }, models: {} },
          loading: false,
          success: true,
        },
        expectedModels: [],
      },
      {
        description: 'single models success null',
        expectation: 'should not display any models',
        result: {
          value: {
            result: { valid: true, reason: 'reason 1' },
            models: {
              model1: { result: { valid: true, reason: 'model 1 reason' } },
            },
          },
          loading: false,
          success: null,
        },
        expectedModels: [],
      },
      {
        description: 'single models success false',
        expectation: 'should not display any models',
        result: {
          value: {
            result: { valid: true, reason: 'reason 1' },
            models: {
              model1: { result: { valid: true, reason: 'model 1 reason' } },
            },
          },
          loading: false,
          success: false,
        },
        expectedModels: [],
      },
      {
        description: 'single models',
        expectation: 'should display the property',
        result: {
          value: {
            result: { valid: true, reason: 'reason 1' },
            models: {
              model1: { result: { valid: true, reason: 'model 1 reason' } },
            },
          },
          loading: false,
          success: true,
        },
        expectedModels: [
          {
            name: 'model1',
            model: { result: { valid: true, reason: 'model 1 reason' } },
          },
        ],
      },
      {
        description: 'multiple models',
        expectation: 'should display the models',
        result: {
          value: {
            result: { valid: true, reason: 'reason 1' },
            models: {
              model1: { result: { valid: true, reason: 'model 1 reason' } },
              model2: { result: { valid: true, reason: 'model 2 reason' } },
            },
          },
          loading: false,
          success: true,
        },
        expectedModels: [
          {
            name: 'model1',
            model: { result: { valid: true, reason: 'model 1 reason' } },
          },
          {
            name: 'model2',
            model: { result: { valid: true, reason: 'model 2 reason' } },
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
              .queryAll(By.directive(UnmanagedModelResultStubComponent))
              .map((property) =>
                property.injector.get(UnmanagedModelResultStubComponent)
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
