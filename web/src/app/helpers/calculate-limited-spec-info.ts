import * as YAML from 'yaml';

import { SpecValue, LimitedSpecInfo } from '../services/package/types';

const VERSION_RE = new RegExp(
  '([1-9][0-9]*!)?(0|[1-9][0-9]*)(.(0|[1-9][0-9]*))*((a|b|rc)(0|[1-9][0-9]*))?(.post(0|[1-9][0-9]*))?(.dev(0|[1-9][0-9]*))?'
);

export function calculateLimitedSpecInfo(value: SpecValue): LimitedSpecInfo {
  const parsedValue = YAML.parse(value);

  if (!parsedValue?.info) {
    return {};
  }

  const info = parsedValue.info;
  const specInfo: LimitedSpecInfo = {};

  if (typeof info.title === 'string') {
    const title: string = info.title;
    specInfo.title = title;
    specInfo.proposedName = title.toLowerCase().replace(/ /g, '-');
  }

  if (typeof info.version === 'string' || typeof info.version === 'number') {
    let version: string | number = info.version;
    if (typeof version === 'number') {
      version = version.toString();
    }

    const versionResult = value.match(VERSION_RE);
    specInfo.version = {
      value: version,
      valid: versionResult !== null,
    };
  }

  if (typeof info.description === 'string') {
    specInfo.description = info.description;
  }

  return specInfo;
}
