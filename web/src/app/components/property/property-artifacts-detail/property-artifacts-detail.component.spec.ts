import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ArtifactResponsePropertyAll } from '../../../services/editor/types';

import { PropertyArtifactsDetailComponent } from './property-artifacts-detail.component';
import {
  ArtifactsSimplePropertyModel,
  ArtifactsJsonPropertyModel,
  ArtifactsManyToManyRelationshipPropertyModel,
  ArtifactsBackrefPropertyModel,
} from '../../../artifacts.model';

@Component({ selector: 'app-simple-property-artifacts', template: '' })
class SimplePropertyArtifactsStubComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}

@Component({ selector: 'app-json-property-artifacts', template: '' })
class JsonPropertyArtifactsStubComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}

@Component({ selector: 'app-relationship-property-artifacts', template: '' })
class RelationshipPropertyArtifactsStubComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}

@Component({ selector: 'app-backref-property-artifacts', template: '' })
class BackrefPropertyArtifactsStubComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}

describe('PropertyArtifactsDetailComponent', () => {
  let component: PropertyArtifactsDetailComponent;
  let fixture: ComponentFixture<PropertyArtifactsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyArtifactsDetailComponent,
        SimplePropertyArtifactsStubComponent,
        JsonPropertyArtifactsStubComponent,
        RelationshipPropertyArtifactsStubComponent,
        BackrefPropertyArtifactsStubComponent,
      ],
    });

    fixture = TestBed.createComponent(PropertyArtifactsDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create any property components if the artifacts are null', () => {
    component.artifacts = null;

    fixture.detectChanges();

    const simpleDebugElement = fixture.debugElement.query(
      By.directive(SimplePropertyArtifactsStubComponent)
    );
    expect(simpleDebugElement).toBeFalsy();
    const jsonDebugElement = fixture.debugElement.query(
      By.directive(JsonPropertyArtifactsStubComponent)
    );
    expect(jsonDebugElement).toBeFalsy();
    const relationshipDebugElement = fixture.debugElement.query(
      By.directive(RelationshipPropertyArtifactsStubComponent)
    );
    expect(relationshipDebugElement).toBeFalsy();
    const backrefDebugElement = fixture.debugElement.query(
      By.directive(BackrefPropertyArtifactsStubComponent)
    );
    expect(backrefDebugElement).toBeFalsy();
  });

  describe('artifacts defined', () => {
    const parameters = [
      {
        description: 'SIMPLE',
        expectation: 'should display simple component',
        artifacts: {
          type: 'SIMPLE',
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          required: false,
        } as ArtifactsSimplePropertyModel,
        expectedComponent: SimplePropertyArtifactsStubComponent,
      },
      {
        description: 'JSON',
        expectation: 'should display json component',
        artifacts: {
          type: 'JSON',
          open_api: {},
          extension: { primary_key: false },
          required: false,
        } as ArtifactsJsonPropertyModel,
        expectedComponent: JsonPropertyArtifactsStubComponent,
      },
      {
        description: 'JSON',
        expectation: 'should display relationship component',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_MANY',
          parent: 'parent 1',
          required: false,
          secondary: 'secondary 1',
        } as ArtifactsManyToManyRelationshipPropertyModel,
        expectedComponent: RelationshipPropertyArtifactsStubComponent,
      },
      {
        description: 'JSON',
        expectation: 'should display backref component',
        artifacts: {
          type: 'BACKREF',
          sub_type: 'OBJECT',
          required: false,
          properties: [],
          schema: {},
        } as ArtifactsBackrefPropertyModel,
        expectedComponent: BackrefPropertyArtifactsStubComponent,
      },
    ];

    parameters.forEach(
      ({ description, expectation, artifacts, expectedComponent }) => {
        describe(description, () => {
          it(expectation, () => {
            component.artifacts = artifacts;

            fixture.detectChanges();

            const componentDebugElement = fixture.debugElement.query(
              By.directive(expectedComponent)
            );
            expect(componentDebugElement).toBeTruthy();
            const stubComponent = componentDebugElement.injector.get(
              expectedComponent
            );
            expect(stubComponent.artifacts).toEqual(artifacts);
          });
        });
      }
    );
  });
});
