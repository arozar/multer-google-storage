# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v3.0.0 - 2022-12-07

### ⚠ BREAKING CHANGES

- tsconfig.json target updated to ES6

### Fixes

 Add prepare script (#11)
 Remove unnecessary constraint where creds or keyfile is required for instansiating Storage (#12)

### Maintenance

- Package updates:
  @google-cloud/storage    6.5.2 -> 6.8.0
  @types/jest             29.0.3 -> 29.2.4
  @types/node            18.7.21 -> 18.11.11
  jest                    29.0.3 -> 29.3.1
  typescript               4.8.3 -> 4.9.3
  
## v2.9.0 - 2022-09-26

### Fixes

Fix missing callback function (#9)

### Maintenance

- Package updates:
  @google-cloud/storage    5.8.5 -> 6.5.2
  @types/express         4.17.12 -> 4.17.14
  @types/jest            26.0.23 -> 29.0.3
  @types/node            15.12.2 -> 18.7.21
  jest                    27.0.4 -> 29.0.3
  multer                   1.4.4 -> 1.4.5-lts.1
  typescript               4.3.2 -> 4.8.3
  uuid                     8.3.2 -> 9.0.0
## v2.8.0 - 2021-06-14

### Maintenance

- Package updates:
  @google-cloud/storage    5.8.3 -> 5.8.5
  @types/express         4.17.11 -> 4.17.12
  @types/jest            26.0.22 -> 26.0.23
  @types/node           14.14.37 -> 15.12.2
  jest                    26.6.3 -> 27.0.4
  typescript               4.2.3 -> 4.3.2
  
## v2.7.1 - 2021-03-30

### Fixes

Fix constructor missing params type checking (#8)
Add test check when using uniformBucketLevelAccess (#8)

## v2.7.0 - 2021-03-30

### Fixes

Update index.d.ts (#3)
uniformBucketLevelAccess enabled support (#4)
Allow credentials OR keyFileName (#5)
Swap cloud.google.com to storage.googleapis.com (#6)
blobFile scoping to field uploaded. (#7)
### Other changes

- Package updates:
  @google-cloud/storage    5.5.0 -> 5.8.3
  @types/express          4.17.9 -> 4.17.11
  @types/jest            26.0.15 -> 26.0.22
  @types/multer            1.4.4 -> 1.4.5
  @types/node            14.14.7 -> 14.14.37
  typescript               4.0.5 -> 4.2.3
  uuid                     8.3.1 -> 8.3.2

## v2.6.0 - 2020-11-16

### Other changes

- Package updates:
  @google-cloud/storage    5.3.0 -> 5.5.0
  @types/express          4.17.8 -> 4.17.9
  @types/jest            26.0.13 -> 26.0.15
  @types/node            14.10.1 -> 14.14.7
  jest                    26.4.2 -> 26.6.3
  typescript               3.9.7 -> 4.0.5
  uuid                     8.3.0 -> 8.3.1

## v2.5.0 - 2020-11-16

### Fixes

Merge Duong Le's fix: Add mising params in StorageEngine's constructor

## v2.4.0 - 2020-09-11

### Other changes

- Package updates:
  @google-cloud/storage    5.1.1 -> 5.3.0
  @types/express          4.17.6 -> 4.17.8
  @types/jest             25.2.3 -> 26.0.13
  @types/multer            1.4.3 -> 1.4.4
  @types/node            14.0.13 -> 14.10.1
  jest                    26.1.0 -> 26.4.2
  typescript               3.9.5 -> 3.9.7
  uuid                     8.1.0 -> 8.3.0

## v2.3.0 - 2020-06-23

### Bug Fixes

- array() method issue: req.files present incorrect filename property

### Other changes

- Package updates:
  @google-cloud/storage    5.0.1 -> 5.1.1
  @types/jest             25.2.3 -> 26.0.0
  @types/node             14.0.5 -> 14.0.13
  jest                    26.0.1 -> 26.1.0
  typescript               3.8.3 -> 3.9.5

## v2.2.0 - 2020-05-25

### ⚠ BREAKING CHANGES

- Dropped support for Node.js <= 8.x

### Other changes

- Package updates:
  @google-cloud/storage    4.7.0 -> 5.0.1
  @types/jest             25.2.1 -> 25.2.3
  @types/node            13.13.5 -> 14.0.5
  @types/urlencode         1.1.1 -> 1.1.2
  typescript               3.8.3 -> 3.9.3
  uuid                     8.0.0 -> 8.1.0

## v2.1.1 - 2020-05-07

### Fixes

- destination is not urlencoded anymore

## v2.1.0 - 2020-04-26

### Features

- New options to explicit constructor
  - `contentType`: `string`
  - `destination`: `string`
  - `hideFilename`: `boolean`
- New information available on multer API file object
  - `bucket`
  - `destination`
  - `filename`
  - `path`
  - `contenType`
  - `size`
  - `uri`
  - `linkUrl`
  - `selfLink`

### Fixes

- Now package.json defines engine Node.js >= 10
  - Requirement of Google API v4.7.0, not correctly observed on v2.0.0

### Other changes

- Packages added:
  - jest
- Packages removed:
  - commitizen
  - cz-conventional-changelog
  - husky
  - nyc
  - semantic-release

## v2.0.0 - 2020-04-15

### ⚠ BREAKING CHANGES

- Removed support for Node.js < 8.x

### Features

- Update Google Cloud Storage Node.js Client to v4.7.0
- Update dependencies to latest versions (most for security fixes)