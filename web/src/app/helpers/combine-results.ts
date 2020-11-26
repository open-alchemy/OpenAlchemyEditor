import {
  ValidatorModel,
  ValidatorPropertyModel,
  ValidatorPropertiesModel,
  ValidatorModelModel,
  ValidatorModelsModel,
} from '../validator.model';
import {
  ArtifactsModel,
  ArtifactsPropertyModel,
  ArtifactsPropertiesModel,
  ArtifactsModelModel,
  ArtifactsModelsModel,
} from '../artifacts.model';
import {
  ResultModel,
  ResultPropertyModel,
  ResultPropertiesModel,
  ResultModelModel,
  ResultModelsModel,
} from '../result.model';

export function combinePropertyResult(
  validator: ValidatorPropertyModel,
  artifacts: ArtifactsPropertyModel
): ResultPropertyModel {
  return {
    result: validator ? validator.result : null,
    artifacts: artifacts ? artifacts.artifacts : null,
  };
}

export function combinePropertiesResult(
  validatorProperties: ValidatorPropertiesModel,
  artifactProperties: ArtifactsPropertiesModel
): ResultPropertiesModel {
  const allPropertyNames = [
    ...new Set([
      ...Object.keys(validatorProperties || {}),
      ...Object.keys(artifactProperties || {}),
    ]),
  ];

  return Object.assign(
    {},
    ...allPropertyNames.map((propertyName) => {
      const validatorProperty = validatorProperties
        ? validatorProperties[propertyName]
        : null;
      const artifactsProperty = artifactProperties
        ? artifactProperties[propertyName]
        : null;
      return {
        [propertyName]: combinePropertyResult(
          validatorProperty,
          artifactsProperty
        ),
      };
    })
  );
}

export function combineModelResult(
  validator: ValidatorModelModel,
  artifacts: ArtifactsModelModel
): ResultModelModel {
  return {
    result: validator ? validator.result : null,
    artifacts: artifacts ? artifacts.artifacts : null,
    properties: combinePropertiesResult(
      (validator && validator.properties) || null,
      (artifacts && artifacts.properties) || null
    ),
  };
}

export function combineModelsResult(
  validatorModels: ValidatorModelsModel,
  artifactModels: ArtifactsModelsModel
): ResultModelsModel {
  const allModelNames = [
    ...new Set([
      ...Object.keys(validatorModels || {}),
      ...Object.keys(artifactModels || {}),
    ]),
  ];

  return Object.assign(
    {},
    ...allModelNames.map((ModelName) => {
      const validatorModel = validatorModels
        ? validatorModels[ModelName]
        : null;
      const artifactsModel = artifactModels ? artifactModels[ModelName] : null;
      return {
        [ModelName]: combineModelResult(validatorModel, artifactsModel),
      };
    })
  );
}

export function combineResult(
  validator: ValidatorModel,
  artifacts: ArtifactsModel
): ResultModel {
  return {
    result: validator ? validator.result : null,
    models: combineModelsResult(
      (validator && validator.models) || null,
      (artifacts && artifacts.models) || null
    ),
  };
}
