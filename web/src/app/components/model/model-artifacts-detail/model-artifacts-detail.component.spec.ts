import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ModelArtifactsDetailComponent } from './model-artifacts-detail.component';
import {
  ArtifactResponseModelCompositeIndex,
  ArtifactResponseModelCompositeUnique,
} from '../../../services/editor/types';

@Component({ selector: 'app-inherits', template: '' })
class InheritsStubComponent {}

@Component({ selector: 'app-parent', template: '' })
class ParentStubComponent {
  @Input() parent: string;
}

@Component({ selector: 'app-mixins', template: '' })
class MixinsStubComponent {
  @Input() mixins: string[];
}

@Component({ selector: 'app-kwargs', template: '' })
class KwargsStubComponent {
  @Input() kwargs: { [key: string]: any };
}

@Component({ selector: 'app-composite-index', template: '' })
class CompositeIndexStubComponent {
  @Input() composite_index: ArtifactResponseModelCompositeIndex;
}

@Component({ selector: 'app-composite-unique', template: '' })
class CompositeUniqueStubComponent {
  @Input() composite_unique: ArtifactResponseModelCompositeUnique;
}

describe('ModelArtifactsDetailComponent', () => {
  let component: ModelArtifactsDetailComponent;
  let fixture: ComponentFixture<ModelArtifactsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelArtifactsDetailComponent,
        InheritsStubComponent,
        ParentStubComponent,
        MixinsStubComponent,
        KwargsStubComponent,
        CompositeIndexStubComponent,
        CompositeUniqueStubComponent,
      ],
    });

    fixture = TestBed.createComponent(ModelArtifactsDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('presence check', () => {
    const parameters = [
      {
        description: 'artifacts null',
        expectation: 'should not display inherits',
        artifacts: null,
        checkComponent: InheritsStubComponent,
      },
      {
        description: 'artifacts inherits false',
        expectation: 'should not display inherits',
        artifacts: { tablename: 'table 1', inherits: false },
        checkComponent: InheritsStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display parent',
        artifacts: null,
        checkComponent: ParentStubComponent,
      },
      {
        description: 'artifacts parent not defined',
        expectation: 'should not display parent',
        artifacts: { tablename: 'table 1' },
        checkComponent: ParentStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display mixins',
        artifacts: null,
        checkComponent: MixinsStubComponent,
      },
      {
        description: 'artifacts mixins not defined',
        expectation: 'should not display mixins',
        artifacts: { tablename: 'table 1' },
        checkComponent: MixinsStubComponent,
      },
      {
        description: 'artifacts mixins empty',
        expectation: 'should not display mixins',
        artifacts: { tablename: 'table 1', mixins: [] },
        checkComponent: MixinsStubComponent,
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
        artifacts: { tablename: 'table 1' },
        checkComponent: KwargsStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display composite index',
        artifacts: null,
        checkComponent: CompositeIndexStubComponent,
      },
      {
        description: 'artifacts composite index not defined',
        expectation: 'should not display composite index',
        artifacts: { tablename: 'table 1' },
        checkComponent: CompositeIndexStubComponent,
      },
      {
        description: 'artifacts null',
        expectation: 'should not display composite unique',
        artifacts: null,
        checkComponent: CompositeUniqueStubComponent,
      },
      {
        description: 'artifacts composite unique not defined',
        expectation: 'should not display composite unique',
        artifacts: { tablename: 'table 1' },
        checkComponent: CompositeUniqueStubComponent,
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
        description: 'artifacts inherits true',
        expectation: 'should display inherits',
        artifacts: { tablename: 'table 1', inherits: true },
        checkComponent: InheritsStubComponent,
        attribute: null,
        expectedValue: null,
      },
      {
        description: 'artifacts parent set',
        expectation: 'should display parent',
        artifacts: { tablename: 'table 1', parent: 'parent 1' },
        checkComponent: ParentStubComponent,
        attribute: 'parent',
        expectedValue: 'parent 1',
      },
      {
        description: 'artifacts mixins set',
        expectation: 'should display mixins',
        artifacts: { tablename: 'table 1', mixins: ['mixin 1'] },
        checkComponent: MixinsStubComponent,
        attribute: 'mixins',
        expectedValue: ['mixin 1'],
      },
      {
        description: 'artifacts kwargs set',
        expectation: 'should display kwargs',
        artifacts: { tablename: 'table 1', kwargs: { key: 'value' } },
        checkComponent: KwargsStubComponent,
        attribute: 'kwargs',
        expectedValue: { key: 'value' },
      },
      {
        description: 'artifacts composite index set',
        expectation: 'should display composite index',
        artifacts: {
          tablename: 'table 1',
          composite_index: [{ expressions: ['expression 1'] }],
        },
        checkComponent: CompositeIndexStubComponent,
        attribute: 'composite_index',
        expectedValue: [{ expressions: ['expression 1'] }],
      },
      {
        description: 'artifacts composite unique set',
        expectation: 'should display composite unique',
        artifacts: {
          tablename: 'table 1',
          composite_unique: [{ columns: ['column 1'] }],
        },
        checkComponent: CompositeUniqueStubComponent,
        attribute: 'composite_unique',
        expectedValue: [{ columns: ['column 1'] }],
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
