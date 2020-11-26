import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ManyToManyRelationshipPropertyArtifactsComponent } from './many-to-many-relationship-property-artifacts.component';
import { ArtifactsManyToManyRelationshipPropertyModel } from '../../../artifacts.model';

@Component({ selector: 'app-secondary', template: '' })
class SecondaryStubComponent {
  @Input() secondary: string;
}

describe('ManyToManyRelationshipPropertyArtifactsComponent', () => {
  let component: ManyToManyRelationshipPropertyArtifactsComponent;
  let fixture: ComponentFixture<ManyToManyRelationshipPropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManyToManyRelationshipPropertyArtifactsComponent,
        SecondaryStubComponent,
      ],
    });

    fixture = TestBed.createComponent(
      ManyToManyRelationshipPropertyArtifactsComponent
    );
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
        checkComponent: SecondaryStubComponent,
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
        description: 'artifacts required true',
        expectation: 'should display required',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_MANY',
          parent: 'parent 1',
          required: true,
          secondary: 'secondary 1',
        } as ArtifactsManyToManyRelationshipPropertyModel,
        checkComponent: SecondaryStubComponent,
        attribute: 'secondary',
        expectedValue: 'secondary 1',
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
});
