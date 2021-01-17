import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { PackageService } from '../../../services/package/package.service';
import {
  PackageSpecState,
  PackageSaveState,
} from '../../../services/package/package.reducer';
import { LimitedSpecInfo } from '../../../services/package/types';
import { PackageBaseComponent } from './package-base.component';

@Component({ selector: 'app-spec-information', template: '' })
class SpecInformationStubComponent {
  @Input() specInfo: LimitedSpecInfo;
}

@Component({ selector: 'app-save', template: '' })
class SaveStubComponent {
  @Input() spec: PackageSpecState;
  @Input() save: PackageSaveState;
}

@Component({ selector: 'app-pip', template: '' })
class PipStubComponent {
  @Input() spec: PackageSpecState;
}

const SPEC: PackageSpecState = {
  info: { title: 'title 1' },
  beingEdited: false,
  valid: true,
  value: 'spec 1',
};
const SAVE: PackageSaveState = {
  loading: false,
  success: true,
};

describe('PackageBaseComponent', () => {
  let packageServiceSpy: jasmine.SpyObj<PackageService>;
  let component: PackageBaseComponent;
  let fixture: ComponentFixture<PackageBaseComponent>;

  beforeEach(() => {
    packageServiceSpy = jasmine.createSpyObj('PackageService', ['spec$']);

    TestBed.configureTestingModule({
      declarations: [
        PackageBaseComponent,
        SpecInformationStubComponent,
        SaveStubComponent,
        PipStubComponent,
      ],
      providers: [
        {
          provide: PackageService,
          useValue: packageServiceSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(PackageBaseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the value of the spec.info to the spec info component', () => {
    component.spec$ = of({ ...SPEC });

    fixture.detectChanges();

    const specInfoDebugElement = fixture.debugElement.query(
      By.directive(SpecInformationStubComponent)
    );
    const specInfo = specInfoDebugElement.injector.get(
      SpecInformationStubComponent
    );
    expect(specInfo.specInfo).toEqual({ ...SPEC.info });
  });

  it('should pass the value of the spec and save to the save component', () => {
    component.spec$ = of({ ...SPEC });
    component.save$ = of({ ...SAVE });

    fixture.detectChanges();

    const saveDebugElement = fixture.debugElement.query(
      By.directive(SaveStubComponent)
    );
    const save = saveDebugElement.injector.get(SaveStubComponent);
    expect(save.spec).toEqual({ ...SPEC });
    expect(save.save).toEqual({ ...SAVE });
  });

  it('should pass the value of the spec to the pip component', () => {
    component.spec$ = of({ ...SPEC });

    fixture.detectChanges();

    const pipDebugElement = fixture.debugElement.query(
      By.directive(PipStubComponent)
    );
    const save = pipDebugElement.injector.get(PipStubComponent);
    expect(save.spec).toEqual({ ...SPEC });
  });
});
