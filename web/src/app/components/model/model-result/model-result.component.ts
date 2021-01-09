import { Component, Input } from '@angular/core';

import { ResultModelModel } from '../../../services/editor/types';

@Component({
  selector: 'app-model-result',
  templateUrl: './model-result.component.html',
  styleUrls: ['./model-result.component.css'],
})
export class ModelResultComponent {
  @Input() name: string;
  @Input() model: ResultModelModel;
}
