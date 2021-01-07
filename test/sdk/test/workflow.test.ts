import {
  SpecService,
  ArtifactService,
  SeedService,
} from '@open-alchemy/editor-sdk';
import YAML from 'yaml';

const VERSION = '1';
const TITLE = 'title 1';
const DESCRIPTION = 'description 1';
const SPEC_VALUE = {
  info: {
    title: TITLE,
    description: DESCRIPTION,
    version: VERSION,
  },
  components: {
    schemas: {
      Schema: {
        type: 'object',
        'x-tablename': 'schema',
        properties: { id: { type: 'integer' } },
      },
    },
  },
};
const SPEC_VALUE_STRING_JSON = JSON.stringify(SPEC_VALUE);
const SPEC_VALUE_STRING_YAML = YAML.stringify(SPEC_VALUE);

describe('validate a spec', () => {
  let service: SpecService;

  beforeEach(() => {
    service = new SpecService();
  });

  ([
    {
      description: 'JSON',
      expectation: 'should validate the spec',
      value: SPEC_VALUE_STRING_JSON,
      language: 'JSON',
    },
    {
      description: 'YAML',
      expectation: 'should validate the spec',
      value: SPEC_VALUE_STRING_YAML,
      language: 'YAML',
    },
  ] as {
    description: string;
    expectation: string;
    value: string;
    language: 'JSON' | 'YAML';
  }[]).forEach(({ description, expectation, value, language }) => {
    describe(description, () => {
      test(expectation, async () => {
        // Validate managed
        let result = await service.validateManaged({ value, language });
        expect(result.result.valid).toBeTruthy();

        // Validate un managed
        result = await service.validateUnManaged({ value, language });

        expect(result.result.valid).toBeTruthy();
      });
    });
  });
});

describe('calculate artifacts of a spec', () => {
  let service: ArtifactService;

  beforeEach(() => {
    service = new ArtifactService();
  });

  ([
    {
      description: 'JSON',
      expectation: 'should calculate the artifacts',
      value: SPEC_VALUE_STRING_JSON,
      language: 'JSON',
    },
    {
      description: 'YAML',
      expectation: 'should calculate the artifacts',
      value: SPEC_VALUE_STRING_YAML,
      language: 'YAML',
    },
  ] as {
    description: string;
    expectation: string;
    value: string;
    language: 'JSON' | 'YAML';
  }[]).forEach(({ description, expectation, value, language }) => {
    describe(description, () => {
      test(expectation, async () => {
        const result = await service.calculate({ value, language });
        expect(result.models).toBeTruthy();
      });
    });
  });
});

describe('retrieve seeds', () => {
  let service: SeedService;

  beforeEach(() => {
    service = new SeedService();
  });

  describe('default seed', () => {
    test('should retrieve the default seed', async () => {
      const defaultSeed = await service.getDefault();
      expect(defaultSeed).toBeTruthy();
    });
  });
});
