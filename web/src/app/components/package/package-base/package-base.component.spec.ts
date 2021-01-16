import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { PackageService } from '../../../services/package/package.service';
import { PackageSpecState } from '../../../services/package/package.reducer';
import { LimitedSpecInfo } from '../../../services/package/types';
import { PackageBaseComponent } from './package-base.component';

@Component({ selector: 'app-spec-information', template: '' })
class SpecInformationStubComponent {
  @Input() specInfo: LimitedSpecInfo;
}

@Component({ selector: 'app-save', template: '' })
class SaveStubComponent {
  @Input() spec: PackageSpecState;
}

const SPEC = {
  info: { title: 'title 1' },
  beingEdited: false,
  valid: true,
  value: 'spec 1',
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

  it('should pass the value of the spec to the save component', () => {
    component.spec$ = of({ ...SPEC });

    fixture.detectChanges();

    const saveDebugElement = fixture.debugElement.query(
      By.directive(SaveStubComponent)
    );
    const save = saveDebugElement.injector.get(SaveStubComponent);
    expect(save.spec).toEqual({ ...SPEC });
  });
});
