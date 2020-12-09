#!/usr/bin/env node
require("dotenv").config();

import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3BucketStack } from '../lib/s3Bucket-stack';

/**
   * AWS Account / Region Definition
   */
const {
    PREFIX: prefix = "[STACK PREFIX NAME]",
    STAGE: stage = "[DEPLOYMENT STAGE]",
    CDK_ACCOUNT: accountId = "[AWS ACCOUNT ID]",
    CDK_REGION: region = "ap-southeast-1",
    BUCKET_NAME: bucketName = "",
    WHITE_LIST_IP: whiteListIp = "[]",
} = process.env;

/**
   * AWS defulat ENV config Definition
   */
const env = {
    account: accountId,
    region: region,
};

const app = new cdk.App();

new S3BucketStack(app, `${prefix}-${stage}-S3BucketStack`, {
    env,
    prefix,
    stage,
    bucketName,
    whiteListIp: JSON.parse(whiteListIp),
});

app.synth();