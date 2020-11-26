import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SeedService } from './seed.service';

@Injectable({
  providedIn: 'root',
})
export class SpecService {
  private mSpec$ = new BehaviorSubject<string>(null);

  constructor(private seedService: SeedService) {
    this.seedService.seed$().subscribe(this.mSpec$);
  }

  spec$(): Observable<string> {
    return this.mSpec$.pipe(filter((spec) => spec !== null));
  }

  updateSpec(spec: string): void {
    this.seedService.saveSeed(spec);
    this.mSpec$.next(spec);
  }
}
