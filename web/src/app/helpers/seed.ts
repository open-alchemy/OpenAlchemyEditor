import { NavigationEnd } from '@angular/router';
import { isNavigationEnd } from './login';

import { SeedsModel, SeedModel } from '../seed.model';

export { isNavigationEnd };

export function isExample(event: NavigationEnd) {
  if (!event) {
    return false;
  }
  if (!event.url) {
    return false;
  }
  return event.url.startsWith(`/example/`);
}

export function getSeedNameFromEvent(event: NavigationEnd) {
  if (event && event.url && event.url.split('/').length > 2) {
    return decodeURIComponent(event.url.split('/')[2]);
  }

  throw 'seed name could not be in the url';
}

export function getSeedFromSeeds(
  seedName: string,
  seeds: SeedsModel
): SeedModel {
  if (seeds) {
    for (const seed of seeds) {
      if (seed.name === seedName) {
        return seed;
      }
    }
  }

  throw 'seed is not valid';
}
