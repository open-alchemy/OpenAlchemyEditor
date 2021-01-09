import { components } from './editor';

export type SeedName = components['schemas']['SeedName'];
export type SeedPath = components['schemas']['SeedPath'];
export type Seed = components['schemas']['Seed'];
export type SeedValue = components['schemas']['SeedValue'];

export type SpecValue = components['schemas']['SpecValue'];
export type ValidationResponseResult = components['schemas']['ValidationResponseResult'];
export type ValidationResponseProperty = components['schemas']['ValidationResponseProperty'];
export type ValidationResponseModel = components['schemas']['ValidationResponseModel'];
export type ValidationResponseModels = components['schemas']['ValidationResponseModels'];
export type ValidationResponse = components['schemas']['ValidationResponse'];

export type ArtifactResponsePropertyBase = components['schemas']['ArtifactResponsePropertyBase'];
export type ArtifactResponsePropertySimple = components['schemas']['ArtifactResponsePropertySimple'];
export type ArtifactResponsePropertyJson = components['schemas']['ArtifactResponsePropertyJson'];
export type ArtifactResponsePropertyAll = components['schemas']['ArtifactResponsePropertyAll'];
export type ArtifactResponsePropertyRelationshipBase = components['schemas']['ArtifactResponsePropertyRelationshipBase'];
// Disabling because can't do anything about how long it is defined elsewhere
// eslint-disable-next-line max-len
export type ArtifactResponsePropertyRelationshipNotManyToMany = components['schemas']['ArtifactResponsePropertyRelationshipNotManyToMany'];
export type ArtifactResponsePropertyRelationshipOneToMany = components['schemas']['ArtifactResponsePropertyRelationshipOneToMany'];
export type ArtifactResponsePropertyRelationshipXToOne = components['schemas']['ArtifactResponsePropertyRelationshipXToOne'];
export type ArtifactResponsePropertyRelationshipManyToOne = components['schemas']['ArtifactResponsePropertyRelationshipManyToOne'];
export type ArtifactResponsePropertyRelationshipOneToOne = components['schemas']['ArtifactResponsePropertyRelationshipOneToOne'];
export type ArtifactResponsePropertyRelationshipManyToMany = components['schemas']['ArtifactResponsePropertyRelationshipManyToMany'];
export type ArtifactResponsePropertyRelationship = components['schemas']['ArtifactResponsePropertyRelationship'];
export type ArtifactResponsePropertyBackref = components['schemas']['ArtifactResponsePropertyBackref'];
export type ArtifactResponseProperty = components['schemas']['ArtifactResponseProperty'];
export type ArtifactResponseProperties = components['schemas']['ArtifactResponseProperties'];
export type ArtifactResponseModelIndex = components['schemas']['ArtifactResponseModelIndex'];
export type ArtifactResponseModelCompositeIndex = components['schemas']['ArtifactResponseModelCompositeIndex'];
export type ArtifactResponseModelUnique = components['schemas']['ArtifactResponseModelUnique'];
export type ArtifactResponseModelCompositeUnique = components['schemas']['ArtifactResponseModelCompositeUnique'];
export type ArtifactResponseModelArtifacts = components['schemas']['ArtifactResponseModelArtifacts'];
export type ArtifactResponseModel = components['schemas']['ArtifactResponseModel'];
export type ArtifactResponseModels = components['schemas']['ArtifactResponse'];
export type ArtifactResponse = components['schemas']['ArtifactResponse'];
