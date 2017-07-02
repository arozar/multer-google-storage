"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mockery = require("mockery");
describe('multer-google-storage', function () {
    before(function () {
        mockery.enable();
        var storageMock = function () { return { bucket: function () { } }; };
        mockery.registerMock('@google-cloud/storage', storageMock);
        process.env.GCS_BUCKET = 'test';
        process.env.GCLOUD_PROJECT = 'test';
        process.env.GCS_KEYFILE = './test';
    });
    it('should define multer storage engine interface', function () {
        var MulterGoogleCloudStorage = require('./index').default;
        var cloudStorage = new MulterGoogleCloudStorage();
        chai_1.expect(cloudStorage._handleFile).to.be.a('function');
        chai_1.expect(cloudStorage._removeFile).to.be.a('function');
        chai_1.expect(cloudStorage.getDestination).to.be.a('function');
    });
    after(function () { return mockery.disable(); });
});
//# sourceMappingURL=index.test.js.map