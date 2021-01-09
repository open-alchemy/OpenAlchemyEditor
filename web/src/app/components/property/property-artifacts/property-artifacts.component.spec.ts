import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PropertyArtifactsComponent } from './property-artifacts.component';
import { ArtifactResponsePropertyAll } from '../../../services/editor/types';

@Component({ selector: 'app-property-artifacts-expansion', template: '' })
class PropertyArtifactsExpansionStubComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}

describe('PropertyArtifactsComponent', () => {
  let component: PropertyArtifactsComponent;
  let fixture: ComponentFixture<PropertyArtifactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyArtifactsComponent,
        PropertyArtifactsExpansionStubComponent,
      ],
    });

    fixture = TestBed.createComponent(PropertyArtifactsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the artifacts to the expansion component', () => {
    component.artifacts = {
      type: 'SIMPLE',
      open_api: { type: 'integer' },
      extension: { primary_key: false },
      required: false,
    };

    fixture.detectChanges();

    const expansionDebugElement = fixture.debugElement.query(
      By.directive(PropertyArtifactsExpansionStubComponent)
    );
    expect(expansionDebugElement).toBeTruthy();
    const expansion = expansionDebugElement.injector.get(
      PropertyArtifactsExpansionStubComponent
    );
    expect(expansion.artifacts).toEqual({
      type: 'SIMPLE',
      open_api: { type: 'integer' },
      extension: { primary_key: false },
      required: false,
    });
  });
});
