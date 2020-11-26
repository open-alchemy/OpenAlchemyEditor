import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ValidatorResultService } from 'src/app/validator-result.service';
import { ValidatorModel } from 'src/app/validator.model';

@Component({
  selector: 'app-unmanaged-models-result',
  templateUrl: './unmanaged-models-result.component.html',
  styleUrls: ['./unmanaged-models-result.component.css'],
})
export class UnmanagedModelsResultComponent implements OnInit {
  result$: Observable<ValidatorModel>;

  constructor(private validatorResultService: ValidatorResultService) {}

  ngOnInit(): void {
    this.result$ = this.validatorResultService.unmanagedResult$();
  }

  hasModels(result: ValidatorModel): boolean {
    if (result.models === undefined || result.models === null) {
      return false;
    }
    return Object.keys(result.models).length !== 0;
  }
}
