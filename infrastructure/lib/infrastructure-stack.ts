import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const func = new lambda.Function(this, "ApiFunc", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("resources/api-deployment-package.zip"),
      handler: "api.main",
    });
  }
}
