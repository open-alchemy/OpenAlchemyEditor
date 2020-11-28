import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ValidatorModel } from './validator.model';
import { SpecService } from './spec.service';
import { postSpec } from './helpers/post-spec';

interface Options {
  delayTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class ValidatorResultService {
  private mResult$ = new BehaviorSubject<ValidatorModel>(null);
  private mUnmanagedResult$ = new BehaviorSubject<ValidatorModel>(null);
  private mError$ = new BehaviorSubject<any>(null);
  public options: Options = {
    delayTime: 1000,
  };

  constructor(
    private specService: SpecService,
    private httpClient: HttpClient
  ) {
    this.checkSpec(
      this.specService.spec$(),
      'https://editor.api.openalchemy.io/v1/spec/validate-managed'
    ).subscribe(this.mResult$);
    this.checkSpec(
      this.specService.spec$(),
      'https://editor.api.openalchemy.io/v1/spec/validate-un-managed'
    ).subscribe(this.mUnmanagedResult$);
  }

  result$(): Observable<ValidatorModel> {
    return this.mResult$.pipe(filter((result) => result !== null));
  }

  unmanagedResult$(): Observable<ValidatorModel> {
    return this.mUnmanagedResult$.pipe(filter((result) => result !== null));
  }

  error$(): Observable<any> {
    return this.mError$.pipe(filter((error) => error !== null));
  }

  checkSpec(
    spec$: Observable<string>,
    url: string
  ): Observable<ValidatorModel> {
    return postSpec<ValidatorModel>(
      spec$,
      url,
      this.httpClient,
      this.options,
      this.mError$
    );
  }
}
