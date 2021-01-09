import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PropertyArtifactsTitleComponent } from './property-artifacts-title.component';
import {
  ArtifactResponsePropertyRelationshipManyToMany,
  ArtifactResponsePropertyBackref,
  ArtifactResponsePropertyJson,
  ArtifactResponsePropertySimple,
} from '../../../services/editor/types';

@Component({ selector: 'app-description', template: '' })
class DescriptionStubComponent {
  @Input() description: string;
}

@Component({ selector: 'app-tablename', template: '' })
class TablenameStubComponent {
  @Input() tablename: string;
}

describe('PropertyArtifactsTitleComponent', () => {
  let component: PropertyArtifactsTitleComponent;
  let fixture: ComponentFixture<PropertyArtifactsTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyArtifactsTitleComponent,
        DescriptionStubComponent,
        TablenameStubComponent,
      ],
    });

    fixture = TestBed.createComponent(PropertyArtifactsTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not define the type if artifacts is null', () => {
    component.artifacts = null;

    fixture.detectChanges();

    const typeElement = fixture.nativeElement.querySelector('.type');
    expect(typeElement).toBeFalsy();
  });

  it('should not pass the description if artifacts is null', () => {
    component.artifacts = null;

    fixture.detectChanges();

    const descriptionDebugElement = fixture.debugElement.query(
      By.directive(DescriptionStubComponent)
    );
    expect(descriptionDebugElement).toBeFalsy();
  });

  describe('type artifacts defined', () => {
    const parameters = [
      {
        description: 'SIMPLE',
        expectation: 'should display basic',
        artifacts: {
          type: 'SIMPLE',
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          required: false,
        } as ArtifactResponsePropertySimple,
        expectedInnerText: 'basic',
      },
      {
        description: 'JSON',
        expectation: 'should display json',
        artifacts: {
          type: 'JSON',
          open_api: {},
          extension: { primary_key: false },
          required: false,
        } as ArtifactResponsePropertyJson,
        expectedInnerText: 'json',
      },
      {
        description: 'JSON',
        expectation: 'should display relationship',
        artifacts: {
          type: 'RELATIONSHIP',
          sub_type: 'MANY_TO_MANY',
          parent: 'parent 1',
          required: false,
          secondary: 'secondary 1',
        } as ArtifactResponsePropertyRelationshipManyToMany,
        expectedInnerText: 'relationship',
      },
      {
        description: 'JSON',
        expectation: 'should display backref',
        artifacts: {
          type: 'BACKREF',
          sub_type: 'OBJECT',
          required: false,
          properties: [],
          schema: {},
        } as ArtifactResponsePropertyBackref,
        expectedInnerText: 'back reference',
      },
    ];

    parameters.forEach(
      ({ description, expectation, artifacts, expectedInnerText }) => {
        describe(description, () => {
          it(expectation, () => {
            component.artifacts = artifacts;

            fixture.detectChanges();

            const typeElement: HTMLSpanElement = fixture.nativeElement.querySelector(
              '.type'
            );
            expect(typeElement).toBeTruthy();
            expect(typeElement.innerText).toEqual(expectedInnerText);
          });
        });
      }
    );
  });

  it('should not pass the description if description is not defined', () => {
    component.artifacts = {
      type: 'SIMPLE',
      open_api: { type: 'integer' },
      extension: { primary_key: false },
      required: false,
    };

    fixture.detectChanges();

    const descriptionDebugElement = fixture.debugElement.query(
      By.directive(DescriptionStubComponent)
    );
    expect(descriptionDebugElement).toBeFalsy();
  });

  it('should pass the description if it is in the artifacts', () => {
    component.artifacts = {
      type: 'SIMPLE',
      open_api: { type: 'integer' },
      extension: { primary_key: false },
      required: false,
      description: 'description 1',
    };

    fixture.detectChanges();

    const descriptionDebugElement = fixture.debugElement.query(
      By.directive(DescriptionStubComponent)
    );
    expect(descriptionDebugElement).toBeTruthy();
    const descriptionComponent = descriptionDebugElement.injector.get(
      DescriptionStubComponent
    );
    expect(descriptionComponent.description).toEqual('description 1');
  });
});
