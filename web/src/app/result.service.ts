import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { ValidatorResultService } from './validator-result.service';
import { ArtifactsResultService } from './artifacts-result.service';

import { combineResult } from './helpers/combine-results';

import { ResultModel } from './result.model';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private mResult$ = new BehaviorSubject<ResultModel>(null);

  constructor(
    private validatorResultService: ValidatorResultService,
    private artifactsResultService: ArtifactsResultService
  ) {
    combineLatest([
      this.validatorResultService.result$(),
      this.artifactsResultService.artifacts$(),
    ])
      .pipe(
        map(([validator, artifacts]) => combineResult(validator, artifacts))
      )
      .subscribe(this.mResult$);
  }

  result$(): Observable<ResultModel> {
    return this.mResult$.pipe(filter((result) => result !== null));
  }
}
