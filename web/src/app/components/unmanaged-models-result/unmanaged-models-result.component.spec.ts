import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UnmanagedModelsResultComponent } from './unmanaged-models-result.component';
import { ValidatorResultService } from 'src/app/validator-result.service';
import { ValidatorModelModel } from 'src/app/validator.model';

@Component({ selector: 'app-unmanaged-model-result', template: '' })
class UnmanagedModelResultStubComponent {
  @Input() name: string;
  @Input() model: ValidatorModelModel;
}

describe('UnmanagedModelsResultComponent', () => {
  let ValidatorResultServiceSpy: jasmine.SpyObj<ValidatorResultService>;
  let component: UnmanagedModelsResultComponent;
  let fixture: ComponentFixture<UnmanagedModelsResultComponent>;

  beforeEach(() => {
    ValidatorResultServiceSpy = jasmine.createSpyObj('SeedService', [
      'unmanagedResult$',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        UnmanagedModelsResultComponent,
        UnmanagedModelResultStubComponent,
      ],
      providers: [
        {
          provide: ValidatorResultService,
          useValue: ValidatorResultServiceSpy,
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
    ValidatorResultServiceSpy.unmanagedResult$.and.returnValue(
      of({ result: { valid: true, reason: 'reason 1' } })
    );

    fixture.detectChanges();

    const h1: HTMLHeadElement = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeFalsy();
  });

  it('should not display the heading with models', () => {
    ValidatorResultServiceSpy.unmanagedResult$.and.returnValue(
      of({
        result: { valid: true, reason: 'reason 1' },
        models: { Model1: { result: { valid: false } } },
      })
    );

    fixture.detectChanges();

    const h1: HTMLHeadElement = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
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
            model1: { result: { valid: true, reason: 'model 1 reason' } },
          },
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
          result: { valid: true, reason: 'reason 1' },
          models: {
            model1: { result: { valid: true, reason: 'model 1 reason' } },
            model2: { result: { valid: true, reason: 'model 2 reason' } },
          },
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
            ValidatorResultServiceSpy.unmanagedResult$.and.returnValue(
              of(result)
            );

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
