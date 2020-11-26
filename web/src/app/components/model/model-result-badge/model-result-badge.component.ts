import { Component, OnInit, Input } from '@angular/core';

import { modelCompletelyValid } from 'src/app/helpers/model-completely-valid';
import { ValidatorModelModel } from 'src/app/validator.model';

@Component({
  selector: 'app-model-result-badge',
  templateUrl: './model-result-badge.component.html',
  styleUrls: ['./model-result-badge.component.css'],
})
export class ModelResultBadgeComponent implements OnInit {
  @Input() unmanaged = false;
  @Input() model: ValidatorModelModel;

  constructor() {}

  ngOnInit(): void {}

  modelCompletelyValid(): boolean {
    return modelCompletelyValid(this.model);
  }
}
