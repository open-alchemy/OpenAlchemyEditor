import * as assert from "assert";

const AWS_ACCOUNT_KEY = "AWS_ACCOUNT";
const AWS_DEFAULT_REGION_KEY = "AWS_DEFAULT_REGION";
const AWS_OPEN_ALCHEMY_CERTIFICATE_ARN_KEY = "AWS_OPEN_ALCHEMY_CERTIFICATE_ARN";

interface IEnvironment {
  [AWS_ACCOUNT_KEY]: string;
  [AWS_DEFAULT_REGION_KEY]: string;
  [AWS_OPEN_ALCHEMY_CERTIFICATE_ARN_KEY]: string;
}

function getEnvironment(): IEnvironment {
  const awsAccount = process.env[AWS_ACCOUNT_KEY];
  assert.ok(typeof awsAccount === "string");

  const awsDefaultRegion = process.env[AWS_DEFAULT_REGION_KEY];
  assert.ok(typeof awsDefaultRegion === "string");

  const awsOpenAlchemyCertificateArn =
    process.env[AWS_OPEN_ALCHEMY_CERTIFICATE_ARN_KEY];
  assert.ok(typeof awsOpenAlchemyCertificateArn === "string");

  return {
    [AWS_ACCOUNT_KEY]: awsAccount,
    [AWS_DEFAULT_REGION_KEY]: awsDefaultRegion,
    [AWS_OPEN_ALCHEMY_CERTIFICATE_ARN_KEY]: awsOpenAlchemyCertificateArn,
  };
}

export const ENVIRONMENT = getEnvironment();
