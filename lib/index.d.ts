import * as multer from 'multer';
import { ConfigurationObject } from '@google-cloud/storage';
export default class MulterGoogleCloudStorage implements multer.StorageEngine {
    private gcobj;
    private gcsBucket;
    private options;
    getFilename(req: any, file: any, cb: any): void;
    getDestination(req: any, file: any, cb: any): void;
    constructor(opts?: ConfigurationObject & {
        filename?: any;
        bucket?: string;
    });
    _handleFile: (req: any, file: any, cb: any) => void;
    _removeFile: (req: any, file: any, cb: any) => void;
}
