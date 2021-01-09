import {
  ValidationResponseProperty,
  ValidationResponseProperties,
  ValidationResponseModel,
  ValidationResponseModels,
  ValidationResponse,
  ArtifactResponseProperty,
  ArtifactResponseProperties,
  ArtifactResponseModel,
  ArtifactResponseModels,
  ArtifactResponse,
  ResultPropertyModel,
  ResultPropertiesModel,
  ResultModelModel,
  ResultModelsModel,
  ResultModel,
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
  validator: ValidationResponseModel,
  artifacts: ArtifactResponseModel
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
  validatorModels: ValidationResponseModels,
  artifactModels: ArtifactResponseModels
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
  validator: ValidationResponse,
  artifact: ArtifactResponse
): ResultModel {
  return {
    result: validator ? validator.result : null,
    models: combineModelsResult(
      (validator && validator.models) || null,
      (artifact && artifact.models) || null
    ),
  };
}
