import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AceComponent } from 'ngx-ace-wrapper';

import { EditorComponent } from './editor.component';
import { EditorService } from '../../services/editor/editor.service';

describe('EditorComponent', () => {
  let editorServiceSpy: jasmine.SpyObj<EditorService>;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(() => {
    editorServiceSpy = jasmine.createSpyObj('EditorService', [
      'editorComponentOnInit',
      'editorComponentSeedLoaded',
      'editorComponentValueChange',
    ]);

    TestBed.configureTestingModule({
      declarations: [EditorComponent, AceComponent],
      providers: [{ provide: EditorService, useValue: editorServiceSpy }],
    });

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editorComponentOnInit after initialization', () => {
    expect(editorServiceSpy.editorComponentOnInit).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(editorServiceSpy.editorComponentOnInit).toHaveBeenCalledWith();
  });

  [
    {
      description: 'value success null',
      expectation: 'should not set the value',
      current: { value: null, loading: true, success: null },
      expectedValue: undefined,
    },
    {
      description: 'value defined success false',
      expectation: 'should not set the value',
      current: { value: 'seed 1', loading: true, success: false },
      expectedValue: undefined,
    },
    {
      description: 'value defined success true',
      expectation: 'should not set the value',
      current: { value: 'seed 1', loading: true, success: true },
      expectedValue: 'seed 1',
    },
  ].forEach(({ description, expectation, current, expectedValue }) => {
    describe(description, () => {
      it(expectation, () => {
        component.seed$ = of(current);

        fixture.detectChanges();

        expect(component.ace?.value).toEqual(expectedValue);
      });
    });
  });

  it('should call editorComponentSeedLoaded when onChange is called when the seed is equal to the value', () => {
    expect(editorServiceSpy.editorComponentSeedLoaded).not.toHaveBeenCalled();
    expect(editorServiceSpy.editorComponentValueChange).not.toHaveBeenCalled();

    component.onChange('value 1', true);

    expect(editorServiceSpy.editorComponentSeedLoaded).toHaveBeenCalledWith(
      'value 1'
    );
    expect(editorServiceSpy.editorComponentValueChange).not.toHaveBeenCalled();
  });

  it('should call editorComponentValueChange when onChange is called when the seed is equal to the value', () => {
    expect(editorServiceSpy.editorComponentSeedLoaded).not.toHaveBeenCalled();
    expect(editorServiceSpy.editorComponentValueChange).not.toHaveBeenCalled();

    component.onChange('value 1', false);

    expect(editorServiceSpy.editorComponentValueChange).toHaveBeenCalledWith(
      'value 1'
    );
    expect(editorServiceSpy.editorComponentSeedLoaded).not.toHaveBeenCalled();
  });
});
