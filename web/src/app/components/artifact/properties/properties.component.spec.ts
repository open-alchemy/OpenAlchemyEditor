import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesComponent } from './properties.component';

describe('PropertiesComponent', () => {
  let component: PropertiesComponent;
  let fixture: ComponentFixture<PropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesComponent],
    });

    fixture = TestBed.createComponent(PropertiesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('list', () => {
    const parameters = [
      {
        description: 'empty list',
        expectation: 'should display no properties',
        properties: [],
        expectedText: 'properties:',
      },
      {
        description: 'single item list',
        expectation: 'should properties',
        properties: ['property 1'],
        expectedText: 'properties: property 1',
      },
      {
        description: 'multiple item list',
        expectation: 'should properties',
        properties: ['property 1', 'property 2'],
        expectedText: 'properties: property 1, property 2',
      },
    ];

    parameters.forEach(
      ({ description, expectation, properties, expectedText }) => {
        describe(description, () => {
          it(expectation, () => {
            component.properties = properties;

            fixture.detectChanges();

            const content: HTMLSpanElement = fixture.nativeElement.querySelector(
              '.content'
            );
            expect(content).toBeTruthy();
            expect(content.innerText).toEqual(expectedText);
          });
        });
      }
    );
  });
});
