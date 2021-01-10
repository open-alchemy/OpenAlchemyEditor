import {
  SpecDescription,
  SpecTitle,
  SpecName,
  SpecVersion,
} from '@open-alchemy/package-sdk';

export interface LimitedSpecInfo {
  name: SpecName;
  version: SpecVersion;
  title: SpecTitle;
  description: SpecDescription;
}
