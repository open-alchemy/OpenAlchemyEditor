import { modelsCompletelyValid } from './models-completely-valid';

describe('modelsCompletelyValid', () => {
  const parameters = [
    {
      description: 'response null',
      expectation: 'should not be valid',
      response: null,
      result: false,
    },
    {
      description: 'result null',
      expectation: 'should not be valid',
      response: { result: null },
      result: false,
    },
    {
      description: 'no models not valid',
      expectation: 'should not be valid',
      response: { result: { valid: false } },
      result: false,
    },
    {
      description: 'no models valid',
      expectation: 'should be valid',
      response: { result: { valid: true } },
      result: true,
    },
    {
      description: 'single models not valid',
      expectation: 'should not be valid',
      response: {
        result: { valid: false },
        models: { model1: { result: { valid: true } } },
      },
      result: false,
    },
    {
      description: 'single models valid',
      expectation: 'should be valid',
      response: {
        result: { valid: true },
        models: { model1: { result: { valid: true } } },
      },
      result: true,
    },
    {
      description: 'models empty',
      expectation: 'should be valid',
      response: {
        result: { valid: true },
        models: {},
      },
      result: true,
    },
    {
      description: 'single model valid models',
      expectation: 'should be valid',
      response: {
        result: { valid: true },
        models: { model1: { result: { valid: true } } },
      },
      result: true,
    },
    {
      description: 'single model not valid models',
      expectation: 'should not be valid',
      response: {
        result: { valid: true },
        models: { model1: { result: { valid: false } } },
      },
      result: false,
    },
    {
      description: 'multiple model valid models',
      expectation: 'should be valid',
      response: {
        result: { valid: true },
        models: {
          model1: { result: { valid: true } },
          model2: { result: { valid: true } },
        },
      },
      result: true,
    },
    {
      description: 'multiple model first valid models',
      expectation: 'should not be valid',
      response: {
        result: { valid: true },
        models: {
          model1: { result: { valid: true } },
          model2: { result: { valid: false } },
        },
      },
      result: false,
    },
    {
      description: 'multiple model last valid models',
      expectation: 'should not be valid',
      response: {
        result: { valid: true },
        models: {
          model1: { result: { valid: false } },
          model2: { result: { valid: true } },
        },
      },
      result: false,
    },
    {
      description: 'multiple model not valid models',
      expectation: 'should not be valid',
      response: {
        result: { valid: true },
        models: {
          model1: { result: { valid: false } },
          model2: { result: { valid: false } },
        },
      },
      result: false,
    },
  ];

  parameters.forEach(({ description, expectation, response, result }) => {
    describe(description, () => {
      it(expectation, () => {
        expect(modelsCompletelyValid(response)).toEqual(result);
      });
    });
  });
});
