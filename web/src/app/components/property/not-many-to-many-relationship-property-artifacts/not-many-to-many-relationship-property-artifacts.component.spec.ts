import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NotManyToManyRelationshipPropertyArtifactsComponent } from './not-many-to-many-relationship-property-artifacts.component';
import { ArtifactResponsePropertyRelationshipNotManyToMany } from '../../../services/editor/types';

@Component({ selector: 'app-foreign-key', template: '' })
class ForeignKeyStubComponent {
  @Input() foreign_key: string;
}

@Component({ selector: 'app-foreign-key-property', template: '' })
class ForeignKeyPropertyStubComponent {
  @Input() foreign_key_property: string;
}

describe('NotManyToManyRelationshipPropertyArtifactsComponent', () => {
  let component: NotManyToManyRelationshipPropertyArtifactsComponent;
  let fixture: ComponentFixture<NotManyToManyRelationshipPropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotManyToManyRelationshipPropertyArtifactsComponent,
        ForeignKeyStubComponent,
        ForeignKeyPropertyStubComponent,
      ],
    });

    fixture = TestBed.createComponent(
      NotManyToManyRelationshipPropertyArtifactsComponent
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
        expectation: 'should not display foreign key',
        artifacts: null,
        checkComponent: ForeignKeyStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display foreign key property',
        artifacts: null,
        checkComponent: ForeignKeyPropertyStubComponent,
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
        description: 'artifacts foreign key',
        expectation: 'should display foreign key',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: true,
          foreign_key: 'foreign.key',
          foreign_key_property: 'foreign_key',
        } as ArtifactResponsePropertyRelationshipNotManyToMany,
        checkComponent: ForeignKeyStubComponent,
        attribute: 'foreign_key',
        expectedValue: 'foreign.key',
      },
      {
        description: 'artifacts foreign key property',
        expectation: 'should display foreign key property',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: true,
          foreign_key: 'foreign.key',
          foreign_key_property: 'foreign_key',
        } as ArtifactResponsePropertyRelationshipNotManyToMany,
        checkComponent: ForeignKeyPropertyStubComponent,
        attribute: 'foreign_key_property',
        expectedValue: 'foreign_key',
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
