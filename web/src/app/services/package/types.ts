import {
  SpecDescription,
  SpecTitle,
  SpecName,
  SpecVersion,
  SpecValue,
} from '@open-alchemy/package-sdk';

export { SpecDescription, SpecTitle, SpecName, SpecVersion, SpecValue };

export interface LimitedSpecInfo {
  proposedName?: SpecName;
  version?: {
    value: SpecVersion;
    valid: boolean;
  };
  title?: SpecTitle;
  description?: SpecDescription;
}
