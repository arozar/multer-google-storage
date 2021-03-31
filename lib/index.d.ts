import multer = require('multer');
import { PredefinedAcl, StorageOptions } from '@google-cloud/storage';
import { Request } from 'express';
export declare type MulterGoogleCloudStorageOptions = {
    acl?: PredefinedAcl;
    bucket?: string;
    contentType?: ContentTypeFunction | string;
    destination?: any;
    filename?: any;
    hideFilename?: boolean;
    uniformBucketLevelAccess?: boolean;
};
export default class MulterGoogleCloudStorage implements multer.StorageEngine {
    private gcsBucket;
    private gcsStorage;
    private options;
    getFilename(req: any, file: any, cb: any): void;
    getDestination(req: any, file: any, cb: any): void;
    getContentType(req: any, file: any): any;
    private getBlobFileReference;
    constructor(opts?: StorageOptions & MulterGoogleCloudStorageOptions);
    _handleFile: (req: any, file: any, cb: any) => void;
    _removeFile: (req: any, file: any, cb: any) => void;
}
export declare function storageEngine(opts?: StorageOptions & MulterGoogleCloudStorageOptions): MulterGoogleCloudStorage;
export declare type ContentTypeFunction = (req: Request, file: Express.Multer.File) => string | undefined;
