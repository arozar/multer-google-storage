import * as multer from 'multer';
import { StorageOptions } from '@google-cloud/storage';
import { Request } from 'express';
export default class MulterGoogleCloudStorage implements multer.StorageEngine {
    private gcsBucket;
    private gcsStorage;
    private options;
    getFilename(req: any, file: any, cb: any): void;
    getDestination(req: any, file: any, cb: any): void;
    getContentType: ContentTypeFunction;
    constructor(opts?: StorageOptions & {
        filename?: any;
        bucket?: string;
        contentType?: ContentTypeFunction;
    });
    _handleFile: (req: any, file: any, cb: any) => void;
    _removeFile: (req: any, file: any, cb: any) => void;
}
export declare function storageEngine(opts?: StorageOptions & {
    filename?: any;
    bucket?: string;
}): MulterGoogleCloudStorage;
export declare type ContentTypeFunction = (req: Request, file: Express.Multer.File) => string | undefined;
