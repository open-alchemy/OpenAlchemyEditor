import { ArtifactsSimplePropertyModel } from '../artifacts.model';
import {
  combineResult,
  combinePropertyResult,
  combinePropertiesResult,
  combineModelResult,
  combineModelsResult,
} from './combine-results';

describe('combinePropertyResult', () => {
  const parameters = [
    {
      description: 'both null',
      expectation: 'should return null',
      validator: null,
      artifacts: null,
      expectedResult: { result: null, artifacts: null },
    },
    {
      description: 'validator present',
      expectation: 'should return validator',
      validator: { result: { valid: true } },
      artifacts: null,
      expectedResult: { result: { valid: true }, artifacts: null },
    },
    {
      description: 'artifacts present',
      expectation: 'should return artifacts',
      validator: null,
      artifacts: {
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactsSimplePropertyModel,
      },
      expectedResult: {
        result: null,
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactsSimplePropertyModel,
      },
    },
    {
      description: 'both present',
      expectation: 'should return artifacts and validator',
      validator: { result: { valid: true } },
      artifacts: {
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactsSimplePropertyModel,
      },
      expectedResult: {
        result: { valid: true },
        artifacts: {
          type: 'SIMPLE',
          required: false,
          open_api: { type: 'integer' },
          extension: { primary_key: false },
        } as ArtifactsSimplePropertyModel,
      },
    },
  ];

  parameters.forEach(
    ({ description, expectation, validator, artifacts, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(combinePropertyResult(validator, artifacts)).toEqual(
            expectedResult
          );
        });
      });
    }
  );
});

