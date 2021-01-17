import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

import { PackageService } from '../../../services/package/package.service';
import {
  PackageSpecState,
  PackageCredentialsState,
} from '../../../services/package/package.reducer';
import { PipComponent } from './pip.component';

const SPEC: PackageSpecState = {
  info: {
    title: 'title 1',
    actualName: 'name 1',
    id: 'spec-id-1',
    version: { valid: true, value: 'version 1' },
  },
  beingEdited: false,
  valid: true,
  value: 'spec 1',
};
const CREDENTIALS: PackageCredentialsState = {
  value: { public_key: 'public key 1', secret_key: 'secret key 1' },
  loading: false,
  success: true,
};

describe('PipComponent', () => {
  let packageServiceSpy: jasmine.SpyObj<PackageService>;
  let component: PipComponent;
  let fixture: ComponentFixture<PipComponent>;

  beforeEach(() => {
    packageServiceSpy = jasmine.createSpyObj('PackageService', [
      'credentials$',
    ]);

    TestBed.configureTestingModule({
      declarations: [PipComponent],
      providers: [
        {
          provide: PackageService,
          useValue: packageServiceSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(PipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('install copy', () => {
    ([
      {
        description: 'spec null credentials defined',
        expectation: 'should not show the install and copy',
        spec: null,
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info missing credentials defined',
        expectation: 'should not show the install and copy',
        spec: {},
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info null credentials defined',
        expectation: 'should not show the install and copy',
        spec: { info: null },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info actualName missing credentials defined',
        expectation: 'should not show the install and copy',
        spec: { info: { id: 'id 1', version: { value: 'version 1' } } },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info actualName null credentials defined',
        expectation: 'should not show the install and copy',
        spec: {
          info: {
            actualName: null,
            id: 'id 1',
            version: { value: 'version 1' },
          },
        },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info id missing credentials defined',
        expectation: 'should not show the install and copy',
        spec: {
          info: { actualName: 'name 1', version: { value: 'version 1' } },
        },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info id null credentials defined',
        expectation: 'should not show the install and copy',
        spec: {
          info: {
            actualName: 'name 1',
            id: null,
            version: { value: 'version 1' },
          },
        },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info version missing null credentials defined',
        expectation: 'should not show the install and copy',
        spec: { info: { actualName: 'name 1', id: 'id 1' } },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec info version null missing null credentials defined',
        expectation: 'should not show the install and copy',
        spec: { info: { actualName: 'name 1', id: 'id 1', version: null } },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description:
          'spec info version value missing missing null credentials defined',
        expectation: 'should not show the install and copy',
        spec: { info: { actualName: 'name 1', id: 'id 1', version: {} } },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description:
          'spec info version value null missing null credentials defined',
        expectation: 'should not show the install and copy',
        spec: {
          info: { actualName: 'name 1', id: 'id 1', version: { value: null } },
        },
        credentials: CREDENTIALS,
        expectedDisplayed: false,
      },
      {
        description: 'spec defined and credentials null',
        expectation: 'should not show the install and copy',
        spec: SPEC,
        credentials: null,
        expectedDisplayed: false,
      },
      {
        description: 'spec defined and credentials value missing',
        expectation: 'should not show the install and copy',
        spec: SPEC,
        credentials: {},
        expectedDisplayed: false,
      },
      {
        description: 'spec defined and credentials value null',
        expectation: 'should not show the install and copy',
        spec: SPEC,
        credentials: { value: null },
        expectedDisplayed: false,
      },
      {
        description: 'spec and credentials defined',
        expectation: 'should not show the install and copy',
        spec: SPEC,
        credentials: CREDENTIALS,
        expectedDisplayed: true,
      },
    ] as {
      description: string;
      expectation: string;
      spec: PackageSpecState;
      credentials: PackageCredentialsState;
      expectedDisplayed: boolean;
    }[]).forEach(
      ({ description, expectation, spec, credentials, expectedDisplayed }) => {
        describe(description, () => {
          it(expectation, () => {
            // GIVEn credentials and spec are defined
            component.credentials$ = of(credentials);
            component.spec = spec;

            // WHEN changes are detected
            fixture.detectChanges();

            // THEN the install and copy are displayed or not as expected
            const install: HTMLParagraphElement = fixture.nativeElement.querySelector(
              `[test-id="${component.selector}.install"]`
            );
            const copy: HTMLButtonElement = fixture.nativeElement.querySelector(
              `[test-id="${component.selector}.copy"]`
            );
            const importParagraph: HTMLParagraphElement = fixture.nativeElement.querySelector(
              `[test-id="${component.selector}.import"]`
            );
            if (expectedDisplayed) {
              expect(install).toBeTruthy();
              expect(install.innerText).toContain('pip install');
              expect(install.innerText).toContain(SPEC.info.actualName);
              expect(install.innerText).toContain(SPEC.info.version.value);
              expect(install.innerText).toContain(CREDENTIALS.value.public_key);
              expect(install.innerText).toContain(CREDENTIALS.value.secret_key);
              expect(copy).toBeTruthy();
              expect(importParagraph).toBeTruthy();
              expect(importParagraph.innerText).toContain('from');
              expect(importParagraph.innerText).toContain(
                SPEC.info.id.replace(/-/g, '_')
              );
              expect(importParagraph.innerText).toContain('import models');
            } else {
              expect(install).toBeFalsy();
              expect(copy).toBeFalsy();
            }
          });
        });
      }
    );
  });
});
