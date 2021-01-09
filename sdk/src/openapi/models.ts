import { components } from './editor';

export type SeedName = components['schemas']['SeedName'];
export type SeedPath = components['schemas']['SeedPath'];
export type Seed = components['schemas']['Seed'];
export type SeedValue = components['schemas']['SeedValue'];

export type SpecValue = components['schemas']['SpecValue'];
export type ValidationResponseResult = components['schemas']['ValidationResponseResult'];
export type ValidationResponseProperty = components['schemas']['ValidationResponseProperty'];
export type ValidationResponseModel = components['schemas']['ValidationResponseModel'];
export type ValidationResponse = components['schemas']['ValidationResponse'];

export type ArtifactResponsePropertiesBase = components['schemas']['ArtifactResponsePropertiesBase'];
export type ArtifactResponsePropertiesSimple = components['schemas']['ArtifactResponsePropertiesSimple'];
export type ArtifactResponsePropertiesJson = components['schemas']['ArtifactResponsePropertiesJson'];
export type ArtifactResponsePropertiesRelationshipBase = components['schemas']['ArtifactResponsePropertiesRelationshipBase'];
// Disabling because can't do anything about how long it is defined elsewhere
// eslint-disable-next-line max-len
export type ArtifactResponsePropertiesRelationshipNotManyToMany = components['schemas']['ArtifactResponsePropertiesRelationshipNotManyToMany'];
export type ArtifactResponsePropertiesRelationshipOneToMany = components['schemas']['ArtifactResponsePropertiesRelationshipOneToMany'];
export type ArtifactResponsePropertiesRelationshipXToOne = components['schemas']['ArtifactResponsePropertiesRelationshipXToOne'];
export type ArtifactResponsePropertiesRelationshipManyToOne = components['schemas']['ArtifactResponsePropertiesRelationshipManyToOne'];
export type ArtifactResponsePropertiesRelationshipOneToOne = components['schemas']['ArtifactResponsePropertiesRelationshipOneToOne'];
export type ArtifactResponsePropertiesRelationshipManyToMany = components['schemas']['ArtifactResponsePropertiesRelationshipManyToMany'];
export type ArtifactResponsePropertiesRelationship = components['schemas']['ArtifactResponsePropertiesRelationship'];
export type ArtifactResponsePropertiesBackref = components['schemas']['ArtifactResponsePropertiesBackref'];
export type ArtifactResponseProperty = components['schemas']['ArtifactResponseProperty'];
export type ArtifactResponseProperties = components['schemas']['ArtifactResponseProperties'];
export type ArtifactResponseModelCompositeIndex = components['schemas']['ArtifactResponseModelCompositeIndex'];
export type ArtifactResponseModelCompositeUnique = components['schemas']['ArtifactResponseModelCompositeUnique'];
export type ArtifactResponseModelArtifacts = components['schemas']['ArtifactResponseModelArtifacts'];
export type ArtifactResponseModel = components['schemas']['ArtifactResponseModel'];
export type ArtifactResponseModels = components['schemas']['ArtifactResponse'];
export type ArtifactResponse = components['schemas']['ArtifactResponse'];
