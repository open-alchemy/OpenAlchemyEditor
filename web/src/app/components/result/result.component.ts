import { Component, Input } from '@angular/core';

import { ValidationResponseResult } from '../../services/editor/types';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  @Input() model: ValidationResponseResult;
  @Input() symbol = 'error';
}
