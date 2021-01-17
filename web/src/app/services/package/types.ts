import {
  SpecDescription,
  SpecTitle,
  SpecName,
  SpecVersion,
  SpecValue,
  Credentials,
} from '@open-alchemy/package-sdk';

export {
  SpecDescription,
  SpecTitle,
  SpecName,
  SpecVersion,
  SpecValue,
  Credentials,
};

export interface LimitedSpecInfo {
  proposedName?: SpecName;
  actualName?: SpecName | null;
  version?: {
    value: SpecVersion;
    valid: boolean;
  };
  title?: SpecTitle;
  description?: SpecDescription;
}
