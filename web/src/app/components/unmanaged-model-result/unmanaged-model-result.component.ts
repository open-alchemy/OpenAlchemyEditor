import { Component, Input } from '@angular/core';

import { ValidationResponseModel } from '../../services/editor/types';

@Component({
  selector: 'app-unmanaged-model-result',
  templateUrl: './unmanaged-model-result.component.html',
  styleUrls: ['./unmanaged-model-result.component.css'],
})
export class UnmanagedModelResultComponent {
  @Input() name: string;
  @Input() model: ValidationResponseModel;
}
