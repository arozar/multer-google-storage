import * as mongoose from 'mongoose';

export interface Profile extends mongoose.Document{
     title:string;
     description:string;
     fileName: string;    
}
var profileSchema = new mongoose.Schema({
    title: String,
    description: String,
    fileName: String
});

export const ProfileRecord = mongoose.model<Profile>('Profile', profileSchema);
