export interface ValidatorResultModel {
  valid: boolean;
  reason?: string;
}

export interface ValidatorPropertyModel {
  result: ValidatorResultModel;
}

export interface ValidatorPropertiesModel {
  [key: string]: ValidatorPropertyModel;
}

export interface ValidatorModelModel {
  result: ValidatorResultModel;

  properties?: ValidatorPropertiesModel;
}

export interface ValidatorModelsModel {
  [key: string]: ValidatorModelModel;
}

export interface ValidatorModel {
  result: ValidatorResultModel;

  models?: ValidatorModelsModel;
}
