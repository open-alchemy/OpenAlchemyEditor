import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { JsonPropertyArtifactsComponent } from './json-property-artifacts.component';

import { ArtifactsJsonPropertyModel } from '../../../artifacts.model';

@Component({ selector: 'app-required', template: '' })
class RequiredStubComponent {}

@Component({ selector: 'app-nullable', template: '' })
class NullableStubComponent {}

@Component({ selector: 'app-read-only', template: '' })
class ReadOnlyStubComponent {}

@Component({ selector: 'app-write-only', template: '' })
class WriteOnlyStubComponent {}

@Component({ selector: 'app-primary-key', template: '' })
class PrimaryKeyStubComponent {}

@Component({ selector: 'app-index', template: '' })
class IndexStubComponent {}

@Component({ selector: 'app-unique', template: '' })
class UniqueStubComponent {}

@Component({ selector: 'app-foreign-key', template: '' })
class ForeignKeyStubComponent {
  @Input() foreign_key: string;
}

@Component({ selector: 'app-kwargs', template: '' })
class KwargsStubComponent {
  @Input() kwargs: { [key: string]: any };
}

@Component({ selector: 'app-foreign-key-kwargs', template: '' })
class ForeignKeyKwargsStubComponent {
  @Input() foreign_key_kwargs: { [key: string]: any };
}

@Component({ selector: 'app-schema', template: '' })
class SchemaStubComponent {
  @Input() schema: any;
}

describe('JsonPropertyArtifactsComponent', () => {
  let component: JsonPropertyArtifactsComponent;
  let fixture: ComponentFixture<JsonPropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        JsonPropertyArtifactsComponent,
        RequiredStubComponent,
        NullableStubComponent,
        ReadOnlyStubComponent,
        WriteOnlyStubComponent,
        PrimaryKeyStubComponent,
        IndexStubComponent,
        UniqueStubComponent,
        ForeignKeyStubComponent,
        KwargsStubComponent,
        ForeignKeyKwargsStubComponent,
        SchemaStubComponent,
      ],
    });

    fixture = TestBed.createComponent(JsonPropertyArtifactsComponent);
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
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
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
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: NullableStubComponent,
      },
      {
        description: 'artifacts nullable false',
        expectation: 'should not display nullable',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer', nullable: false },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: NullableStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display read only',
        artifacts: null,
        checkComponent: ReadOnlyStubComponent,
      },
      {
        description: 'artifacts read only not defined',
        expectation: 'should not display read only',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ReadOnlyStubComponent,
      },
      {
        description: 'artifacts read only false',
        expectation: 'should not display read only',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer', read_only: false },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ReadOnlyStubComponent,
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
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: WriteOnlyStubComponent,
      },
      {
        description: 'artifacts write only false',
        expectation: 'should not display write only',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer', write_only: false },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: WriteOnlyStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display primary key',
        artifacts: null,
        checkComponent: PrimaryKeyStubComponent,
      },
      {
        description: 'artifacts primary key false',
        expectation: 'should not display primary key',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: PrimaryKeyStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display index',
        artifacts: null,
        checkComponent: IndexStubComponent,
      },
      {
        description: 'artifacts index not defined',
        expectation: 'should not display index',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: IndexStubComponent,
      },
      {
        description: 'artifacts index false',
        expectation: 'should not display index',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, index: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: IndexStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display unique',
        artifacts: null,
        checkComponent: UniqueStubComponent,
      },
      {
        description: 'artifacts unique not defined',
        expectation: 'should not display unique',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: UniqueStubComponent,
      },
      {
        description: 'artifacts unique false',
        expectation: 'should not display unique',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, unique: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: UniqueStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display foreign key',
        artifacts: null,
        checkComponent: ForeignKeyStubComponent,
      },
      {
        description: 'artifacts foreign key not defined',
        expectation: 'should not display foreign key',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ForeignKeyStubComponent,
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
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: KwargsStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display foreign key kwargs',
        artifacts: null,
        checkComponent: ForeignKeyKwargsStubComponent,
      },
      {
        description: 'artifacts foreign key kwargs not defined',
        expectation: 'should not display foreign key kwargs',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ForeignKeyKwargsStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display schema',
        artifacts: null,
        checkComponent: SchemaStubComponent,
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
          type: 'JSON',
          required: true,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: RequiredStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts nullable true',
        expectation: 'should display nullable',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer', nullable: true },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: NullableStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts read only true',
        expectation: 'should display read only',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer', read_only: true },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ReadOnlyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts write only true',
        expectation: 'should display write only',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer', write_only: true },
          extension: { primary_key: false },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: WriteOnlyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts primary key true',
        expectation: 'should display primary key',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: true },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: PrimaryKeyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts index true',
        expectation: 'should display index',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, index: true },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: IndexStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts unique true',
        expectation: 'should display unique',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, unique: true },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: UniqueStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts foreign key defined',
        expectation: 'should display foreign key',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, foreign_key: 'foreign key 1' },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ForeignKeyStubComponent,
        attribute: 'foreign_key',
        expectedValue: 'foreign key 1',
      },
      {
        description: 'artifacts kwargs defined',
        expectation: 'should display kwargs',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, kwargs: { key: 'value' } },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: KwargsStubComponent,
        attribute: 'kwargs',
        expectedValue: { key: 'value' },
      },
      {
        description: 'artifacts foreign key kwargs defined',
        expectation: 'should display foreign key kwargs',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: {
            primary_key: false,
            foreign_key_kwargs: { key: 'value' },
          },
          schema: {},
        } as ArtifactsJsonPropertyModel,
        checkComponent: ForeignKeyKwargsStubComponent,
        attribute: 'foreign_key_kwargs',
        expectedValue: { key: 'value' },
      },
      {
        description: 'artifacts schema',
        expectation: 'should display schema',
        artifacts: {
          type: 'JSON',
          required: false,
          open_api: { type: 'integer' },
          extension: {
            primary_key: false,
            foreign_key_kwargs: { key: 'value' },
          },
          schema: { key: 'value' },
        } as ArtifactsJsonPropertyModel,
        checkComponent: SchemaStubComponent,
        attribute: 'schema',
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
});
