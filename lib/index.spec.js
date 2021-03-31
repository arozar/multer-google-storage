"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
jest.mock('@google-cloud/storage');
var cloudStorage = function (opts) { return new index_1.default(opts); };
describe('MulterGoogleCloudStorage checks', function () {
    var opts = { bucket: 'test', projectId: 'test', keyFilename: './test' };
    test('Constructor shall accept parameters defined in process.env', function () {
        process.env.GCS_BUCKET = 'test';
        process.env.GCLOUD_PROJECT = 'test';
        process.env.GCS_KEYFILE = './test';
        expect(cloudStorage())
            .toBeInstanceOf(index_1.default);
        delete process.env.GCS_BUCKET;
        delete process.env.GCLOUD_PROJECT;
        delete process.env.GCS_KEYFILE;
    });
    test('Constructor shall accept parameters defined in opts', function () {
        expect(cloudStorage(opts))
            .toBeInstanceOf(index_1.default);
    });
    test('Constructor shall throw error when missing bucket', function () {
        var noBucket = { projectId: 'test', keyFilename: './test' };
        expect(function () { cloudStorage(noBucket); }).toThrow();
    });
    test('Constructor shall throw error when missing projectId', function () {
        var noProj = { bucket: 'test', keyFilename: './test' };
        expect(function () { cloudStorage(noProj); }).toThrow();
    });
    test('Constructor shall throw error when missing credentials', function () {
        var noKey = { bucket: 'test', projectId: 'test' };
        expect(function () { cloudStorage(noKey); }).toThrow();
    });
    test('Constructor shall not throw error when using credentials object', function () {
        var credentials = { bucket: 'test', projectId: 'test', credentials: {} };
        expect(function () { cloudStorage(credentials); }).not.toThrow();
    });
    test('Constructor shall not throw error when using keyFileName', function () {
        var keyFileName = { bucket: 'test', projectId: 'test', keyFilename: './test' };
        expect(function () { cloudStorage(keyFileName); }).not.toThrow();
    });
    test('Constructor shall not throw error when using uniformBucketLevelAccess', function () {
        var uniformBucketLevelAccess = { bucket: 'test', projectId: 'test', keyFilename: './test', uniformBucketLevelAccess: true };
        expect(function () { cloudStorage(uniformBucketLevelAccess); }).not.toThrow();
    });
    test('MulterGoogleCloudStorage shall expose _handleFile', function () {
        expect(cloudStorage(opts)._handleFile).toBeInstanceOf(Function);
    });
    test('MulterGoogleCloudStorage shall expose _remofeFile', function () {
        expect(cloudStorage(opts)._removeFile).toBeInstanceOf(Function);
    });
});
//# sourceMappingURL=index.spec.js.map