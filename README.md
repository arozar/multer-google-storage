# multer-google-storage
[![Travis build](https://img.shields.io/travis/ARozar/multer-google-storage.svg)](https://travis-ci.org/ARozar/multer-google-storage/)

This is a multer storage engine for google's file storage.

## Installation
    npm install multer-google-storage --save

or

    yarn add multer-google-storage


## Usage
### ES6

    import * as  multer from 'multer';
    import * as express from 'express';
    import MulterGoogleCloudStorage from 'multer-google-storage';

    const app = express();

    const uploadHandler = multer({
      storage: new MulterGoogleCloudStorage()
    });

    app.post('/upload', uploadHandler.any(), (req, res) => {
        console.log(req.files);
        res.json(req.files);
    });

### ES5 / Common.js imports

    var multer = require("multer");
    var express = require("express");
    var multerGoogleStorage = require("multer-google-storage");
    var app = express();
    var uploadHandler = multer({
        storage: multerGoogleStorage.storageEngine()
    });
    app.post('/upload', uploadHandler.any(), function (req, res) {
        console.log(req.files);
        res.json(req.files);
    });

NB: This package is written to work with es5 or higher.  If you have an editor or IDE that can understand d.ts (typescript) type definitions you will get additional support from your tooling though you do not need to be using typescript to use this package.

## Google Cloud
### Creating a storage bucket
For instructions on how to create a storage bucket see the following [documentation from google](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console).

### Obtaining credentials
For instructions on how to obtain the JSON keyfile as well a "projectId" (contained in the key file) please refer to the following [documentation from google](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.56.0/guides/authentication.)
### Credentials
#### Default method
If using the MulterGoogleCloudStorage class without passing in any configuration options then the following environment variables will need to be set:
1. GCS_BUCKET, the name of the bucket to save to.
2. GCLOUD_PROJECT, this is your projectId.  It can be found in the json credentials that you generated.
3. GCS_KEYFILE, this is the path to the json key that you generated.

#### Explicit method
The constructor of the MulterGoogleCloudStorage class can be passed an optional configuration object.

| Parameter Name | Type | Sample Value |
|---|---|---|
|`autoRetry`|`boolean`| `true`|
|`email`|`string`|`"test@test.com"`|
|`keyFilename`|`string`|`"./key.json"`|
|`maxRetries`|`number`|`2`|
|`projectId`|`string`|`"test-prj-1234"`|
|`filename`| `function`|`(request, file, callback): void`|
|`bucket`|`string`|`"mybucketname"`|
|`contentType`|`function`|`(request, file): string`|

#### Custom file naming
If you need to customize the naming of files then you are able to provide a function that will be called before uploading the file.  The third argument of the function must be a standard node callback so pass any error in the first argument (or null on sucess) and the string name of the file on success.

	getFilename(req, file, cb) {
    	cb(null,`${uuid()}_${file.originalname}`);
	}
