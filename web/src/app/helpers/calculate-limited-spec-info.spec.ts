import { LimitedSpecInfo } from '../services/package/types';
import { calculateLimitedSpecInfo } from './calculate-limited-spec-info';

describe('calculateLimitedSpecInfo', () => {
  ([
    {
      description: 'empty spec',
      expectation: 'should return empty info',
      value: '',
      expectedSpecInfo: {},
    },
    {
      description: 'invalid YAML spec',
      expectation: 'should return empty info',
      value: 'some:invalid:yaml:',
      expectedSpecInfo: {},
    },
    {
      description: 'info not map',
      expectation: 'should return empty info',
      value: 'info: info 1',
      expectedSpecInfo: {},
    },
    {
      description: 'empty info',
      expectation: 'should return empty info',
      value: 'info: {}',
      expectedSpecInfo: {},
    },
    {
      description: 'info with title that is not string',
      expectation: 'should return empty info',
      value: `
info:
  title: true`,
      expectedSpecInfo: {},
    },
    {
      description: 'info with lowercase title no spaces',
      expectation: 'should return info with title and name',
      value: `
info:
  title: title1`,
      expectedSpecInfo: { title: 'title1', proposedName: 'title1' },
    },
    {
      description: 'info with uppercase title no spaces',
      expectation:
        'should return info with title and name converted to lower case',
      value: `
info:
  title: TITLE1`,
      expectedSpecInfo: { title: 'TITLE1', proposedName: 'title1' },
    },
    {
      description: 'info with lowercase title with single space',
      expectation:
        'should return info with title and name where spaces have been replaced with -',
      value: `
info:
  title: title 1`,
      expectedSpecInfo: { title: 'title 1', proposedName: 'title-1' },
    },
    {
      description: 'info with lowercase title with multiple spaces',
      expectation:
        'should return info with title and name where spaces have been replaced with -',
      value: `
info:
  title: spec title 1`,
      expectedSpecInfo: { title: 'spec title 1', proposedName: 'spec-title-1' },
    },
    {
      description: 'info with description that is not string',
      expectation: 'should return empty info',
      value: `
info:
  description: true`,
      expectedSpecInfo: {},
    },
    {
      description: 'info with description',
      expectation: 'should return info with description',
      value: `
info:
  description: description 1`,
      expectedSpecInfo: { description: 'description 1' },
    },
    {
      description: 'info with version that is not string nor number',
      expectation: 'should return empty info',
      value: `
info:
  version: true`,
      expectedSpecInfo: {},
    },
    {
      description: 'info with valid integer version',
      expectation: 'should return info with version',
      value: `
info:
  version: 1`,
      expectedSpecInfo: { version: { value: '1', valid: true } },
    },
    {
      description: 'info with valid string version',
      expectation: 'should return info with version',
      value: `
info:
  version: 1.1.1`,
      expectedSpecInfo: { version: { value: '1.1.1', valid: true } },
    },
    {
      description: 'info with invalid valid string version',
      expectation: 'should return info with version',
      value: `
info:
  version: "!"`,
      expectedSpecInfo: { version: { value: '!', valid: false } },
    },
  ] as {
    description: string;
    expectation: string;
    value: string;
    expectedSpecInfo: LimitedSpecInfo;
  }[]).forEach(({ description, expectation, value, expectedSpecInfo }) => {
    describe(description, () => {
      it(expectation, () => {
        expect(calculateLimitedSpecInfo(value)).toEqual(expectedSpecInfo);
      });
    });
  });
});
