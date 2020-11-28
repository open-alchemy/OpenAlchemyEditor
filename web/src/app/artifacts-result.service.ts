import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ArtifactsModel } from './artifacts.model';
import { SpecService } from './spec.service';

import { postSpec } from './helpers/post-spec';

interface Options {
  delayTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArtifactsResultService {
  private mArtifacts$ = new BehaviorSubject<ArtifactsModel>(null);
  private mError$ = new BehaviorSubject<any>(null);
  public options: Options = {
    delayTime: 1000,
  };

  constructor(
    private specService: SpecService,
    private httpClient: HttpClient
  ) {
    postSpec(
      this.specService.spec$(),
      'https://editor.api.openalchemy.io/v1/artifact/calculate',
      this.httpClient,
      this.options,
      this.mError$
    ).subscribe(this.mArtifacts$);
  }

  artifacts$(): Observable<ArtifactsModel> {
    return this.mArtifacts$.pipe(filter((artifacts) => artifacts !== null));
  }

  error$(): Observable<any> {
    return this.mError$.pipe(filter((error) => error !== null));
  }
}
