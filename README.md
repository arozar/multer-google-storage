# multer-cloud-storage
[![last commit](https://badgen.net/github/last-commit/alexandre-steinberg/multer-cloud-storage)](https://github.com/alexandre-steinberg/multer-cloud-storage)
[![npm version](https://badgen.net/npm/v/multer-cloud-storage)](https://www.npmjs.com/package/multer-cloud-storage)
[![MIT License](https://badgen.net/npm/license/multer-cloud-storage)](https://opensource.org/licenses/MIT)
[![node](https://badgen.net/npm/node/multer-cloud-storage)](https://nodejs.org/en/)
[![packagephobia install size](https://badgen.net/packagephobia/install/multer-cloud-storage)](https://packagephobia.now.sh/result?p=multer-cloud-storage)
[![packagephobia publish size](https://badgen.net/packagephobia/publish/multer-cloud-storage)](https://packagephobia.now.sh/result?p=multer-cloud-storage)

multer-cloud-storage is a [multer](https://github.com/expressjs/multer) custom store engine for Google Cloud Storage service. It is a fork from ARozar's [multer-google-storage](https://github.com/ARozar/multer-google-storage) that uses latest version of Google Cloud's API, allows additional information (like destination and contentType) to be set and reduces module footprint.

## Installation

    npm install multer-cloud-storage --save

or

    yarn add multer-cloud-storage


## Usage
### ES6

    import * as multer from 'multer';
    import * as express from 'express';
    import MulterGoogleCloudStorage from 'multer-cloud-storage';

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
    var multerGoogleStorage = require("multer-cloud-storage");
    var app = express();
    var uploadHandler = multer({
        storage: multerGoogleStorage.storageEngine()
    });
    app.post('/upload', uploadHandler.any(), function (req, res) {
        console.log(req.files);
        res.json(req.files);
    });

NB: This package is written to work with es5 or higher. If you have an editor or IDE that can understand d.ts (typescript) type definitions you will get additional support from your tooling though you do not need to be using typescript to use this package.

## Google Cloud
### Creating a storage bucket
For instructions on how to create a storage bucket see the following [documentation from Google](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console).

### Obtaining credentials
For instructions on how to obtain the JSON keyfile as well a *projectId* (contained in the key file) please refer to the following [documentation from Google](https://cloud.google.com/docs/authentication/getting-started).

### Credentials
#### Default method
If using the MulterGoogleCloudStorage class without passing in any configuration options then the following environment variables will need to be set:
1. GCS_BUCKET, the name of the bucket to save to.
2. GCLOUD_PROJECT, this is your projectId.  It can be found in the json credentials that you generated.
3. GCS_KEYFILE, this is the path to the json key that you generated.

#### Explicit method
The constructor of the MulterGoogleCloudStorage class can be passed an optional configuration object.

Parameter Name | Type | Sample Value | Default Value | Notes
--- | --- | --- | --- | ---
`acl`|`string`|`"publicRead"`|`"private"`|Accepted values are defined in  [*predefinedAcl*](https://googleapis.dev/nodejs/storage/latest/global.html#CreateWriteStreamOptions) options
`autoRetry`|`boolean`|`true`| `true`| 
`bucket`|`string`|`"mybucketname"`| |Takes precedence over GCS_BUCKET
`contentType`|`function`|`(request, file): string`| | 
`contentType`|`string`|`"application/pdf"`| |If set, this value will be used in place of *file.mimetype*
`destination`|`string`|`"my_folder/"`|`""`|Despite Google Cloud Storage service stores objects in a flat name space, it is possible to list and filter them in a tree-like structure (more on [How Subdirectories Work article](https://cloud.google.com/storage/docs/gsutil/addlhelp/HowSubdirectoriesWork))
`email`|`string`|`"test@test.com"`| | 
`filename`| `function`|`(request, file, callback): void`| | 
`filename`| `string`|`"my_file.pdf"`| |If defined, this name will be used in place of *file.originalname* - use with caution, because the object can be easily overwritten (consider to configure [Object Versioning and Concurrency Control](https://cloud.google.com/storage/docs/gsutil/addlhelp/ObjectVersioningandConcurrencyControl))
`hideFilename`|`boolean`|`true`|`false`|If set to *true*, an UUID v4 will be used as object filename and *Content-Type* will be undefined
`keyFilename`|`string`|`"./key.json"`| |Takes precedence over GCS_KEYFILE
`maxRetries`|`number`|`5`|`3`| | 
`projectId`|`string`|`"test-prj-1234"`| |Takes precedence over GCLOUD_PROJECT
`uniformBucketLevelAccess`|`boolean`|`true`| |Signifies whether `uniformBucketLevelAccess` is enabled on the target bucket. When `true`, the `predefinedAcl` parameter is removed from requests [as it causes `400 Bad Request` responses](https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request). 
#### Custom file naming function
If you need to customize the naming of files then you are able to provide a function that will be called before uploading the file.  The third argument of the function must be a standard node callback so pass any error in the first argument (or null on sucess) and the string name of the file on success.

	getFilename(req, file, cb) {
    	cb(null,`${file.originalname}`);
	}

#### Custom content-type function
If you need to customize the content-type of files then you are able to provide a function that will be called before uploading the file. 

	getContentType( req, file ) {
		return undefined;
	}

## Changes in multer API

When used with multer-cloud-storage, multer will present additional file information.

### File information

Each file contains the following information:

Key | Description | Origin
--- | --- | ---
`fieldname` | Field name specified in the form | `multer`
`originalname` | Name of the file on the user's computer | `multer`
`encoding` | Encoding type of the file | `multer`
`mimetype` | Mime type of the file | `multer`
`bucket` | Bucket name | `multer-cloud-storage`
`destination` | The pseudo-folder to which the file has been saved | `multer-cloud-storage`
`filename` | The name of the file on Google Cloud Storage | `multer-cloud-storage`
`path` | The full path to the uploaded file (basically `destination`+ `filename`) | `multer-cloud-storage`
`contentType` | Content-type defined for stored object | `multer-cloud-storage`
`size` | Size of the file in bytes | `multer-cloud-storage`
`uri` | Google Cloud Storage path | `multer-cloud-storage`
`linkUrl` | Download link for allowed users (may require authentication) | `multer-cloud-storage`
`selfLink` | The link to the stored object (used for Cloud Storage APIs requests) | `multer-cloud-storage`