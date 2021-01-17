# Editor

## User Stories

- As a developer I want to see whether the OpenAlchemy spec is valid so that I
  can correct any mistakes.
- As a developer I want to start with an example that is similar to my use
  case so that it is easy to create a spec for my use case.
- As a developer I want to resume editing a spec after having closed the tab or
  browser from where I left off so that I don't lose my progress.

## State Management

### Current

Loads seed when the editor component renders.
The seed is either loaded from local storage or is the default seed.
When the seed selection changes, the route is changed.
Listens for router events and loads that seed when the route is hit.
Editor updates the spec whenever it changes.
The spec is saved to local storage.

Loads available seeds in the seed component.
Updates the selected seed when the seed selection changes.

Whenever a new spec is seen the artifact service uses it to load the result.
Whenever a new spec is seen the validator retrieves the managed and unmanaged
validation.
The result service combines these together.

Displays the validation results for managed and unmanaged specs.

### Proposed

#### Editor Component

Enables the user to edit the value of a spec.

Events:

- `editorComponentOnInit`: The editor component has started initialization.
- `editorComponentSeedLoaded`: The seed has been loaded into the editor,
  includes the value of the seed.
- `editorComponentValueChange`: The spec in the editor has been changed by the
  user, includes the value it has changed to.

Input:

- `seed`: The seed to load into the editor.

#### Seed Component

Enables the user to pick an example to seed the editor with.

Events:

- `seedComponentOnInit`: The seed component has started initialization.
- `seedComponentSelectChange`: The selected seed has changed including the seed
  path that it was changed to.

Input:

- `seeds`: All available seeds.
- `selectedSeed`: The path of the seed that is currently selected.

#### Results Component

Displays the results of the validation and the produced artifacts.

Input:

- `managed`: The result of validating the managed component of the spec
- `unManaged`: The result of validating the un managed component of the spec
- `artifacts`: Key information extracted from the spec

#### Router

