import { Component, Input } from '@angular/core';

import { LimitedSpecInfo } from '../../../services/package/types';

const SELECTOR = 'app-spec-information';

@Component({
  selector: SELECTOR,
  templateUrl: './spec-information.component.html',
  styleUrls: ['./spec-information.component.css'],
})
export class SpecInformationComponent {
  @Input() spec: LimitedSpecInfo | null = null;
  selector = SELECTOR;
}
