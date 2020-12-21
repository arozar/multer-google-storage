import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as mongoose from 'mongoose';
import { Response, Request, Express } from 'express';

import { createProfile, uploadProfile, viewProfiles } from '../Controllers/profiles.controller';
import { Profile, ProfileRecord } from '../Models/profiles.models';

describe('profiles controller create', function () {
 
    it('returns index view', async function () {

        let file = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            render: sinon.stub()
        };
        
        createProfile(<Request>req, <Response>res);

        sinon.assert.calledWith(res.render as sinon.SinonStub, 'index',{ layout: false , title: 'Please upload your application'});      
    });
});

describe('profiles controller',async function() {
    let { ProfileRecord } = await import('../Models/profiles.models');

    beforeEach(function() {
        sinon.stub(ProfileRecord, 'find');
    });

    afterEach(function() {
        (ProfileRecord.find as sinon.SinonStub).restore();
    });

    it('should return expected models', async function() {

        var expectedModels = [{}, {}];
        (ProfileRecord.find as sinon.SinonStub).resolves(expectedModels);
        var req: Partial<Request> = { };
        var res: Partial<Response> = {
            json: sinon.stub()
        };

        await viewProfiles(<Request>req, <Response>res);

        sinon.assert.calledWith(res.json as sinon.SinonStub, expectedModels);
    });
});

describe('profiles controller upload', async function () {
    let { ProfileRecord } = await import('../Models/profiles.models');
    
    const ProfilePrototype: mongoose.Document = ProfileRecord.prototype;
    
    beforeEach(function () {
        sinon.stub(ProfileRecord.prototype, 'save');

        (ProfilePrototype.save as sinon.SinonStub).callsFake(function (this: Profile) {
            let currentRecord = this;

            return Promise.resolve(currentRecord);
        });
    });

    afterEach(function () {
        (ProfilePrototype.save as sinon.SinonStub).restore();
    });

    it('should call save ', async function () {

        let file: Partial<Express.Multer.File> = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: Partial<Request> = { file: file as Express.Multer.File, body };

        let createdModels: Partial<Profile> = {};
        let res: Partial<Response> = {
            json: (data: any) => createdModels = data
        };
        
        await uploadProfile(<Request>req, <Response>res);

        sinon.assert.called(ProfileRecord.prototype.save);        
    });

    it('should create, save and return Profile', async function () {

        let file: Partial<Express.Multer.File> = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: Partial<Request> = { file: file as Express.Multer.File, body };

        let createdModel: Partial<Profile> = {};
        let res: Partial<Response> = {
            json: (data: any) => createdModel = data
        };
        
        await uploadProfile(<Request>req, <Response>res);

        expect(createdModel.fileName).to.equal(file.path);
        expect(createdModel.title).to.equal(body.title);
        expect(createdModel.description).to.equal(body.description);       
    });
});
