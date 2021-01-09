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
  ArtifactResponseProperty,
  ArtifactResponseProperties,
  ArtifactResponseModel,
  ArtifactResponseModels,
  ArtifactResponse,
} from '@open-alchemy/editor-sdk';

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
  ArtifactResponseModel,
  ArtifactResponseModels,
  ArtifactResponse,
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
