import {
  ValidatorPropertyModel,
  ValidatorModelModel,
  ValidatorModel,
} from './validator.model';
import {
  ArtifactsPropertyModel,
  ArtifactsModelModel,
  ArtifactsModel,
} from './artifacts.model';

export interface ResultPropertyModel
  extends ValidatorPropertyModel,
    ArtifactsPropertyModel {}

export interface ResultPropertiesModel {
  [key: string]: ResultPropertyModel;
}

export interface ResultModelModel
  extends ValidatorModelModel,
    ArtifactsModelModel {
  properties?: ResultPropertiesModel;
}

export interface ResultModelsModel {
  [key: string]: ResultModelModel;
}

export interface ResultModel extends ValidatorModel, ArtifactsModel {
  models?: ResultModelsModel;
}
