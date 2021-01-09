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
  ResultPropertiesModel,
  ResultModelModel,
  ResultModelsModel,
} from '../result.model';

import {
  ValidationResponseProperty,
  ValidationResponseProperties,
  ValidationResponseModel,
  ArtifactResponseProperty,
  ArtifactResponseProperties,
  ResultPropertyModel,
} from '../services/editor/types';

export function combinePropertyResult(
  validate: ValidationResponseProperty,
  artifacts: ArtifactResponseProperty
): ResultPropertyModel {
  return {
    result: validate ? validate.result : null,
    artifacts: artifacts ? artifacts.artifacts : null,
  };
}

export function combinePropertiesResult(
  validateProperties: ValidationResponseProperties,
  artifactProperties: ArtifactResponseProperties
): ResultPropertiesModel {
  const allPropertyNames = [
    ...new Set([
      ...Object.keys(validateProperties || {}),
      ...Object.keys(artifactProperties || {}),
    ]),
  ];

  return Object.assign(
    {},
    ...allPropertyNames.map((propertyName) => {
      const validateProperty = validateProperties
        ? validateProperties[propertyName]
        : null;
      const artifactProperty = artifactProperties
        ? artifactProperties[propertyName]
        : null;
      return {
        [propertyName]: combinePropertyResult(
          validateProperty,
          artifactProperty
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
