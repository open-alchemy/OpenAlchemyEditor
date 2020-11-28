import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { AceComponent } from 'ngx-ace-wrapper';

import { SeedComponent } from './seed.component';
import { SeedService } from 'src/app/seed.service';

@Component({ selector: 'mat-label', template: '' })
class MatLabelStubComponent {}

describe('SeedComponent', () => {
  let seedServiceSpy: jasmine.SpyObj<SeedService>;
  let component: SeedComponent;
  let fixture: ComponentFixture<SeedComponent>;

  beforeEach(() => {
    seedServiceSpy = jasmine.createSpyObj('SeedService', [
      'seeds$',
      'loadSeeds',
      'selectSeed',
    ]);

    TestBed.configureTestingModule({
      declarations: [SeedComponent, AceComponent, MatLabelStubComponent],
      providers: [{ provide: SeedService, useValue: seedServiceSpy }],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(SeedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadSeeds after initialization', () => {
    expect(seedServiceSpy.loadSeeds).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(seedServiceSpy.loadSeeds).toHaveBeenCalledWith();
  });

  describe('option display', () => {
    const parameters = [
      {
        description: 'empty seed',
        expectation: 'should not display any options',
        seeds: [],
        expectedInnerTexts: [],
      },
      {
        description: 'single seed',
        expectation: 'should not display any options',
        seeds: [{ name: 'seed 1', path: 'path 1' }],
        expectedInnerTexts: [' seed 1 '],
      },
      {
        description: 'multiple seed',
        expectation: 'should not display any options',
        seeds: [
          { name: 'seed 1', path: 'path 1' },
          { name: 'seed 2', path: 'path 2' },
        ],
        expectedInnerTexts: [' seed 1 ', ' seed 2 '],
      },
    ];

    parameters.forEach(
      ({ description, expectation, seeds, expectedInnerTexts }) => {
        describe(description, () => {
          it(expectation, () => {
            seedServiceSpy.seeds$.and.returnValue(of(seeds));

            fixture.detectChanges();

            const options: HTMLOptionElement[] = fixture.nativeElement.querySelectorAll(
              'option'
            );
            expect(options.length).toEqual(expectedInnerTexts.length);
            options.forEach((option, index) =>
              expect(option.innerText).toEqual(expectedInnerTexts[index])
            );
            options.forEach((option) => expect(option.selected).toBeFalse());
          });
        });
      }
    );
  });

  it('should pass the seed value to the seed service when select is changed', () => {
    expect(seedServiceSpy.selectSeed).toHaveBeenCalledTimes(0);
    seedServiceSpy.seeds$.and.returnValue(
      of([{ name: ' seed 1 ', path: 'path 1' }])
    );

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

    expect(seedServiceSpy.selectSeed).toHaveBeenCalledTimes(1);
    expect(seedServiceSpy.selectSeed).toHaveBeenCalledWith(' seed 1 ');
  });
});
