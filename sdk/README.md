# OpenAlchemy Editor SDK

An SDK for interacting with the OpenAlchemy editor service.

For API based interactions check here:
<https://editor.api.openalchemy.io/v1/ui/>

## Getting Started

To validate a spec:

```typescript
import { SpecService } from '@open-alchemy/editor-sdk';

const service = new SpecsService();
// Validate the managed portion of a spec
const result = await service.validateManaged({
  value: '<an OpenAlchemy OpenAPI Spec in YAML>',
  language: 'YAML',
});
// Validate the un managed portion of a spec
const result = await service.validateManaged({
  value: '<an OpenAlchemy OpenAPI Spec in JSON>',
  language: 'JSON',
});
```

To calculate the artifacts of spec:

```typescript
import { ArtifactService } from '@open-alchemy/editor-sdk';

const service = new ArtifactService();
const artifacts = await service.calculate({
  value: '<an OpenAlchemy OpenAPI Spec in YAML>',
  language: 'YAML',
});
```

To retrieve seeds:

```typescript
import { SeedService } from '@open-alchemy/editor-sdk';

const service = new SeedService();
// To retrieve the default seed
const defaultSeed = await service.getDefault();
// To retrieve all available seed
const availableSeeds = await service.list();
// To retrieve a particular seed
const seed = await service.get({ path: availableSeeds[0].path });
```

## CI-CD

The workflow for the CI-CD is defined here:
[../.github/workflows/ci-cd-sdk.yaml](../.github/workflows/ci-cd-sdk.yaml).

## Production Tests

The tests against the sdk package are defined here:
[../test/sdk/](../test/sdk/).

The workflow that periodically executes the tests is defined here:
[../.github/workflows/production-test-sdk.yaml](../.github/workflows/production-test-sdk.yaml).
