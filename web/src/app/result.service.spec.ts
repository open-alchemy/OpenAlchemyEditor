import { cold } from 'jasmine-marbles';

import { ResultService } from './result.service';
import { ValidatorResultService } from './validator-result.service';
import { ArtifactsResultService } from './artifacts-result.service';

describe('ResultService', () => {
  let service: ResultService;
  let validatorServiceSpy: jasmine.SpyObj<ValidatorResultService>;
  let artifactsServiceSpy: jasmine.SpyObj<ArtifactsResultService>;

  beforeEach(() => {
    validatorServiceSpy = jasmine.createSpyObj('ValidatorResultService', [
      'result$',
    ]);
    artifactsServiceSpy = jasmine.createSpyObj('ArtifactsResultService', [
      'artifacts$',
    ]);
  });

  describe('result$', () => {
    const parameters = [
      {
        description: 'validator emits first',
        expectation: 'should emit both values',
        validatorMarbles: 'a-',
        validatorValues: { a: { result: { valid: false } } },
        artifactsMarbles: '-b',
        artifactsValues: { b: {} },
        expectedMarbles: '-b',
        expectedValues: { b: { result: { valid: false }, models: {} } },
      },
      {
        description: 'artifacts emits first',
        expectation: 'should emit both values',
        validatorMarbles: '-b',
        validatorValues: { b: { result: { valid: false } } },
        artifactsMarbles: 'a-',
        artifactsValues: { a: {} },
        expectedMarbles: '-b',
        expectedValues: { b: { result: { valid: false }, models: {} } },
      },
    ];

    parameters.forEach(
      ({
        description,
        expectation,
        validatorMarbles,
        validatorValues,
        artifactsMarbles,
        artifactsValues,
        expectedMarbles,
        expectedValues,
      }) => {
        describe(description, () => {
          it(expectation, () => {
            // GIVEN validator and artifacts that emit
            const validator$ = cold(validatorMarbles, validatorValues);
            validatorServiceSpy.result$.and.returnValue(validator$);
            const artifacts$ = cold(artifactsMarbles, artifactsValues);
            artifactsServiceSpy.artifacts$.and.returnValue(artifacts$);

            // WHEN service is constructed
            service = new ResultService(
              validatorServiceSpy,
              artifactsServiceSpy
            );

            // THEN the expected results are emitted
            expect(service.result$()).toBeObservable(
              cold(expectedMarbles, expectedValues)
            );
          });
        });
      }
    );
  });
});
