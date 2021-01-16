import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatChipsModule } from '@angular/material/chips';

import { CheckComponent } from './check.component';

describe('CheckComponent', () => {
  let component: CheckComponent;
  let fixture: ComponentFixture<CheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckComponent],
      imports: [MatChipsModule],
    });

    fixture = TestBed.createComponent(CheckComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the description', () => {
    // GIVEN description set on the component
    component.description = 'description 1';

    // WHEN change detection is run
    fixture.detectChanges();

    // THEN the description is displayed
    expect(fixture.nativeElement.innerText).toContain('description 1');
  });

  describe('value true', () => {
    ([
      {
        description: 'value null',
        expectation: 'should not display the badge',
        value: null,
        expectedValue: null,
      },
      {
        description: 'value false',
        expectation: 'should not display the badge',
        value: false,
        expectedValue: null,
      },
      {
        description: 'value true',
        expectation: 'should display the badge',
        value: true,
        expectedValue: 'yes',
      },
    ] as {
      description: string;
      expectation: string;
      value: boolean | null;
      expectedValue: string | null;
    }[]).forEach(({ description, expectation, value, expectedValue }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN value set on the component
          component.value = value;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the badge exists or not as expected
          const matChip: HTMLElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.value-true"]`
          );
          if (expectedValue !== null) {
            expect(matChip.innerText).toEqual(expectedValue);
          } else {
            expect(matChip).toBeFalsy();
          }
        });
      });
    });
  });

  describe('value false', () => {
    ([
      {
        description: 'value null',
        expectation: 'should display the badge',
        value: null,
        expectedValue: 'no',
      },
      {
        description: 'value false',
        expectation: 'should display the badge',
        value: false,
        expectedValue: 'no',
      },
      {
        description: 'value true',
        expectation: 'should not display the badge',
        value: true,
        expectedValue: null,
      },
    ] as {
      description: string;
      expectation: string;
      value: boolean | null;
      expectedValue: string | null;
    }[]).forEach(({ description, expectation, value, expectedValue }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN value set on the component
          component.value = value;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the badge exists or not as expected
          const matChip: HTMLElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.value-false"]`
          );
          if (expectedValue !== null) {
            expect(matChip.innerText).toEqual(expectedValue);
          } else {
            expect(matChip).toBeFalsy();
          }
        });
      });
    });
  });

  describe('hint', () => {
    ([
      {
        description: 'value null',
        expectation: 'should display the hint',
        value: null,
        hint: 'hint 1',
        expectedValue: 'hint 1',
      },
      {
        description: 'value false',
        expectation: 'should display the hint',
        value: false,
        hint: 'hint 1',
        expectedValue: 'hint 1',
      },
      {
        description: 'value true',
        expectation: 'should not display the hint',
        value: true,
        hint: 'hint 1',
        expectedValue: null,
      },
    ] as {
      description: string;
      expectation: string;
      value: boolean | null;
      hint: string;
      expectedValue: string | null;
    }[]).forEach(({ description, expectation, value, hint, expectedValue }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN value set on the component
          component.value = value;
          component.hint = hint;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the hint exists or not as expected
          const span: HTMLSpanElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.hint"]`
          );
          if (expectedValue !== null) {
            expect(span.innerText).toEqual(expectedValue);
          } else {
            expect(span).toBeFalsy();
          }
        });
      });
    });
  });
});
