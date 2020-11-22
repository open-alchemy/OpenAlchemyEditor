#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { InfrastructureStack } from "../lib/infrastructure-stack";

const env = {
  account: process.env.AWS_ACCOUNT,
  region: process.env.AWS_DEFAULT_REGION,
};

const app = new cdk.App();
new InfrastructureStack(app, "InfrastructureStack", { env });