Events (more information <https://angular.io/api/router/RouterEvent>):

- `routerNavigationStartExamplesId`: The route has changed to a particular seed,
  detected based on `NavigationStart`
  <https://angular.io/api/router/NavigationStart> to urls of the form
  `examples/:id`.

#### Reacting to Events

##### `editorComponentOnInit`

Output:

- `localStorageSeedLoaded`: The seed has been loaded from local storage,
  includes the value of the seed
- `localStorageSeedNotFound`: There is nothing available in local storage.

Attempt to load the seed:

1. Look at the current route, if it is of the form `examples/:id`, return,
   because the navigation to that path will seed the editor.
1. If the `seed` key is available in `localStorage`, return the
   `localStorageSeedLoaded` event.
1. Return the `localStorageSeedNotFound` event.

##### `localStorageSeedLoaded`

Update the seed:

1. Set the `state.seed.current.value` state to the seed in the event.

##### `localStorageSeedNotFound`

Output:

- `editorApiSeedGetSuccess`: The default seed has been loaded, includes the
  value of the seed
- `editorApiSeedGetError`: The default seed could not be loaded, includes the
  reason

Load the default seed:

1. If the call succeeds, return the `editorApiSeedGetSuccess` event.
1. If the call fails, return the `editorApiSeedGetError` event.

##### `editorApiSeedGetSuccess`

Update the seed:

1. Set the `state.seed.current.value` state to the seed in the event.

##### `editorApiSeedGetError`

Notify the user fo the error:

1. Set the `state.error.message` state to the reason.

##### `editorComponentSeedLoaded` and `editorComponentValueChange`

Output:

- `specSaved`: The spec has been saved.
- `editorComponentSeedLoaded`: The router navigated to the base path.
- `stableSpecValueChange`: The new spec value stabilized for a period of time,
  includes the spec value.

Update the seed:

1. Set the `seed` key in local storage to the value of the event.
1. Return the `specSaved` event.

Update the route:

1. If the event is `editorComponentSeedLoaded`, return.
1. Set the url to `` using <https://angular.io/api/router/Router#navigate>.
1. Return the `routerNavigationBase` event.

Stabilize the spec changes:

1. Delay `editorComponentSeedLoaded` and `stableSpecValueChange` and switch to
   new events if a new event occurs within the delay.
1. Return the `stableSpecValueChange` event.

##### `stableSpecValueChange`

Output:

- `editorApiSpecValidateManagedSuccess`: The managed result loaded, includes
  the result.
- `editorApiSpecValidateManagedError`: The managed result failed to load,
  includes the reason why it failed.
- `editorApiSpecValidateUnManagedSuccess`: The un managed result loaded,
  includes the result.
- `editorApiSpecValidateUnManagedError`: The un managed result failed to load,
  includes the reason why it failed.
- `editorApiArtifactCalculateSuccess`: The artifacts loaded, includes the
  artifacts.
- `editorApiArtifactCalculateError`: The artifacts failed to load, includes the
  reason why it failed.

Load the managed result:

1. Load the managed result.
1. If the call succeeds, return the `editorApiSpecValidateManagedSuccess` event.
1. If the call fails, return the `editorApiSpecValidateManagedError` event.

Load the un managed result:

1. Load the un managed result.
1. If the call succeeds, return the `editorApiSpecValidateUnManagedSuccess` event.
1. If the call fails, return the `editorApiSpecValidateUnManagedError` event.

Load the artifacts:

1. Load the artifacts.
1. If the call succeeds, return the `editorApiArtifactCalculateSuccess` event.
1. If the call fails, return the `editorApiArtifactCalculateError` event.

##### `editorApiSpecValidateManagedSuccess`

Update the managed result:

1. Set the `managedResult` in the state.

##### `editorApiSpecValidateManagedError`

Notify the user fo the error:

1. Set the `state.error.message` state to the reason.

##### `editorApiSpecValidateUnManagedSuccess`

Update the un managed result:

1. Set the `unManagedResult` in the state.

##### `editorApiSpecValidateUnManagedError`

Notify the user fo the error:

1. Set the `state.error.message` state to the reason.

##### `editorApiArtifactCalculateSuccess`

Update the artifacts:

1. Set the `artifacts` value in the state.

##### `editorApiArtifactCalculateError`

Notify the user fo the error:

1. Set the `state.error.message` state to the reason.

##### `seedComponentOnInit`

Output:

- `editorApiLoadSeedsSuccess`: The available seeds loaded, includes the value.
- `editorApiLoadSeedsError`: The available seeds failed to load, includes the
  reason why it failed.

Load the seeds:

1. If the call succeeds, return the `editorApiLoadSeedsSuccess` event.
1. If the call fails, return the `editorApiLoadSeedsError` event.

##### `editorApiLoadSeedsSuccess`

Update the seed:

1. Set the `state.seed.available.values` state to the seeds in the event.

##### `editorApiLoadSeedsError`

update the seed:

1. Set the `state.error.message` state to the reason.

##### `seedComponentSelectChange`

Output:

- `locationGoSelectedSeed`: The router has been navigated to the selected seed.

Change the route:

1. Navigate to `examples/:<path>` using using
   <https://angular.io/api/router/Router#navigate>.
1. Return the `locationGoSelectedSeed` event.

##### `routerNavigationStartExamplesId`

Output:

- `editorApiLoadSeedsSeedSuccess`: The seed loaded, includes the value.
- `editorApiLoadSeedsSeedError`: The seed failed to load, includes the reason
  why it failed.

Update the selected seed:

1. Set the `state.selected` in the state to the value in the event.

Load the requested seed:

1. Load the requested seed.
1. If the call succeeds, return the `editorApiLoadSeedsSeedSuccess` event.
1. If the call fails, return the `editorApiLoadSeedsSeedError` event.

##### `editorApiLoadSeedsSeedSuccess`

Update the seed:

1. Set the `state.seed.current.value` state to the seed in the event.

##### `editorApiLoadSeedsSeedError`

update the seed:

1. Set the `state.error.message` state to the reason.