describe('combinePropertiesResult', () => {
  const parameters = [
    {
      description: 'both null',
      expectation: 'should return empty',
      validator: null,
      artifacts: null,
      expectedResult: {},
    },
    {
      description: 'both empty',
      expectation: 'should return empty',
      validator: {},
      artifacts: {},
      expectedResult: {},
    },
    {
      description: 'validator single artifacts null',
      expectation: 'should return empty',
      validator: { prop1: { result: { valid: true } } },
      artifacts: null,
      expectedResult: { prop1: { result: { valid: true }, artifacts: null } },
    },
    {
      description: 'artifacts single validator null',
      expectation: 'should return empty',
      validator: null,
      artifacts: {
        prop1: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: {
          result: null,
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
    {
      description: 'validator single',
      expectation: 'should return validator',
      validator: { prop1: { result: { valid: true } } },
      artifacts: {},
      expectedResult: { prop1: { result: { valid: true }, artifacts: null } },
    },
    {
      description: 'artifacts single',
      expectation: 'should return artifacts',
      validator: {},
      artifacts: {
        prop1: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: {
          result: null,
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
    {
      description: 'both different',
      expectation: 'should return both',
      validator: { prop1: { result: { valid: true } } },
      artifacts: {
        prop2: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: { result: { valid: true }, artifacts: null },
        prop2: {
          result: null,
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
    {
      description: 'both same',
      expectation: 'should return both',
      validator: { prop1: { result: { valid: true } } },
      artifacts: {
        prop1: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: {
          result: { valid: true },
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
    {
      description: 'multiple all different',
      expectation: 'should return all',
      validator: {
        prop1: { result: { valid: true } },
        prop2: { result: { valid: false } },
      },
      artifacts: {
        prop3: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
        prop4: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'string' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: {
          result: { valid: true },
          artifacts: null,
        },
        prop2: {
          result: { valid: false },
          artifacts: null,
        },
        prop3: {
          result: null,
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
        prop4: {
          result: null,
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'string' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
    {
      description: 'multiple single overlap',
      expectation: 'should return all',
      validator: {
        prop1: { result: { valid: true } },
        prop2: { result: { valid: false } },
      },
      artifacts: {
        prop2: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
        prop3: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'string' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: {
          result: { valid: true },
          artifacts: null,
        },
        prop2: {
          result: { valid: false },
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
        prop3: {
          result: null,
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'string' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
    {
      description: 'multiple all overlap',
      expectation: 'should return all',
      validator: {
        prop1: { result: { valid: true } },
        prop2: { result: { valid: false } },
      },
      artifacts: {
        prop1: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
        prop2: {
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'string' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
      expectedResult: {
        prop1: {
          result: { valid: true },
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'integer' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
        prop2: {
          result: { valid: false },
          artifacts: {
            type: 'SIMPLE',
            required: false,
            open_api: { type: 'string' },
            extension: { primary_key: false },
          } as ArtifactsSimplePropertyModel,
        },
      },
    },
  ];

  parameters.forEach(
    ({ description, expectation, validator, artifacts, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(combinePropertiesResult(validator, artifacts)).toEqual(
            expectedResult
          );
        });
      });
    }
  );
});

describe('combineModelResult', () => {
  const parameters = [
    {
      description: 'both null',
      expectation: 'should return null',
      validator: null,
      artifacts: null,
      expectedResult: { result: null, artifacts: null, properties: {} },
    },
    {
      description: 'validator present',
      expectation: 'should return validator',
      validator: { result: { valid: true } },
      artifacts: null,
      expectedResult: {
        result: { valid: true },
        artifacts: null,
        properties: {},
      },
    },
    {
      description: 'artifacts present',
      expectation: 'should return artifacts',
      validator: null,
      artifacts: {
        artifacts: {
          tablename: 'table_1',
        },
      },
      expectedResult: {
        result: null,
        artifacts: {
          tablename: 'table_1',
        },
        properties: {},
      },
    },
    {
      description: 'both present',
      expectation: 'should return artifacts and validator',
      validator: { result: { valid: true } },
      artifacts: {
        artifacts: {
          tablename: 'table_1',
        },
      },
      expectedResult: {
        result: { valid: true },
        artifacts: {
          tablename: 'table_1',
        },
        properties: {},
      },
    },
    {
      description: 'both present properties',
      expectation: 'should return artifacts and validator',
      validator: {
        result: { valid: true },
        properties: { prop1: { result: { valid: true } } },
      },
      artifacts: {
        artifacts: {
          tablename: 'table_1',
        },
        properties: {
          prop1: {
            artifacts: {
              type: 'SIMPLE',
              required: false,
              open_api: { type: 'integer' },
              extension: { primary_key: false },
            } as ArtifactsSimplePropertyModel,
          },
        },
      },
      expectedResult: {
        result: { valid: true },
        artifacts: {
          tablename: 'table_1',
        },
        properties: {
          prop1: {
            result: { valid: true },
            artifacts: {
              type: 'SIMPLE',
              required: false,
              open_api: { type: 'integer' },
              extension: { primary_key: false },
            } as ArtifactsSimplePropertyModel,
          },
        },
      },
    },
  ];

  parameters.forEach(
    ({ description, expectation, validator, artifacts, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(combineModelResult(validator, artifacts)).toEqual(
            expectedResult
          );
        });
      });
    }
  );
});

describe('combineModelsResult', () => {
  const parameters = [
    {
      description: 'both null',
      expectation: 'should return empty',
      validator: null,
      artifacts: null,
      expectedResult: {},
    },
    {
      description: 'both empty',
      expectation: 'should return empty',
      validator: {},
      artifacts: {},
      expectedResult: {},
    },
    {
      description: 'validator single artifacts null',
      expectation: 'should return empty',
      validator: { model1: { result: { valid: true } } },
      artifacts: null,
      expectedResult: {
        model1: { result: { valid: true }, artifacts: null, properties: {} },
      },
    },
    {
      description: 'artifacts single validator null',
      expectation: 'should return empty',
      validator: null,
      artifacts: {
        model1: {
          result: null,
          artifacts: {
            tablename: 'table_1',
          },
        },
      },
      expectedResult: {
        model1: {
          result: null,
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
      },
    },
    {
      description: 'validator single',
      expectation: 'should return validator',
      validator: { model1: { result: { valid: true } } },
      artifacts: {},
      expectedResult: {
        model1: { result: { valid: true }, artifacts: null, properties: {} },
      },
    },
    {
      description: 'artifacts single',
      expectation: 'should return artifacts',
      validator: {},
      artifacts: {
        model1: {
          artifacts: {
            tablename: 'table_1',
          },
        },
      },
      expectedResult: {
        model1: {
          result: null,
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
      },
    },
    {
      description: 'both different',
      expectation: 'should return both',
      validator: { model1: { result: { valid: true } } },
      artifacts: {
        model2: {
          artifacts: {
            tablename: 'table_1',
          },
        },
      },
      expectedResult: {
        model1: { result: { valid: true }, artifacts: null, properties: {} },
        model2: {
          result: null,
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
      },
    },
    {
      description: 'both same',
      expectation: 'should return both',
      validator: { model1: { result: { valid: true } } },
      artifacts: {
        model1: {
          artifacts: {
            tablename: 'table_1',
          },
        },
      },
      expectedResult: {
        model1: {
          result: { valid: true },
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
      },
    },
    {
      description: 'multiple all different',
      expectation: 'should return all',
      validator: {
        model1: { result: { valid: true } },
        model2: { result: { valid: false } },
      },
      artifacts: {
        model3: {
          artifacts: {
            tablename: 'table_1',
          },
        },
        model4: {
          artifacts: {
            tablename: 'table_2',
          },
        },
      },
      expectedResult: {
        model1: {
          result: { valid: true },
          artifacts: null,
          properties: {},
        },
        model2: {
          result: { valid: false },
          artifacts: null,
          properties: {},
        },
        model3: {
          result: null,
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
        model4: {
          result: null,
          artifacts: {
            tablename: 'table_2',
          },
          properties: {},
        },
      },
    },
    {
      description: 'multiple single overlap',
      expectation: 'should return all',
      validator: {
        model1: { result: { valid: true } },
        model2: { result: { valid: false } },
      },
      artifacts: {
        model2: {
          artifacts: {
            tablename: 'table_1',
          },
        },
        model3: {
          artifacts: {
            tablename: 'table_2',
          },
        },
      },
      expectedResult: {
        model1: {
          result: { valid: true },
          artifacts: null,
          properties: {},
        },
        model2: {
          result: { valid: false },
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
        model3: {
          result: null,
          artifacts: {
            tablename: 'table_2',
          },
          properties: {},
        },
      },
    },
    {
      description: 'multiple all overlap',
      expectation: 'should return all',
      validator: {
        model1: { result: { valid: true } },
        model2: { result: { valid: false } },
      },
      artifacts: {
        model1: {
          artifacts: {
            tablename: 'table_1',
          },
        },
        model2: {
          artifacts: {
            tablename: 'table_2',
          },
        },
      },
      expectedResult: {
        model1: {
          result: { valid: true },
          artifacts: {
            tablename: 'table_1',
          },
          properties: {},
        },
        model2: {
          result: { valid: false },
          artifacts: {
            tablename: 'table_2',
          },
          properties: {},
        },
      },
    },
  ];

  parameters.forEach(
    ({ description, expectation, validator, artifacts, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(combineModelsResult(validator, artifacts)).toEqual(
            expectedResult
          );
        });
      });
    }
  );
});

describe('combineResult', () => {
  const parameters = [
    {
      description: 'both null',
      expectation: 'should return null',
      validator: null,
      artifacts: null,
      expectedResult: { result: null, models: {} },
    },
    {
      description: 'validator present',
      expectation: 'should return validator',
      validator: { result: { valid: true } },
      artifacts: null,
      expectedResult: {
        result: { valid: true },
        models: {},
      },
    },
    {
      description: 'artifacts present',
      expectation: 'should return artifacts',
      validator: null,
      artifacts: {},
      expectedResult: {
        result: null,
        models: {},
      },
    },
    {
      description: 'both present',
      expectation: 'should return artifacts and validator',
      validator: { result: { valid: true } },
      artifacts: {},
      expectedResult: {
        result: { valid: true },
        models: {},
      },
    },
    {
      description: 'both present models',
      expectation: 'should return artifacts and validator',
      validator: {
        result: { valid: true },
        models: { model1: { result: { valid: true } } },
      },
      artifacts: {
        models: {
          model1: {
            artifacts: {
              tablename: 'table_1',
            },
          },
        },
      },
      expectedResult: {
        result: { valid: true },
        models: {
          model1: {
            result: { valid: true },
            artifacts: {
              tablename: 'table_1',
            },
            properties: {},
          },
        },
      },
    },
  ];

  parameters.forEach(
    ({ description, expectation, validator, artifacts, expectedResult }) => {
      describe(description, () => {
        it(expectation, () => {
          expect(combineResult(validator, artifacts)).toEqual(expectedResult);
        });
      });
    }
  );
});
