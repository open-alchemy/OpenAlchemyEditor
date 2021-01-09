import { Component, Input } from '@angular/core';

import { modelCompletelyValid } from 'src/app/helpers/model-completely-valid';
import { ValidationResponseModel } from '../../../services/editor/types';

@Component({
  selector: 'app-model-result-badge',
  templateUrl: './model-result-badge.component.html',
  styleUrls: ['./model-result-badge.component.css'],
})
export class ModelResultBadgeComponent {
  @Input() unmanaged = false;
  @Input() model: ValidationResponseModel;

  modelCompletelyValid(): boolean {
    return modelCompletelyValid(this.model);
  }
}
