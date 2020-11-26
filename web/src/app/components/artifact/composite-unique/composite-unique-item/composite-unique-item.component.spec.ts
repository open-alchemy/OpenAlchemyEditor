import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeUniqueItemComponent } from './composite-unique-item.component';

describe('CompositeUniqueItemComponent', () => {
  let component: CompositeUniqueItemComponent;
  let fixture: ComponentFixture<CompositeUniqueItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompositeUniqueItemComponent],
    });

    fixture = TestBed.createComponent(CompositeUniqueItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('artifacts', () => {
    const parameters = [
      {
        description: 'artifacts null',
        expectation: 'should display nothing',
        artifacts: null,
        expectedText: '',
      },
      {
        description: 'artifacts columns empty',
        expectation: 'should display no columns',
        artifacts: { columns: [] },
        expectedText: '- columns:',
      },
      {
        description: 'artifacts columns single',
        expectation: 'should display no columns',
        artifacts: { columns: ['expression 1'] },
        expectedText: '- columns: expression 1',
      },
      {
        description: 'artifacts columns multiple',
        expectation: 'should display no columns',
        artifacts: { columns: ['expression 1', 'expression 2'] },
        expectedText: '- columns: expression 1, expression 2',
      },
      {
        description: 'artifacts columns single and name',
        expectation: 'should display no columns',
        artifacts: { name: 'name 1', columns: ['expression 1'] },
        expectedText: `- name: name 1\n\xa0\xa0columns: expression 1`,
      },
    ];

    parameters.forEach(
      ({ description, expectation, artifacts, expectedText }) => {
        describe(description, () => {
          it(expectation, () => {
            component.item = artifacts;

            fixture.detectChanges();

            const innerText: string = fixture.nativeElement.innerText;
            expect(innerText).toEqual(expectedText);
          });
        });
      }
    );
  });
});
