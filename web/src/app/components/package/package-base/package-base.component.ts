import { Component } from '@angular/core';

import { PackageService } from '../../../services/package/package.service';

@Component({
  selector: 'app-package-base',
  templateUrl: './package-base.component.html',
  styleUrls: ['./package-base.component.css'],
})
export class PackageBaseComponent {
  spec$ = this.packageService.spec$;

  constructor(private packageService: PackageService) {}
}
