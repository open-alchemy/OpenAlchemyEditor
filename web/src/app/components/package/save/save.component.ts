import { Component, Input } from '@angular/core';

import { LimitedSpecInfo } from '../../../services/package/types';

const SELECTOR = 'app-save';

@Component({
  selector: SELECTOR,
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
})
export class SaveComponent {
  @Input() spec: LimitedSpecInfo | null = null;
  selector = SELECTOR;
}
