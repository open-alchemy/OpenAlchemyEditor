import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinsComponent } from './mixins.component';

describe('MixinsComponent', () => {
  let component: MixinsComponent;
  let fixture: ComponentFixture<MixinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MixinsComponent],
    });

    fixture = TestBed.createComponent(MixinsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('list', () => {
    const parameters = [
      {
        description: 'empty list',
        expectation: 'should display no mixins',
        mixins: [],
        expectedText: 'mixins:',
      },
      {
        description: 'single item list',
        expectation: 'should mixins',
        mixins: ['mixin 1'],
        expectedText: 'mixins: mixin 1',
      },
      {
        description: 'multiple item list',
        expectation: 'should mixins',
        mixins: ['mixin 1', 'mixin 2'],
        expectedText: 'mixins: mixin 1, mixin 2',
      },
    ];

    parameters.forEach(({ description, expectation, mixins, expectedText }) => {
      describe(description, () => {
        it(expectation, () => {
          component.mixins = mixins;

          fixture.detectChanges();

          const content: HTMLSpanElement = fixture.nativeElement.querySelector(
            '.content'
          );
          expect(content).toBeTruthy();
          expect(content.innerText).toEqual(expectedText);
        });
      });
    });
  });
});
