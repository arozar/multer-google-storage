import { Router, Express } from 'express';
import { createProfile, uploadProfile, viewProfiles }  from '../Controllers/profiles.controller';
import { createUploadHandler } from '../Services/upload.service';
import * as path from 'path';

const router = Router();

router.get('/', createProfile);

router.post('/upload', createUploadHandler.single('image') , uploadProfile);

router.get('/profiles', viewProfiles);


const profiles = (app: Express) => {
  app.use('/', router);

    return path.resolve(__dirname,'../Views')
}

export default profiles;