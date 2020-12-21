import { Router, RequestHandler, Response, Request, Express } from 'express';
import * as path from 'path';
import { ProfileRecord, Profile } from '../Models/profiles.models';

export const createProfile = (req: Request, res: Response) => {
  res.render('index', { layout: false , title: 'Please upload your application' });
}

export const uploadProfile = async (req:Request, res: Response) => {

    const fileName = req.file.path;
    
    const { title, description } = req.body as Profile;

    const newProfile: Profile = Object.assign(new ProfileRecord(), { fileName, title, description });

    const savedProfile = await newProfile.save();

    res.json(savedProfile);
}

export const viewProfiles = async (req: Request, res: Response) => {
  
  const profiles = await ProfileRecord.find({});
  
  res.json(profiles);
}