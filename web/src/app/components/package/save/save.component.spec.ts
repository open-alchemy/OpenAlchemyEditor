import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { SaveComponent } from './save.component';

import { LimitedSpecInfo } from '../../../services/package/types';

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
        description: 'spec no version',
        expectation: 'should not be valid',
        spec: {},
        expectedValid: 'no',
      },
      {
        description: 'spec version null',
        expectation: 'should not be valid',
        spec: { version: null },
        expectedValid: 'no',
      },
      {
        description: 'spec version no valid',
        expectation: 'should not be valid',
        spec: { version: {} },
        expectedValid: 'no',
      },
      {
        description: 'spec version valid false',
        expectation: 'should not be valid',
        spec: { version: { valid: false } },
        expectedValid: 'no',
      },
      {
        description: 'spec version valid true',
        expectation: 'should be valid',
        spec: { version: { valid: true } },
        expectedValid: 'yes',
      },
    ] as {
      description: string;
      expectation: string;
      spec: LimitedSpecInfo;
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
        description: 'spec no version',
        expectation: 'should display help',
        spec: {},
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec version null',
        expectation: 'should display help',
        spec: { version: null },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec version no valid',
        expectation: 'should display help',
        spec: { version: {} },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec version valid false',
        expectation: 'should display help',
        spec: { version: { valid: false } },
        expectedHelp: 'Open API Info Object',
      },
      {
        description: 'spec version valid true',
        expectation: 'should not display help',
        spec: { version: { valid: true } },
        expectedHelp: null,
      },
    ] as {
      description: string;
      expectation: string;
      spec: LimitedSpecInfo;
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
        description: 'spec no proposedName',
        expectation: 'should have empty input',
        spec: {},
        expectedInput: '',
      },
      {
        description: 'spec proposedName null',
        expectation: 'should have empty input',
        spec: { proposedName: null },
        expectedInput: '',
      },
      {
        description: 'spec proposedName with value',
        expectation: 'should have input with value',
        spec: { proposedName: 'name 1' },
        expectedInput: 'name 1',
      },
    ] as {
      description: string;
      expectation: string;
      spec: LimitedSpecInfo;
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
