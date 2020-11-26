import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CompositeUniqueComponent } from './composite-unique.component';

import { ArtifactsCompositeUniqueItemModel } from '../../../../artifacts.model';

@Component({ selector: 'app-composite-unique-item', template: '' })
class CompositeUniqueItemStubComponent {
  @Input() item: ArtifactsCompositeUniqueItemModel;
}

describe('CompositeUniqueComponent', () => {
  let component: CompositeUniqueComponent;
  let fixture: ComponentFixture<CompositeUniqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompositeUniqueComponent,
        CompositeUniqueItemStubComponent,
      ],
    });

    fixture = TestBed.createComponent(CompositeUniqueComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('artifacts', () => {
    const parameters = [
      {
        description: 'artifacts null',
        expectation: 'should display nothing',
        artifacts: null,
      },
      {
        description: 'artifacts empty',
        expectation: 'should display no items',
        artifacts: [],
      },
      {
        description: 'artifacts single',
        expectation: 'should display single item',
        artifacts: [{ columns: ['column 1'] }],
      },
      {
        description: 'artifacts multiple',
        expectation: 'should display multiple item',
        artifacts: [{ columns: ['column 1'] }, { columns: ['column 2'] }],
      },
    ];

    parameters.forEach(({ description, expectation, artifacts }) => {
      describe(description, () => {
        it(expectation, () => {
          component.composite_unique = artifacts;

          fixture.detectChanges();

          const itemComponents = fixture.debugElement.queryAll(
            By.directive(CompositeUniqueItemStubComponent)
          );
          expect(itemComponents.length).toEqual(
            artifacts ? artifacts.length : 0
          );
          if (artifacts) {
            artifacts.forEach((artifactsItem, index) => {
              const itemComponent = itemComponents[index];
              const itemComponentInstance = itemComponent.injector.get(
                CompositeUniqueItemStubComponent
              );
              expect(itemComponentInstance.item).toEqual(artifactsItem);
            });
          }
        });
      });
    });
  });
});
