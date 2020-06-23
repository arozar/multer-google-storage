# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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