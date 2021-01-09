import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SimplePropertyArtifactsComponent } from './simple-property-artifacts.component';

import { ArtifactResponsePropertySimple } from '../../../services/editor/types';

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

@Component({ selector: 'app-autoincrement', template: '' })
class AutoincrementStubComponent {}

@Component({ selector: 'app-index', template: '' })
class IndexStubComponent {}

@Component({ selector: 'app-unique', template: '' })
class UniqueStubComponent {}

@Component({ selector: 'app-type', template: '' })
class TypeStubComponent {
  @Input() type: string;
}

@Component({ selector: 'app-format', template: '' })
class FormatStubComponent {
  @Input() format: string;
}

@Component({ selector: 'app-max-length', template: '' })
class MaxLengthStubComponent {
  @Input() max_length: number;
}

@Component({ selector: 'app-default', template: '' })
class DefaultStubComponent {
  @Input() default: number | string | boolean;
}
@Component({ selector: 'app-server-default', template: '' })
class ServerDefaultStubComponent {
  @Input() server_default: string;
}

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

describe('SimplePropertyArtifactsComponent', () => {
  let component: SimplePropertyArtifactsComponent;
  let fixture: ComponentFixture<SimplePropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimplePropertyArtifactsComponent,
        RequiredStubComponent,
        NullableStubComponent,
        ReadOnlyStubComponent,
        WriteOnlyStubComponent,
        PrimaryKeyStubComponent,
        AutoincrementStubComponent,
        IndexStubComponent,
        UniqueStubComponent,
        TypeStubComponent,
        FormatStubComponent,
        MaxLengthStubComponent,
        DefaultStubComponent,
        ServerDefaultStubComponent,
        ForeignKeyStubComponent,
        KwargsStubComponent,
        ForeignKeyKwargsStubComponent,
      ],
    });

    fixture = TestBed.createComponent(SimplePropertyArtifactsComponent);
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: NullableStubComponent,
      },
      {
        description: 'artifacts nullable false',
        expectation: 'should not display nullable',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', nullable: false },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: ReadOnlyStubComponent,
      },
      {
        description: 'artifacts read only false',
        expectation: 'should not display read only',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', read_only: false },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: WriteOnlyStubComponent,
      },
      {
        description: 'artifacts write only false',
        expectation: 'should not display write only',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', write_only: false },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: PrimaryKeyStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display autoincrement',
        artifacts: null,
        checkComponent: AutoincrementStubComponent,
      },
      {
        description: 'artifacts autoincrement not defined',
        expectation: 'should not display autoincrement',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: AutoincrementStubComponent,
      },
      {
        description: 'artifacts autoincrement false',
        expectation: 'should not display autoincrement',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, autoincrement: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: AutoincrementStubComponent,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: IndexStubComponent,
      },
      {
        description: 'artifacts index false',
        expectation: 'should not display index',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, index: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: UniqueStubComponent,
      },
      {
        description: 'artifacts unique false',
        expectation: 'should not display unique',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, unique: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: UniqueStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display type',
        artifacts: null,
        checkComponent: TypeStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display format',
        artifacts: null,
        checkComponent: FormatStubComponent,
      },
      {
        description: 'artifacts format not defined',
        expectation: 'should not display format',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: FormatStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display max length',
        artifacts: null,
        checkComponent: MaxLengthStubComponent,
      },
      {
        description: 'artifacts max length not defined',
        expectation: 'should not display max length',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: MaxLengthStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display default',
        artifacts: null,
        checkComponent: DefaultStubComponent,
      },
      {
        description: 'artifacts default not defined',
        expectation: 'should not display default',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: DefaultStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display server default',
        artifacts: null,
        checkComponent: ServerDefaultStubComponent,
      },
      {
        description: 'artifacts server default not defined',
        expectation: 'should not display server default',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: ServerDefaultStubComponent,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
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
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: ForeignKeyKwargsStubComponent,
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
          type: 'SIMPLE',
          required: true,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: RequiredStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts nullable true',
        expectation: 'should display nullable',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', nullable: true },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: NullableStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts read only true',
        expectation: 'should display read only',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', read_only: true },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: ReadOnlyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts write only true',
        expectation: 'should display write only',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', write_only: true },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: WriteOnlyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts primary key true',
        expectation: 'should display primary key',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: true },
        } as ArtifactResponsePropertySimple,
        checkComponent: PrimaryKeyStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts autoincrement true',
        expectation: 'should display autoincrement',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, autoincrement: true },
        } as ArtifactResponsePropertySimple,
        checkComponent: AutoincrementStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts index true',
        expectation: 'should display index',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, index: true },
        } as ArtifactResponsePropertySimple,
        checkComponent: IndexStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts unique true',
        expectation: 'should display unique',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, unique: true },
        } as ArtifactResponsePropertySimple,
        checkComponent: UniqueStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts type',
        expectation: 'should display type',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: TypeStubComponent,
        attribute: 'type',
        expectedValue: 'integer',
      },
      {
        description: 'artifacts format defined',
        expectation: 'should display format',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', format: 'format 1' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: FormatStubComponent,
        attribute: 'format',
        expectedValue: 'format 1',
      },
      {
        description: 'artifacts max length defined',
        expectation: 'should display max length',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', max_length: 1 },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: MaxLengthStubComponent,
        attribute: 'max_length',
        expectedValue: 1,
      },
      {
        description: 'artifacts max length defined 0',
        expectation: 'should display max length',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', max_length: 0 },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: MaxLengthStubComponent,
        attribute: 'max_length',
        expectedValue: 0,
      },
      {
        description: 'artifacts default defined',
        expectation: 'should display default',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', default: 'default 1' },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: DefaultStubComponent,
        attribute: 'default',
        expectedValue: 'default 1',
      },
      {
        description: 'artifacts default defined 0',
        expectation: 'should display default',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer', default: 0 },
          extension: { primary_key: false },
        } as ArtifactResponsePropertySimple,
        checkComponent: DefaultStubComponent,
        attribute: 'default',
        expectedValue: 0,
      },
      {
        description: 'artifacts server default defined',
        expectation: 'should display server default',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, server_default: 'server default 1' },
        } as ArtifactResponsePropertySimple,
        checkComponent: ServerDefaultStubComponent,
        attribute: 'server_default',
        expectedValue: 'server default 1',
      },
      {
        description: 'artifacts server default defined empty',
        expectation: 'should display server default',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, server_default: '' },
        } as ArtifactResponsePropertySimple,
        checkComponent: ServerDefaultStubComponent,
        attribute: 'server_default',
        expectedValue: '',
      },
      {
        description: 'artifacts foreign key defined',
        expectation: 'should display foreign key',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, foreign_key: 'foreign key 1' },
        } as ArtifactResponsePropertySimple,
        checkComponent: ForeignKeyStubComponent,
        attribute: 'foreign_key',
        expectedValue: 'foreign key 1',
      },
      {
        description: 'artifacts kwargs defined',
        expectation: 'should display kwargs',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false, kwargs: { key: 'value' } },
        } as ArtifactResponsePropertySimple,
        checkComponent: KwargsStubComponent,
        attribute: 'kwargs',
        expectedValue: { key: 'value' },
      },
      {
        description: 'artifacts foreign key kwargs defined',
        expectation: 'should display foreign key kwargs',
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: {
            primary_key: false,
            foreign_key_kwargs: { key: 'value' },
          },
        } as ArtifactResponsePropertySimple,
        checkComponent: ForeignKeyKwargsStubComponent,
        attribute: 'foreign_key_kwargs',
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
