import { modelCompletelyValid } from './model-completely-valid';

describe('modelCompletelyValid', () => {
  const parameters = [
    {
      description: 'model null',
      expectation: 'should not be valid',
      model: null,
      result: false,
    },
    {
      description: 'result null',
      expectation: 'should not be valid',
      model: { result: null },
      result: false,
    },
    {
      description: 'no properties not valid',
      expectation: 'should not be valid',
      model: { result: { valid: false } },
      result: false,
    },
    {
      description: 'no properties valid',
      expectation: 'should be valid',
      model: { result: { valid: true } },
      result: true,
    },
    {
      description: 'single properties model not valid',
      expectation: 'should not be valid',
      model: {
        result: { valid: false },
        properties: { prop_1: { result: { valid: true } } },
      },
      result: false,
    },
    {
      description: 'properties empty',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: {},
      },
      result: true,
    },
    {
      description: 'single properties model valid properties property null',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: { prop_1: null },
      },
      result: true,
    },
    {
      description:
        'single properties model valid properties property result null',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: { prop_1: { result: null } },
      },
      result: true,
    },
    {
      description: 'single properties model valid properties not valid',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: { prop_1: { result: { valid: false } } },
      },
      result: false,
    },
    {
      description: 'single properties model valid properties valid',
      expectation: 'should be valid',
      model: {
        result: { valid: true },
        properties: { prop_1: { result: { valid: true } } },
      },
      result: true,
    },
    {
      description: 'multiple properties no properties valid',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: {
          prop_1: { result: { valid: false } },
          prop_2: { result: { valid: false } },
        },
      },
      result: false,
    },
    {
      description: 'multiple properties first properties valid',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: {
          prop_1: { result: { valid: true } },
          prop_2: { result: { valid: false } },
        },
      },
      result: false,
    },
    {
      description: 'multiple properties second properties valid',
      expectation: 'should not be valid',
      model: {
        result: { valid: true },
        properties: {
          prop_1: { result: { valid: false } },
          prop_2: { result: { valid: true } },
        },
      },
      result: false,
    },
    {
      description: 'multiple properties all properties valid',
      expectation: 'should be valid',
      model: {
        result: { valid: true },
        properties: {
          prop_1: { result: { valid: true } },
          prop_2: { result: { valid: true } },
        },
      },
      result: true,
    },
  ];

  parameters.forEach(({ description, expectation, model, result }) => {
    describe(description, () => {
      it(expectation, () => {
        expect(modelCompletelyValid(model)).toEqual(result);
      });
    });
  });
});
