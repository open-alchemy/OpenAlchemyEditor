import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  RelationshipPropertyArtifactsComponent,
  ArtifactsRelationshipPropertyModelWithNullable,
} from './relationship-property-artifacts.component';

@Component({ selector: 'app-required', template: '' })
class RequiredStubComponent {}

@Component({ selector: 'app-nullable', template: '' })
class NullableStubComponent {}

@Component({ selector: 'app-write-only', template: '' })
class WriteOnlyStubComponent {}

@Component({ selector: 'app-parent', template: '' })
class ParentStubComponent {
  @Input() parent: string;
}

@Component({ selector: 'app-backref-property', template: '' })
class BackrefPropertyStubComponent {
  @Input() backref_property: string;
}

@Component({ selector: 'app-kwargs', template: '' })
class KwargsStubComponent {
  @Input() kwargs: { [key: string]: any };
}

@Component({
  selector: 'app-not-many-to-many-relationship-property-artifacts',
  template: '',
})
class NotManyToManyStubComponent {
  @Input() artifacts: ArtifactsRelationshipPropertyModelWithNullable;
}

@Component({
  selector: 'app-many-to-many-relationship-property-artifacts',
  template: '',
})
class ManyToManyStubComponent {
  @Input() artifacts: ArtifactsRelationshipPropertyModelWithNullable;
}

describe('RelationshipPropertyArtifactsComponent', () => {
  let component: RelationshipPropertyArtifactsComponent;
  let fixture: ComponentFixture<RelationshipPropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelationshipPropertyArtifactsComponent,
        RequiredStubComponent,
        NullableStubComponent,
        WriteOnlyStubComponent,
        ParentStubComponent,
        BackrefPropertyStubComponent,
        KwargsStubComponent,
        NotManyToManyStubComponent,
        ManyToManyStubComponent,
      ],
    });

    fixture = TestBed.createComponent(RelationshipPropertyArtifactsComponent);
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
        checkComponent: RequiredStubComponent,
      },
      {
        description: 'artifacts required false',
        expectation: 'should not display required',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: RequiredStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display nullable',
        artifacts: null,
        checkComponent: NullableStubComponent,
      },
      {
        description: 'artifacts nullable not defined',
        expectation: 'should not display nullable',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: NullableStubComponent,
      },
      {
        description: 'artifacts nullable false',
        expectation: 'should not display nullable',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
          nullable: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: NullableStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display write only',
        artifacts: null,
        checkComponent: WriteOnlyStubComponent,
      },
      {
        description: 'artifacts write only not defined',
        expectation: 'should not display write only',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: WriteOnlyStubComponent,
      },
      {
        description: 'artifacts write only false',
        expectation: 'should not display write only',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
          write_only: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: WriteOnlyStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display parent',
        artifacts: null,
        checkComponent: ParentStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display backref property',
        artifacts: null,
        checkComponent: BackrefPropertyStubComponent,
      },
      {
        description: 'artifacts backref property not defined',
        expectation: 'should not display backref property',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: BackrefPropertyStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display kwargs',
        artifacts: null,
        checkComponent: KwargsStubComponent,
      },
      {
        description: 'artifacts kwargs not defined',
        expectation: 'should not display kwargs',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: KwargsStubComponent,
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
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: true,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: RequiredStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts nullable true',
        expectation: 'should display nullable',
        artifacts: {
          type: 'RELATIONSHIP',
          required: false,
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          nullable: true,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: NullableStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts write only true',
        expectation: 'should display write only',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
          write_only: true,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: WriteOnlyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts parent',
        expectation: 'should display parent',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: ParentStubComponent,
        attribute: 'parent',
        expectedValue: 'parent 1',
      },
      {
        description: 'artifacts backref property',
        expectation: 'should display backref property',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
          backref_property: 'property 1',
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: BackrefPropertyStubComponent,
        attribute: 'backref_property',
        expectedValue: 'property 1',
      },
      {
        description: 'artifacts kwargs defined',
        expectation: 'should display kwargs',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
          kwargs: { key: 'value' },
        } as ArtifactsRelationshipPropertyModelWithNullable,
        checkComponent: KwargsStubComponent,
        attribute: 'kwargs',
        expectedValue: { key: 'value' },
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
        description: 'MANY_TO_ONE',
        expectation: 'should display many-to-one',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedInnerText: 'kind: many-to-one',
      },
      {
        description: 'ONE_TO_ONE',
        expectation: 'should display one-to-one',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'ONE_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedInnerText: 'kind: one-to-one',
      },
      {
        description: 'ONE_TO_MANY',
        expectation: 'should display one-to-many',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'ONE_TO_MANY',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedInnerText: 'kind: one-to-many',
      },
      {
        description: 'MANY_TO_MANY',
        expectation: 'should display many-to-many',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_MANY',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedInnerText: 'kind: many-to-many',
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

  describe('sub component artifacts defined', () => {
    const parameters = [
      {
        description: 'MANY_TO_ONE',
        expectation: 'should display many-to-one',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedComponent: NotManyToManyStubComponent,
      },
      {
        description: 'ONE_TO_ONE',
        expectation: 'should display one-to-one',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'ONE_TO_ONE',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedComponent: NotManyToManyStubComponent,
      },
      {
        description: 'ONE_TO_MANY',
        expectation: 'should display one-to-many',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'ONE_TO_MANY',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedComponent: NotManyToManyStubComponent,
      },
      {
        description: 'MANY_TO_MANY',
        expectation: 'should display many-to-many',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_MANY',
          parent: 'parent 1',
          required: false,
        } as ArtifactsRelationshipPropertyModelWithNullable,
        expectedComponent: ManyToManyStubComponent,
      },
    ];

    parameters.forEach(
      ({ description, expectation, artifacts, expectedComponent }) => {
        describe(description, () => {
          it(expectation, () => {
            component.artifacts = artifacts;

            fixture.detectChanges();

            const expectedComponentDebugElement = fixture.debugElement.query(
              By.directive(expectedComponent)
            );
            expect(expectedComponentDebugElement).toBeTruthy();
            const checkComponentInstance = expectedComponentDebugElement.injector.get(
              expectedComponent
            );
            expect(checkComponentInstance.artifacts).toEqual(artifacts);
          });
        });
      }
    );
  });
});
