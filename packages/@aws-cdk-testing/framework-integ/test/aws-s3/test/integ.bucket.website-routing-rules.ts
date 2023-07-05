#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as s3 from 'aws-cdk-lib/aws-s3';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-cdk-s3');

new s3.Bucket(stack, 'MyBucketWithRoutingRules', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  websiteIndexDocument: "index.html",
  websiteRoutingRules: [{
    condition: { keyPrefixEquals: "" },
    hostName: "example.com",
    protocol: s3.RedirectProtocol.HTTPS,
    replaceKey: "/",
  }],
});

new IntegTest(app, 'cdk-integ-s3-bucket', {
  testCases: [stack],
});