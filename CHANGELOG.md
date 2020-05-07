# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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