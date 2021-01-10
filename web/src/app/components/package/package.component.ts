import { Component } from '@angular/core';

import { PackageService } from '../../services/package/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent {
  spec$ = this.packageService.spec$;

  constructor(private packageService: PackageService) {}
}
