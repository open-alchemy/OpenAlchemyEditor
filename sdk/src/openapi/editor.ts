/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/spec/validate-managed': {
    post: operations['library.spec.validate_managed'];
  };
  '/spec/validate-un-managed': {
    post: operations['library.spec.validate_un_managed'];
  };
  '/artifact/calculate': {
    post: operations['library.artifact.calculate'];
  };
  '/seed': {
    get: operations['library.seed.get'];
  };
  '/seeds': {
    get: operations['library.seeds.list_'];
  };
  '/seeds/{seed_path}': {
    get: operations['library.seeds.get'];
  };
}

export interface operations {
  'library.spec.validate_managed': {
    parameters: {
      header: {
        'X-LANGUAGE': components['parameters']['Language'];
      };
    };
    requestBody: {
      'text/plain': components['schemas']['SpecValue'];
    };
    responses: {
      /**
       * The validation result
       */
      '200': {
        'application/json': components['schemas']['ValidationResponse'];
      };
    };
  };
  'library.spec.validate_un_managed': {
    parameters: {
      header: {
        'X-LANGUAGE': components['parameters']['Language'];
      };
    };
    requestBody: {
      'text/plain': components['schemas']['SpecValue'];
    };
    responses: {
      /**
       * The validation result
       */
      '200': {
        'application/json': components['schemas']['ValidationResponse'];
      };
    };
  };
  'library.artifact.calculate': {
    parameters: {
      header: {
        'X-LANGUAGE': components['parameters']['Language'];
      };
    };
    requestBody: {
      'text/plain': components['schemas']['SpecValue'];
    };
    responses: {
      /**
       * The artifacts
       */
      '200': {
        'application/json': components['schemas']['ArtifactResponse'];
      };
      /**
       * The spec is not valid
       */
      '400': {
        'text/plain': string;
      };
    };
  };
  'library.seed.get': {
    responses: {
      /**
       * The default seed
       */
      '200': {
        'text/plain': components['schemas']['SeedValue'];
      };
      /**
       * The default seed was not set
       */
      '500': {
        'text/plain': string;
      };
    };
  };
  'library.seeds.list_': {
    responses: {
      /**
       * All available seeds
       */
      '200': {
        'application/json': components['schemas']['Seed'][];
      };
    };
  };
  'library.seeds.get': {
    parameters: {
      path: {
        /**
         * The id of the seed, must be URL encoded
         */
        seed_path: components['schemas']['SeedPath'];
      };
    };
    responses: {
      /**
       * The seed value
       */
      '200': {
        'text/plain': components['schemas']['SeedValue'];
      };
      /**
       * The seed was not found
       */
      '404': {
        'text/plain': string;
        'application/problem+json': { [key: string]: any };
      };
    };
  };
}

export interface components {
  parameters: {
    /**
     * The language of the spec
     */
    Language: 'JSON' | 'YAML';
  };
  schemas: {
    /**
     * The name of a seed.
     */
    SeedName: string;
    /**
     * The path to a seed.
     */
    SeedPath: string;
    /**
     * Information about a seed
     */
    Seed: {
      name: components['schemas']['SeedName'];
      path: components['schemas']['SeedPath'];
    };
    /**
     * The value of a seed.
     */
    SeedValue: string;
    /**
     * The value of a spec.
     */
    SpecValue: string;
    /**
     * Whether the spec is valid at the global, model or property level
     */
    ValidationResponseResult: {
      /**
       * Whether the spec is valid
       */
      valid: boolean;
      /**
       * If the spec is not valid, the reason that it is not
       */
      reason?: string;
    };
    /**
     * The validation results for a property
     */
    ValidationResponseProperty: {
      result: components['schemas']['ValidationResponseResult'];
    };
    /**
     * The validation results for a model
     */
    ValidationResponseModel: {
      result: components['schemas']['ValidationResponseResult'];
      /**
       * The results for all properties, included if the model is valid at the model level
       */
      properties?: {
        [key: string]: components['schemas']['ValidationResponseProperty'];
      };
    };
    /**
     * The validation results for the spec
     */
    ValidationResponse: {
      result: components['schemas']['ValidationResponseResult'];
      /**
       * The results for all models, included if the spec is valid at the global level
       */
      models?: {
        [key: string]: components['schemas']['ValidationResponseModel'];
      };
    };
    /**
     * The artifacts for a property
     */
    ArtifactResponseProperty: { artifacts?: { [key: string]: any } };
    /**
     * The artifacts for a model
     */
    ArtifactResponseModel: {
      /**
       * The artifacts for a model
       */
      artifacts?: {
        [key: string]: components['schemas']['ArtifactResponseProperty'];
      };
    };
    /**
     * The artifacts for all models
     */
    ArtifactResponseModels: {
      [key: string]: components['schemas']['ArtifactResponseModel'];
    };
    /**
     * The artifacts for the spec
     */
    ArtifactResponse: {
      models?: components['schemas']['ArtifactResponseModels'];
    };
  };
}
