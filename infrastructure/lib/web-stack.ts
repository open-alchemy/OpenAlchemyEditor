import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";

import { CONFIG } from "./config";

export class WebStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket
    const bucket = new s3.Bucket(this, "Bucket", {
      bucketName: `${CONFIG.web.recordName}.${CONFIG.domainName}`,
    });
    new s3Deployment.BucketDeployment(this, "BucketDeployment", {
      sources: [s3Deployment.Source.asset("resources/web")],
      destinationBucket: bucket,
    });
  }
}
