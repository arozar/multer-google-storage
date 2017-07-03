# multer-google-storage
[![Travis build](https://img.shields.io/travis/ARozar/multer-google-storage.svg)](https://travis-ci.org/ARozar/multer-google-storage/)

This is a multer storage engine for google's file storage.

## Installation
    npm install multer-google-storage --save

## Usage
    import * as  multer from 'multer';
    import * as express from 'express';
    import MulterGoogleCloudStorage from 'multer-google-storage';

    const app = express();

    const uploadHandler = multer({
      storage: new MulterGoogleCloudStorage()
    });

    app.post('/upload', uploadHandler.any(), (req:Request & any, res) => {
        console.log(req.files);
        res.json(req.files);
    });

NB: This package is written to work with es5 or higher.  If you have an editor or IDE that can understand d.ts (typescript) type definitions you will get additional support from your tooling though you do not need to be using typescript to use this package.

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

#### Custom file naming
If you need to customize the naming of files then you are able to provide a function that will be called before uploading the file.  The third argument of the function must be a standard node callback so pass any error in the first argument (or null on sucess) and the string name of the file on success.

	getFilename(req, file, cb) {
    	cb(null,`${uuid()}_${file.originalname}`);
	}

