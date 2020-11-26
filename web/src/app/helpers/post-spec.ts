import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, of } from 'rxjs';
import { filter, switchMap, catchError } from 'rxjs/operators';

interface Options {
  delayTime: number;
}

export function postSpec<T>(
  spec$: Observable<string>,
  url: string,
  httpClient: HttpClient,
  options: Options,
  error$: BehaviorSubject<any>
): Observable<T> {
  return spec$.pipe(
    switchMap((spec) =>
      timer(options.delayTime).pipe(
        switchMap(() =>
          httpClient.post<T>(url, spec, {
            headers: { 'Content-Type': 'application/yaml' },
          })
        ),
        catchError((error) => {
          error$.next(error);
          return of(null);
        })
      )
    ),
    filter((result) => result !== null)
  );
}
