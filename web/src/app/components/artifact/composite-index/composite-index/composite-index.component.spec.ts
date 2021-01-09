import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CompositeIndexComponent } from './composite-index.component';

import { ArtifactResponseModelIndex } from '../../../../services/editor/types';

@Component({ selector: 'app-composite-index-item', template: '' })
class CompositeIndexItemStubComponent {
  @Input() item: ArtifactResponseModelIndex;
}

describe('CompositeIndexComponent', () => {
  let component: CompositeIndexComponent;
  let fixture: ComponentFixture<CompositeIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompositeIndexComponent, CompositeIndexItemStubComponent],
    });

    fixture = TestBed.createComponent(CompositeIndexComponent);
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
        artifacts: [{ expressions: ['expression 1'] }],
      },
      {
        description: 'artifacts multiple',
        expectation: 'should display multiple item',
        artifacts: [
          { expressions: ['expression 1'] },
          { expressions: ['expression 2'] },
        ],
      },
    ];

    parameters.forEach(({ description, expectation, artifacts }) => {
      describe(description, () => {
        it(expectation, () => {
          component.composite_index = artifacts;

          fixture.detectChanges();

          const itemComponents = fixture.debugElement.queryAll(
            By.directive(CompositeIndexItemStubComponent)
          );
          expect(itemComponents.length).toEqual(
            artifacts ? artifacts.length : 0
          );
          if (artifacts) {
            artifacts.forEach((artifactsItem, index) => {
              const itemComponent = itemComponents[index];
              const itemComponentInstance = itemComponent.injector.get(
                CompositeIndexItemStubComponent
              );
              expect(itemComponentInstance.item).toEqual(artifactsItem);
            });
          }
        });
      });
    });
  });
});
