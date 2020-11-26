import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ModelArtifactsTitleComponent } from './model-artifacts-title.component';

@Component({ selector: 'app-description', template: '' })
class DescriptionStubComponent {
  @Input() description: string;
}

@Component({ selector: 'app-tablename', template: '' })
class TablenameStubComponent {
  @Input() tablename: string;
}

describe('ModelArtifactsTitleComponent', () => {
  let component: ModelArtifactsTitleComponent;
  let fixture: ComponentFixture<ModelArtifactsTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelArtifactsTitleComponent,
        DescriptionStubComponent,
        TablenameStubComponent,
      ],
    });

    fixture = TestBed.createComponent(ModelArtifactsTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not pass the description if artifacts is null', () => {
    component.artifacts = null;

    fixture.detectChanges();

    const descriptionDebugElement = fixture.debugElement.query(
      By.directive(DescriptionStubComponent)
    );
    expect(descriptionDebugElement).toBeFalsy();
  });

  it('should not pass the tablename if artifacts is null', () => {
    component.artifacts = null;

    fixture.detectChanges();

    const tablenameDebugElement = fixture.debugElement.query(
      By.directive(TablenameStubComponent)
    );
    expect(tablenameDebugElement).toBeFalsy();
  });

  it('should not pass the description if description is not defined', () => {
    component.artifacts = { tablename: 'table_1' };

    fixture.detectChanges();

    const descriptionDebugElement = fixture.debugElement.query(
      By.directive(DescriptionStubComponent)
    );
    expect(descriptionDebugElement).toBeFalsy();
  });

  it('should pass the description if it is in the artifacts', () => {
    component.artifacts = {
      tablename: 'table_1',
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

  it('should pass the tablename if it is in the artifacts', () => {
    component.artifacts = {
      tablename: 'tablename 1',
    };

    fixture.detectChanges();

    const tablenameDebugElement = fixture.debugElement.query(
      By.directive(TablenameStubComponent)
    );
    expect(tablenameDebugElement).toBeTruthy();
    const tablenameComponent = tablenameDebugElement.injector.get(
      TablenameStubComponent
    );
    expect(tablenameComponent.tablename).toEqual('tablename 1');
  });
});
