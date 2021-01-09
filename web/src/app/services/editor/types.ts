import {
  Seed,
  SeedPath,
  SeedName,
  SeedValue,
  SpecValue,
  ValidationResponseProperty,
  ValidationResponseModel,
  ValidationResponse,
  ArtifactResponseProperty,
  ArtifactResponseModel,
  ArtifactResponse,
} from '@open-alchemy/editor-sdk';

export {
  Seed,
  SeedPath,
  SeedName,
  SeedValue,
  SpecValue,
  ValidationResponseProperty,
  ValidationResponseModel,
  ValidationResponse,
  ArtifactResponseProperty,
  ArtifactResponseModel,
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
