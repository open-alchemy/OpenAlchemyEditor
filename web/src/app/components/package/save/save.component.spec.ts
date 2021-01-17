import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SaveComponent } from './save.component';

import {
  PackageSpecState,
  PackageSaveState,
} from '../../../services/package/package.reducer';
import { PackageService } from '../../../services/package/package.service';

@Component({ selector: 'app-check', template: '' })
class CheckStubComponent {
  @Input() description: string | null = null;
  @Input() value: boolean | null = null;
  @Input() hint: string | null = null;
}

describe('SaveComponent', () => {
  let component: SaveComponent;
  let fixture: ComponentFixture<SaveComponent>;
  let packageServiceSpy: jasmine.SpyObj<PackageService>;

  beforeEach(() => {
    packageServiceSpy = jasmine.createSpyObj('PackageService', [
      'saveComponentSaveClick',
    ]);

    TestBed.configureTestingModule({
      declarations: [SaveComponent, CheckStubComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PackageService, useValue: packageServiceSpy }],
    });

    fixture = TestBed.createComponent(SaveComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('spec valid', () => {
    ([
      {
        description: 'spec null',
        expectation: 'should set value to false',
        spec: null,
        expectedValue: false,
      },
      {
        description: 'spec no valid',
        expectation: 'should set value to false',
        spec: {},
        expectedValue: false,
      },
      {
        description: 'spec valid null',
        expectation: 'should set value to false',
        spec: { valid: null },
        expectedValue: false,
      },
      {
        description: 'spec valid false',
        expectation: 'should set value to false',
        spec: { valid: false },
        expectedValue: false,
      },
      {
        description: 'spec valid true',
        expectation: 'should set value to true',
        spec: { valid: true },
        expectedValue: true,
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      expectedValue: boolean;
    }[]).forEach(({ description, expectation, spec, expectedValue }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN spec set on the component
          component.spec = spec;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the expected value is passed to the check component
          const checkDebugElement = fixture.debugElement.query(
            By.css(`[test-id="${component.selector}.spec-valid"]`)
          );
          const check = checkDebugElement.injector.get(CheckStubComponent);
          expect(check.value).toEqual(expectedValue);
          expect(check.description).toEqual('schemas valid:');
          expect(check.hint).toEqual(component.specHint);
        });
      });
    });
  });

  describe('version valid', () => {
    ([
      {
        description: 'spec null',
        expectation: 'should set value to false',
        spec: null,
        expectedValue: false,
      },
      {
        description: 'spec no info',
        expectation: 'should set value to false',
        spec: {},
        expectedValue: false,
      },
      {
        description: 'spec info null',
        expectation: 'should set value to false',
        spec: { info: null },
        expectedValue: false,
      },
      {
        description: 'spec info no version',
        expectation: 'should set value to false',
        spec: { info: {} },
        expectedValue: false,
      },
      {
        description: 'spec info version null',
        expectation: 'should set value to false',
        spec: { info: { version: null } },
        expectedValue: false,
      },
      {
        description: 'spec info version no valid',
        expectation: 'should set value to false',
        spec: { info: { version: {} } },
        expectedValue: false,
      },
      {
        description: 'spec info version valid false',
        expectation: 'should set value to false',
        spec: { info: { version: { valid: false } } },
        expectedValue: false,
      },
      {
        description: 'spec info version valid true',
        expectation: 'should set value to true',
        spec: { info: { version: { valid: true } } },
        expectedValue: true,
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      expectedValue: boolean;
    }[]).forEach(({ description, expectation, spec, expectedValue }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN spec set on the component
          component.spec = spec;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the expected value is passed to the check component
          const checkDebugElement = fixture.debugElement.query(
            By.css(`[test-id="${component.selector}.version-valid"]`)
          );
          const check = checkDebugElement.injector.get(CheckStubComponent);
          expect(check.value).toEqual(expectedValue);
          expect(check.description).toEqual(
            'package version (based on specification) valid:'
          );
          expect(check.hint).toEqual(component.versionHint);
        });
      });
    });
  });

  describe('input', () => {
    ([
      {
        description: 'spec null',
        expectation: 'should have empty input',
        spec: null,
        expectedInput: '',
      },
      {
        description: 'spec no info',
        expectation: 'should have empty input',
        spec: {},
        expectedInput: '',
      },
      {
        description: 'spec info null',
        expectation: 'should have empty input',
        spec: { info: null },
        expectedInput: '',
      },
      {
        description: 'spec info no proposedName',
        expectation: 'should have empty input',
        spec: { info: {} },
        expectedInput: '',
      },
      {
        description: 'spec info proposedName null',
        expectation: 'should have empty input',
        spec: { info: { proposedName: null } },
        expectedInput: '',
      },
      {
        description: 'spec info proposedName with value',
        expectation: 'should have input with value',
        spec: { info: { proposedName: 'name 1' } },
        expectedInput: 'name 1',
      },
      {
        description: 'spec info proposedName with value actualName null',
        expectation: 'should have input with proposed name value',
        spec: { info: { proposedName: 'name 1', actualName: null } },
        expectedInput: 'name 1',
      },
      {
        description: 'spec info proposedName with value actualName defined',
        expectation: 'should have input with actual name value',
        spec: { info: { proposedName: 'name 1', actualName: 'name 2' } },
        expectedInput: 'name 2',
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      expectedInput: string | null;
    }[]).forEach(({ description, expectation, spec, expectedInput }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN spec set on the component
          component.spec = spec;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the input has the expected value
          const input: HTMLInputElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.input"]`
          );
          expect(input.value).toEqual(expectedInput);
          expect(component.name.nativeElement.value).toEqual(expectedInput);
        });
      });
    });

    describe('when value changes', () => {
      it('should update the name', () => {
        // GIVEN

        // WHEN change detection is run and the input value is updated
        fixture.detectChanges();
        const input: HTMLInputElement = fixture.nativeElement.querySelector(
          `[test-id="${component.selector}.input"]`
        );
        const value = 'value 1';
        input.value = value;

        // THEN the name has the expected value
        expect(component.name.nativeElement.value).toEqual(value);
      });
    });
  });

  describe('save disabled', () => {
    ([
      {
        description: 'spec null save not loading',
        expectation: 'should be disabled',
        spec: null,
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec info missing beingEdited false and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec info null beingEdited false and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: null,
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec info version missing beingEdited false and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: {},
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec info version null beingEdited false and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: null },
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec info version valid missing beingEdited false and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: {} },
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec info version valid false beingEdited false and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: false } },
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited missing and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited true and valid true save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: true,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid missing save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid false save not loading',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
          valid: false,
        },
        save: { loading: false },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid true save null',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
          valid: true,
        },
        save: null,
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid true save loading missing',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
          valid: true,
        },
        save: {},
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid true save loading null',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
          valid: true,
        },
        save: { loading: null },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid true save loading true',
        expectation: 'should be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
          valid: true,
        },
        save: { loading: true },
        expectedDisabled: true,
      },
      {
        description:
          'spec version valid beingEdited false and valid true save not loading',
        expectation: 'should not be disabled',
        spec: {
          info: { version: { valid: true } },
          beingEdited: false,
          valid: true,
        },
        save: { loading: false },
        expectedDisabled: false,
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      save: PackageSaveState;
      expectedDisabled: boolean;
    }[]).forEach(
      ({ description, expectation, spec, save, expectedDisabled }) => {
        describe(description, () => {
          it(expectation, () => {
            // GIVEN save and spec set on the component
            component.spec = spec;
            component.save = save;

            // WHEN change detection is run
            fixture.detectChanges();

            // THEN the button has the expected disabled value
            const button: HTMLButtonElement = fixture.nativeElement.querySelector(
              `[test-id="${component.selector}.save"]`
            );
            expect(button.disabled).toEqual(expectedDisabled);
          });
        });
      }
    );
  });

  describe('save click', () => {
    it('should call saveComponentSaveClick with the spec ane name', () => {
      // GIVEN spec set on the component
      const value = 'value 1';
      const name = 'value 1';
      component.spec = {
        info: { version: { valid: true, value: 'version 1' } },
        beingEdited: false,
        valid: true,
        value,
      };
      component.save = { loading: false, success: true };

      // WHEN change detection is run and the name is set and save is clicked
      fixture.detectChanges();
      const input: HTMLInputElement = fixture.nativeElement.querySelector(
        `[test-id="${component.selector}.input"]`
      );
      expect(input).toBeTruthy();
      input.value = name;
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(
        `[test-id="${component.selector}.save"]`
      );
      expect(button).toBeTruthy();
      expect(button.disabled).toBeFalsy();
      button.click();
      fixture.detectChanges();

      // THEN saveComponentSaveClick has been called
      expect(packageServiceSpy.saveComponentSaveClick).toHaveBeenCalledOnceWith(
        value,
        name
      );
    });
  });
});
