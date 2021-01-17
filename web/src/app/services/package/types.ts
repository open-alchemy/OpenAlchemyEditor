import {
  SpecDescription,
  SpecTitle,
  SpecName,
  SpecId,
  SpecVersion,
  SpecValue,
  Credentials,
} from '@open-alchemy/package-sdk';

export {
  SpecDescription,
  SpecTitle,
  SpecName,
  SpecId,
  SpecVersion,
  SpecValue,
  Credentials,
};

export interface LimitedSpecInfo {
  proposedName?: SpecName;
  actualName?: SpecName | null;
  id?: SpecId | null;
  version?: {
    value: SpecVersion;
    valid: boolean;
  };
  title?: SpecTitle;
  description?: SpecDescription;
}
