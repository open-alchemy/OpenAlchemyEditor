import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Router, Event } from '@angular/router';

import { SeedsModel, SeedModel } from './seed.model';
import {
  isNavigationEnd,
  isExample,
  getSeedNameFromEvent,
  getSeedFromSeeds,
} from './helpers/seed';

const localStorageSeedKey = 'seed';

@Injectable({
  providedIn: 'root',
})
export class SeedService {
  private mSeeds$ = new BehaviorSubject<SeedsModel>(null);

  private mSeed$ = new BehaviorSubject<string>(null);
  private mError$ = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.listenForExampleRoutes(this.router.events);
  }

  seeds$(): Observable<SeedsModel> {
    return this.mSeeds$.pipe(filter((seeds) => seeds !== null));
  }

  seed$(): Observable<string> {
    return this.mSeed$.pipe(filter((seed) => seed !== null));
  }

  loadSeed(): void {
    const seed = localStorage.getItem(localStorageSeedKey);
    if (seed !== null) {
      this.mSeed$.next(seed);
      return;
    }

    this.httpClient
      .get('https://editor.api.openalchemy.io/v1/seed', {
        responseType: 'text',
      })
      .subscribe(
        (newSeed) => this.mSeed$.next(newSeed),
        (error) => {
          this.mError$.next(error);
        }
      );
  }

  selectSeed(seedName: string): void {
    this.router.navigate(['example', seedName]);
  }

  loadSelectedSeed(selectedSeed: SeedModel): void {
    this.httpClient
      .get(
        `https://editor.api.openalchemy.io/v1/seeds/${encodeURIComponent(
          selectedSeed.path
        )}`,
        {
          responseType: 'text',
        }
      )
      .subscribe(
        (newSeed) => this.mSeed$.next(newSeed),
        (error) => {
          this.mError$.next(error);
        }
      );
  }

  loadSeeds(): void {
    this.httpClient
      .get<SeedsModel>('https://editor.api.openalchemy.io/v1/seeds')
      .subscribe(
        (newSeeds) => this.mSeeds$.next(newSeeds),
        (error) => {
          this.mError$.next(error);
        }
      );
  }

  error$(): Observable<any> {
    return this.mError$.pipe(filter((error) => error !== null));
  }

  saveSeed(seed: string): void {
    localStorage.setItem(localStorageSeedKey, seed);
  }

  listenForExampleRoutes(events$: Observable<Event>): void {
    const exampleNavigationEndEvents$ = events$.pipe(
      filter(isNavigationEnd),
      filter(isExample),
      map(getSeedNameFromEvent)
    );
    combineLatest([exampleNavigationEndEvents$, this.seeds$()])
      .pipe(map(([seedName, seeds]) => getSeedFromSeeds(seedName, seeds)))
      .subscribe({
        next: (seed) => this.loadSelectedSeed(seed),
        error: () => this.router.navigate(['error']),
      });
  }
}
