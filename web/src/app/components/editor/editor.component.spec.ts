import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AceComponent } from 'ngx-ace-wrapper';

import { EditorComponent } from './editor.component';
import { SeedService } from 'src/app/seed.service';
import { SpecService } from 'src/app/spec.service';

describe('EditorComponent', () => {
  let seedServiceSpy: jasmine.SpyObj<SeedService>;
  let specServiceSpy: jasmine.SpyObj<SpecService>;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(() => {
    seedServiceSpy = jasmine.createSpyObj('SeedService', ['seed$', 'loadSeed']);
    specServiceSpy = jasmine.createSpyObj('SpecService', ['updateSpec']);

    TestBed.configureTestingModule({
      declarations: [EditorComponent, AceComponent],
      providers: [
        { provide: SeedService, useValue: seedServiceSpy },
        { provide: SpecService, useValue: specServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadSeed after initialization', () => {
    expect(seedServiceSpy.loadSeed).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(seedServiceSpy.loadSeed).toHaveBeenCalledWith();
  });

  it('should pass the value of the loaded seed to the editor', () => {
    seedServiceSpy.seed$.and.returnValue(of('seed 1'));

    fixture.detectChanges();

    expect(component.ace.value).toEqual('seed 1');
  });

  it('should pass the editor value to the spec service when onChange is called', () => {
    expect(specServiceSpy.updateSpec).not.toHaveBeenCalled();

    component.onChange('value 1');

    expect(specServiceSpy.updateSpec).toHaveBeenCalledWith('value 1');
  });
});
