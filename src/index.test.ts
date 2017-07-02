import { expect } from 'chai';
import * as mockery from  'mockery';


describe('multer-google-storage', () => {
    before(() => {
        mockery.enable();
        const storageMock = () => { return {bucket: () => {}}};
        mockery.registerMock('@google-cloud/storage', storageMock);

        process.env.GCS_BUCKET = 'test';
        process.env.GCLOUD_PROJECT = 'test';
        process.env.GCS_KEYFILE = './test';
    });

    it('should define multer storage engine interface',() => {

        const MulterGoogleCloudStorage = require('./index').default;
        const cloudStorage = new MulterGoogleCloudStorage();

        expect(cloudStorage._handleFile).to.be.a('function');
        expect(cloudStorage._removeFile).to.be.a('function');
        expect(cloudStorage.getDestination).to.be.a('function');
    });

    after(() => mockery.disable());
})

