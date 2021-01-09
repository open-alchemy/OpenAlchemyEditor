import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { SeedComponent } from './seed.component';
import { EditorService } from '../../services/editor/editor.service';
import {
  EditorSeedSelectedState,
  EditorSeedAvailableState,
} from '../../services/editor/editor.reducer';

@Component({ selector: 'mat-label', template: '' })
class MatLabelStubComponent {}

describe('SeedComponent', () => {
  let editorServiceSpy: jasmine.SpyObj<EditorService>;
  let component: SeedComponent;
  let fixture: ComponentFixture<SeedComponent>;

  beforeEach(() => {
    editorServiceSpy = jasmine.createSpyObj('EditorService', [
      'seedComponentOnInit',
      'seedComponentSelectChange',
    ]);

    TestBed.configureTestingModule({
      declarations: [SeedComponent, MatLabelStubComponent],
      providers: [{ provide: EditorService, useValue: editorServiceSpy }],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(SeedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seedComponentOnInit after initialization', () => {
    expect(editorServiceSpy.seedComponentOnInit).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(editorServiceSpy.seedComponentOnInit).toHaveBeenCalledWith();
  });

  describe('option display', () => {
    const parameters: {
      description: string;
      expectation: string;
      available: EditorSeedAvailableState;
      selected: EditorSeedSelectedState;
      expectedInnerTexts: string[];
    }[] = [
      {
        description: 'values null',
        expectation: 'should not display any options',
        available: { values: null, success: true, loading: false },
        selected: { value: null },
        expectedInnerTexts: [],
      },
      {
        description: 'empty values',
        expectation: 'should not display any options',
        available: { values: [], success: true, loading: false },
        selected: { value: null },
        expectedInnerTexts: [],
      },
      {
        description: 'single values success null',
        expectation: 'should not display any options',
        available: {
          values: [{ name: 'seed 1', path: 'path 1' }],
          success: null,
          loading: false,
        },
        selected: { value: 'path 1' },
        expectedInnerTexts: [],
      },
      {
        description: 'single values success true selected value null',
        expectation: 'should display single option that is not selected',
        available: {
          values: [{ name: 'seed 1', path: 'path 1' }],
          success: true,
          loading: false,
        },
        selected: { value: null },
        expectedInnerTexts: [' seed 1 '],
      },
      {
        description: 'single values success true selected value different',
        expectation: 'should display single option that is not selected',
        available: {
          values: [{ name: 'seed 1', path: 'path 1' }],
          success: true,
          loading: false,
        },
        selected: { value: 'path 2' },
        expectedInnerTexts: [' seed 1 '],
      },
      {
        description: 'single values success true selected value same',
        expectation: 'should display single option that is selected',
        available: {
          values: [{ name: 'seed 1', path: 'path 1' }],
          success: true,
          loading: false,
        },
        selected: { value: 'path 1' },
        expectedInnerTexts: [' seed 1 '],
      },
      {
        description: 'multiple values success true selected value same',
        expectation: 'should display single option that is selected',
        available: {
          values: [
            { name: 'seed 1', path: 'path 1' },
            { name: 'seed 2', path: 'path 2' },
          ],
          success: true,
          loading: false,
        },
        selected: { value: 'path 1' },
        expectedInnerTexts: [' seed 1 ', ' seed 2 '],
      },
    ];

    parameters.forEach(
      ({
        description,
        expectation,
        available,
        selected,
        expectedInnerTexts,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            component.available$ = of(available);
            component.selected$ = of(selected);

            fixture.detectChanges();

            const options: HTMLOptionElement[] = fixture.nativeElement.querySelectorAll(
              'option'
            );
            expect(options.length).toEqual(expectedInnerTexts.length);
            options.forEach((option, index) =>
              expect(option.innerText).toEqual(expectedInnerTexts[index])
            );
          });
        });
      }
    );
  });

  it('should pass the seed value to the seed service when select is changed', () => {
    expect(editorServiceSpy.seedComponentSelectChange).toHaveBeenCalledTimes(0);
    component.available$ = of({
      values: [{ name: 'seed 1', path: 'path 1' }],
      success: true,
      loading: false,
    });
    component.selected$ = of({ value: 'path 1' });

    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.nativeElement.querySelector(
      'select'
    );
    expect(select).toBeTruthy();
    const option: HTMLOptionElement = fixture.nativeElement.querySelector(
      'option'
    );
    expect(option).toBeTruthy();
    option.selected = true;
    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(editorServiceSpy.seedComponentSelectChange).toHaveBeenCalledTimes(1);
    expect(editorServiceSpy.seedComponentSelectChange).toHaveBeenCalledWith(
      'path 1'
    );
  });
});
