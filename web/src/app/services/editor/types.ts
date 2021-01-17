import {
  Seed,
  SeedPath,
  SeedName,
  SeedValue,
  SpecValue,
  ValidationResponseResult,
  ValidationResponseProperty,
  ValidationResponseModel,
  ValidationResponseModels,
  ValidationResponse,
  ArtifactResponseModelIndex,
  ArtifactResponseModelCompositeIndex,
  ArtifactResponseModelUnique,
  ArtifactResponseModelCompositeUnique,
  ArtifactResponsePropertyBackref,
  ArtifactResponsePropertyRelationshipNotManyToMany,
  ArtifactResponsePropertyRelationshipManyToMany,
  ArtifactResponsePropertyRelationshipBase,
  ArtifactResponsePropertyRelationship,
  ArtifactResponsePropertyJson,
  ArtifactResponsePropertySimple,
  ArtifactResponsePropertyAll,
  ArtifactResponseProperty,
  ArtifactResponseProperties,
  ArtifactResponseModelArtifacts,
  ArtifactResponseModel,
  ArtifactResponseModels,
  ArtifactResponse,
} from '@open-alchemy/editor-sdk';
import { SpecName, Spec } from '@open-alchemy/package-sdk';

export interface ValidationResponseProperties {
  [key: string]: ValidationResponseProperty;
}

export {
  Seed,
  SeedPath,
  SeedName,
  SeedValue,
  SpecValue,
  ValidationResponseResult,
  ArtifactResponsePropertyBackref,
  ArtifactResponsePropertyJson,
  ArtifactResponsePropertySimple,
  ArtifactResponsePropertyAll,
  ArtifactResponsePropertyRelationshipNotManyToMany,
  ArtifactResponsePropertyRelationshipManyToMany,
  ArtifactResponsePropertyRelationshipBase,
  ArtifactResponsePropertyRelationship,
  ValidationResponseProperty,
  ValidationResponseModel,
  ValidationResponseModels,
  ValidationResponse,
  ArtifactResponseModelIndex,
  ArtifactResponseModelCompositeIndex,
  ArtifactResponseModelUnique,
  ArtifactResponseModelCompositeUnique,
  ArtifactResponseProperty,
  ArtifactResponseProperties,
  ArtifactResponseModelArtifacts,
  ArtifactResponseModel,
  ArtifactResponseModels,
  ArtifactResponse,
  SpecName,
  Spec,
};

export interface Error {
  message: string;
}

export interface ResultPropertyModel
  extends ValidationResponseProperty,
    ArtifactResponseProperty {}

export interface ResultPropertiesModel {
  [key: string]: ResultPropertyModel;
}

export interface ResultModelModel
  extends ValidationResponseModel,
    ArtifactResponseModel {
  properties?: ResultPropertiesModel;
}

export interface ResultModelsModel {
  [key: string]: ResultModelModel;
}

export interface ResultModel extends ValidationResponse, ArtifactResponse {
  models?: ResultModelsModel;
}
