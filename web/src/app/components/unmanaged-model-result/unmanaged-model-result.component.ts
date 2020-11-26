import { Component, OnInit, Input } from '@angular/core';

import { ValidatorModelModel } from 'src/app/validator.model';

@Component({
  selector: 'app-unmanaged-model-result',
  templateUrl: './unmanaged-model-result.component.html',
  styleUrls: ['./unmanaged-model-result.component.css'],
})
export class UnmanagedModelResultComponent implements OnInit {
  @Input() name: string;
  @Input() model: ValidatorModelModel;

  constructor() {}

  ngOnInit(): void {}
}
