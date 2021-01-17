import { Component, Input } from '@angular/core';

import { PackageSpecState } from '../../../services/package/package.reducer';
import {
  Credentials,
  SpecName,
  SpecVersion,
} from '../../../services/package/types';
import { PackageService } from '../../../services/package/package.service';

const SELECTOR = 'app-pip';

@Component({
  selector: SELECTOR,
  templateUrl: './pip.component.html',
  styleUrls: ['./pip.component.css'],
})
export class PipComponent {
  @Input() spec: PackageSpecState | null = null;
  credentials$ = this.packageService.credentials$;
  selector = SELECTOR;

  constructor(private packageService: PackageService) {}

  calculatePipInstall(
    credentials: Credentials,
    specName: SpecName,
    version: SpecVersion
  ): string {
    return (
      `pip install --index-url https://${credentials.public_key}:${credentials.secret_key}@index.package.openalchemy.io ` +
      `--extra-index-url https://pypi.org/simple "${specName}==${version}"`
    );
  }
}
