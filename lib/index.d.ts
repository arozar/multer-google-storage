import * as multer from 'multer';
import { StorageOptions, PredefinedAcl } from '@google-cloud/storage';
import { Request } from 'express';
export default class MulterGoogleCloudStorage implements multer.StorageEngine {
    private gcobj;
    private gcsBucket;
    private options;
    getFilename(req: any, file: any, cb: any): void;
    getDestination(req: any, file: any, cb: any): void;
    getContentType: ContentTypeFunction;
    constructor(opts?: StorageOptions & {
        acl?: PredefinedAcl;
        filename?: any;
        bucket?: string;
        contentType?: ContentTypeFunction;
    });
    _handleFile: (req: any, file: any, cb: any) => void;
    _removeFile: (req: any, file: any, cb: any) => any;
}
export declare function storageEngine(opts?: StorageOptions & {
    filename?: any;
    bucket?: string;
}): MulterGoogleCloudStorage;
export declare type ContentTypeFunction = (req: Request, file: Express.Multer.File) => string | undefined;
