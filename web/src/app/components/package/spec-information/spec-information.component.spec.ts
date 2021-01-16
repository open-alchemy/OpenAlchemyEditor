import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecInformationComponent } from './spec-information.component';

import { LimitedSpecInfo } from '../../../services/package/types';

describe('SpecInformationComponent', () => {
  let component: SpecInformationComponent;
  let fixture: ComponentFixture<SpecInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecInformationComponent],
    });

    fixture = TestBed.createComponent(SpecInformationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ([
    {
      description: 'spec null',
      expectation: 'should not display anything',
      specInfo: null,
      expectedElementValue: {
        title: null,
        version: null,
        description: null,
      },
    },
    {
      description: 'spec with title',
      expectation: 'should display title',
      specInfo: { title: 'title 1' },
      expectedElementValue: {
        title: 'title 1',
        version: null,
        description: null,
      },
    },
    {
      description: 'spec with version null',
      expectation: 'should not display version',
      specInfo: { version: null },
      expectedElementValue: {
        title: null,
        version: null,
        description: null,
      },
    },
    {
      description: 'spec with version empty',
      expectation: 'should not display version',
      specInfo: { version: {} },
      expectedElementValue: {
        title: null,
        version: null,
        description: null,
      },
    },
    {
      description: 'spec with version value null',
      expectation: 'should not display version',
      specInfo: { version: { value: null } },
      expectedElementValue: {
        title: null,
        version: null,
        description: null,
      },
    },
    {
      description: 'spec with version value not null',
      expectation: 'should display version',
      specInfo: { version: { value: 'version 1' } },
      expectedElementValue: {
        title: null,
        version: 'version 1',
        description: null,
      },
    },
    {
      description: 'spec with description',
      expectation: 'should display description',
      specInfo: { description: 'description 1' },
      expectedElementValue: {
        title: null,
        version: null,
        description: 'description 1',
      },
    },
  ] as {
    description: string;
    expectation: string;
    specInfo: LimitedSpecInfo;
    expectedElementValue: {
      title: string | null;
      version: string | null;
      description: string | null;
    };
  }[]).forEach(
    ({ description, expectation, specInfo, expectedElementValue }) => {
      describe(description, () => {
        it(expectation, () => {
          // GIVEN specInfo is defined on component
          component.specInfo = specInfo;

          // WHEN change detection is run
          fixture.detectChanges();

          // THEN the elements are present or not as expected
          const title: HTMLSpanElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.title"]`
          );
          expect(title === null).toEqual(expectedElementValue.title === null);
          if (expectedElementValue.title !== null) {
            expect(title.innerText).toContain(expectedElementValue.title);
          }
          const version: HTMLSpanElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.version"]`
          );
          expect(version === null).toEqual(
            expectedElementValue.version === null
          );
          if (expectedElementValue.version !== null) {
            expect(version.innerText).toContain(expectedElementValue.version);
          }
          const description: HTMLSpanElement = fixture.nativeElement.querySelector(
            `[test-id="${component.selector}.description"]`
          );
          expect(description === null).toEqual(
            expectedElementValue.description === null
          );
          if (expectedElementValue.description !== null) {
            expect(description.innerText).toContain(
              expectedElementValue.description
            );
          }
        });
      });
    }
  );
});
