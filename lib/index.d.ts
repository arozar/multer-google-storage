import * as multer from 'multer';
import { StorageOptions, PredefinedAcl } from '@google-cloud/storage';
import { Request } from 'express';
import { Metadata } from '@google-cloud/common';
export default class MulterGoogleCloudStorage implements multer.StorageEngine {
    private gcobj;
    private gcsBucket;
    private options;
    getFilename(req: any, file: any, cb: any): void;
    getDestination(req: any, file: any, cb: any): void;
    getContentType: ContentTypeFunction;
    constructor(opts?: StorageOptions & {
        filename?: any;
        acl?: PredefinedAcl;
        bucket?: string;
        contentType?: ContentTypeFunction;
        metadata?: Metadata;
    });
    _handleFile: (req: any, file: any, cb: any) => void;
    _removeFile: (req: any, file: any, cb: any) => void;
}
export declare function storageEngine(opts?: StorageOptions & {
    filename?: any;
    bucket?: string;
}): MulterGoogleCloudStorage;
export declare type ContentTypeFunction = (req: Request, file: Express.Multer.File) => string | undefined;
