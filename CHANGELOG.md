# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v2.6.0 - 2020-11-16

### Other changes

- Package updates:
  @google-cloud/storage    5.3.0 -> 5.5.0
  @types/express          4.17.8 -> 4.17.9
  @types/jest            26.0.13 -> 26.0.15
  @types/node            14.10.1 -> 14.17.7
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