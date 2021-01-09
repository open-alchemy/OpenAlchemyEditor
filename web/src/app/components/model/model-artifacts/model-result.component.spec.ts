import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ModelArtifactsComponent } from './model-artifacts.component';
import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({ selector: 'app-model-artifacts-expansion', template: '' })
class ModelArtifactsExpansionStubComponent {
  @Input() artifacts: ArtifactResponseModelArtifacts;
}

describe('ModelArtifactsComponent', () => {
  let component: ModelArtifactsComponent;
  let fixture: ComponentFixture<ModelArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelArtifactsComponent,
        ModelArtifactsExpansionStubComponent,
      ],
    });

    fixture = TestBed.createComponent(ModelArtifactsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the artifacts to the expansion component', () => {
    component.artifacts = {
      tablename: 'table_1',
    };

    fixture.detectChanges();

    const expansionDebugElement = fixture.debugElement.query(
      By.directive(ModelArtifactsExpansionStubComponent)
    );
    expect(expansionDebugElement).toBeTruthy();
    const expansion = expansionDebugElement.injector.get(
      ModelArtifactsExpansionStubComponent
    );
    expect(expansion.artifacts).toEqual({
      tablename: 'table_1',
    });
  });
});
