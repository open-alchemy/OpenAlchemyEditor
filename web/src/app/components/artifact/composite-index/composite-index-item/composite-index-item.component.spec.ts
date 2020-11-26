import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeIndexItemComponent } from './composite-index-item.component';

describe('CompositeIndexItemComponent', () => {
  let component: CompositeIndexItemComponent;
  let fixture: ComponentFixture<CompositeIndexItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompositeIndexItemComponent],
    });

    fixture = TestBed.createComponent(CompositeIndexItemComponent);
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
        description: 'artifacts expressions empty',
        expectation: 'should display no expressions',
        artifacts: { expressions: [] },
        expectedText: '- expressions:',
      },
      {
        description: 'artifacts expressions single',
        expectation: 'should display no expressions',
        artifacts: { expressions: ['expression 1'] },
        expectedText: '- expressions: expression 1',
      },
      {
        description: 'artifacts expressions multiple',
        expectation: 'should display no expressions',
        artifacts: { expressions: ['expression 1', 'expression 2'] },
        expectedText: '- expressions: expression 1, expression 2',
      },
      {
        description: 'artifacts expressions single and name',
        expectation: 'should display no expressions',
        artifacts: { name: 'name 1', expressions: ['expression 1'] },
        expectedText: `- name: name 1\n\xa0\xa0expressions: expression 1`,
      },
      {
        description: 'artifacts expressions single and unique',
        expectation: 'should display no expressions',
        artifacts: { unique: true, expressions: ['expression 1'] },
        expectedText: `- unique: true\n\xa0\xa0expressions: expression 1`,
      },
      {
        description: 'artifacts expressions single and name and unique',
        expectation: 'should display no expressions',
        artifacts: {
          name: 'name 1',
          unique: true,
          expressions: ['expression 1'],
        },
        expectedText: `- name: name 1\n\xa0\xa0unique: true\n\xa0\xa0expressions: expression 1`,
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
