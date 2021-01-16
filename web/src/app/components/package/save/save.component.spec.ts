import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { SaveComponent } from './save.component';

import { PackageSpecState } from '../../../services/package/package.reducer';

describe('SaveComponent', () => {
  let component: SaveComponent;
  let fixture: ComponentFixture<SaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        NoopAnimationsModule,
        MatChipsModule,
      ],
    });

    fixture = TestBed.createComponent(SaveComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('version valid', () => {
    ([
      {
        description: 'spec null',
        expectation: 'should not be valid',
        spec: null,
        expectedValid: 'no',
      },
      {
        description: 'spec no info',
        expectation: 'should not be valid',
        spec: {},
        expectedValid: 'no',
      },
      {
        description: 'spec info null',
        expectation: 'should not be valid',
        spec: { info: null },
        expectedValid: 'no',
      },
      {
        description: 'spec info no version',
        expectation: 'should not be valid',
        spec: { info: {} },
        expectedValid: 'no',
      },
      {
        description: 'spec info version null',
        expectation: 'should not be valid',
        spec: { info: { version: null } },
        expectedValid: 'no',
      },
      {
        description: 'spec info version no valid',
        expectation: 'should not be valid',
        spec: { info: { version: {} } },
        expectedValid: 'no',
      },
      {
        description: 'spec info version valid false',
        expectation: 'should not be valid',
        spec: { info: { version: { valid: false } } },
        expectedValid: 'no',
      },
      {
        description: 'spec info version valid true',
        expectation: 'should be valid',
        spec: { info: { version: { valid: true } } },
        expectedValid: 'yes',
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      expectedValid: string;
    }[]).forEach(({ description, expectation, spec, expectedValid }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN spec set on the component
          component.spec = spec;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the expected version valid is shown
          const versionValid: HTMLSpanElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.version-valid"]`
          );
          expect(versionValid.innerText).toContain(expectedValid);
        });
      });
    });
  });

  describe('version help', () => {
    ([
      {
        description: 'spec null',
        expectation: 'should display help',
        spec: null,
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec no info',
        expectation: 'should display help',
        spec: {},
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec info null',
        expectation: 'should display help',
        spec: { info: null },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec info no version',
        expectation: 'should display help',
        spec: { info: {} },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec info version null',
        expectation: 'should display help',
        spec: { info: { version: null } },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec info version no valid',
        expectation: 'should display help',
        spec: { info: { version: {} } },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec info version valid false',
        expectation: 'should display help',
        spec: { info: { version: { valid: false } } },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec info version valid true',
        expectation: 'should not display help',
        spec: { info: { version: { valid: true } } },
        expectedHelp: null,
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      expectedHelp: string | null;
    }[]).forEach(({ description, expectation, spec, expectedHelp }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN spec set on the component
          component.spec = spec;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the expected version help is shown
          const versionHelp: HTMLSpanElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.version-help"]`
          );
          if (expectedHelp !== null) {
            expect(versionHelp.innerText).toContain(expectedHelp);
          } else {
            expect(versionHelp).toBeFalsy();
          }
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
        });
      });
    });
  });
});
