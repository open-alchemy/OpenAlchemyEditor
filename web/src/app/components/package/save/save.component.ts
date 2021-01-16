import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { PackageSpecState } from '../../../services/package/package.reducer';
import { SpecValue } from '../../../services/package/types';

const SELECTOR = 'app-save';

@Component({
  selector: SELECTOR,
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
})
export class SaveComponent {
  @Input() spec: PackageSpecState | null = null;
  selector = SELECTOR;
  versionHint =
    'please define the version as described here: <a href="https://swagger.io/specification/#info-object">Open API Info Object</a>';
  specHint = 'please resolve the schema problems below';

  @ViewChild('name') name: ElementRef<HTMLInputElement>;

  onSaveClick(value: SpecValue): void {
    console.log({ value, name: this.name.nativeElement.value });
  }
}
