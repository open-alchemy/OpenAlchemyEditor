import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BackrefPropertyArtifactsComponent } from './backref-property-artifacts.component';

import { ArtifactsBackrefPropertyModel } from '../../../artifacts.model';

@Component({ selector: 'app-properties', template: '' })
class PropertiesStubComponent {
  @Input() properties: string[];
}

describe('BackrefPropertyArtifactsComponent', () => {
  let component: BackrefPropertyArtifactsComponent;
  let fixture: ComponentFixture<BackrefPropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BackrefPropertyArtifactsComponent,
        PropertiesStubComponent,
      ],
    });

    fixture = TestBed.createComponent(BackrefPropertyArtifactsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('presence check', () => {
    const parameters = [
      {
        description: 'artifacts null',
        expectation: 'should not display required',
        artifacts: null,
        checkComponent: PropertiesStubComponent,
      },
    ];

    parameters.forEach(
      ({ description, expectation, artifacts, checkComponent }) => {
        describe(description, () => {
          it(expectation, () => {
            component.artifacts = artifacts;

            fixture.detectChanges();

            const checkComponentDebugElement = fixture.debugElement.query(
              By.directive(checkComponent)
            );
            expect(checkComponentDebugElement).toBeFalsy();
          });
        });
      }
    );
  });

  describe('value check', () => {
    const parameters = [
      {
        description: 'artifacts properties',
        expectation: 'should display properties',
        artifacts: {
          type: 'BACKREF',
          sub_type: 'OBJECT',
          properties: ['property 1'],
        } as ArtifactsBackrefPropertyModel,
        checkComponent: PropertiesStubComponent,
        attribute: 'properties',
        expectedValue: ['property 1'],
      },
    ];

    parameters.forEach(
      ({
        description,
        expectation,
        artifacts,
        checkComponent,
        attribute,
        expectedValue,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            component.artifacts = artifacts;

            fixture.detectChanges();

            const checkComponentDebugElement = fixture.debugElement.query(
              By.directive(checkComponent)
            );
            expect(checkComponentDebugElement).toBeTruthy();
            if (attribute !== null) {
              const checkComponentInstance = checkComponentDebugElement.injector.get(
                checkComponent
              );
              expect(checkComponentInstance[attribute]).toEqual(expectedValue);
            }
          });
        });
      }
    );
  });

  describe('sub type artifacts defined', () => {
    const parameters = [
      {
        description: 'SIMPLE',
        expectation: 'should display object',
        artifacts: {
          type: 'BACKREF',
          sub_type: 'OBJECT',
          properties: ['property 1'],
        } as ArtifactsBackrefPropertyModel,
        expectedInnerText: 'type: object',
      },
      {
        description: 'JSON',
        expectation: 'should display array',
        artifacts: {
          type: 'BACKREF',
          sub_type: 'ARRAY',
          properties: ['property 1'],
        } as ArtifactsBackrefPropertyModel,
        expectedInnerText: 'type: array',
      },
    ];

    parameters.forEach(
      ({ description, expectation, artifacts, expectedInnerText }) => {
        describe(description, () => {
          it(expectation, () => {
            component.artifacts = artifacts;

            fixture.detectChanges();

            const subTypeElement: HTMLSpanElement = fixture.nativeElement.querySelector(
              '.sub-type'
            );
            expect(subTypeElement).toBeTruthy();
            expect(subTypeElement.innerText).toEqual(expectedInnerText);
          });
        });
      }
    );
  });
});
