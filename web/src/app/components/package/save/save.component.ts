import { Component, Input } from '@angular/core';

import { PackageSpecState } from '../../../services/package/package.reducer';

const SELECTOR = 'app-save';

@Component({
  selector: SELECTOR,
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
})
export class SaveComponent {
  @Input() spec: PackageSpecState | null = null;
  selector = SELECTOR;
}
