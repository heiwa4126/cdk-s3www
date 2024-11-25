import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";

export class CdkS3WwwStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const bucket = new s3.Bucket(this, "WebsiteBucket", {
			websiteIndexDocument: "index.html",
			publicReadAccess: true,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			autoDeleteObjects: true,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
			versioned: true,
			encryption: s3.BucketEncryption.S3_MANAGED,
			enforceSSL: true,
		});

		new s3deploy.BucketDeployment(this, "DeployWebsite", {
			sources: [s3deploy.Source.asset("www")],
			destinationBucket: bucket,
			destinationKeyPrefix: "", // optional prefix in the bucket
		});

		// new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
		new cdk.CfnOutput(this, "BucketURL", {
			value: `https://${bucket.bucketRegionalDomainName}/index.html`,
		});
	}
}
