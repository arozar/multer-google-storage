import * as multer from 'multer';
import { Bucket, CreateWriteStreamOptions, PredefinedAcl, Storage, StorageOptions } from '@google-cloud/storage';
import { v1 as uuid } from 'uuid';
import { Request } from 'express';
const storage: (options?:StorageOptions) => Storage = require('@google-cloud/storage');
export default class MulterGoogleCloudStorage implements multer.StorageEngine {

	private gcsBucket: Bucket;
	private gcsStorage: Storage;
	private options: StorageOptions & { acl?: PredefinedAcl, bucket?: string, contentType?: ContentTypeFunction };

	getFilename(req, file, cb) {
		// TODO sinitize filename
		cb(null,`${uuid()}_${file.originalname}`);
	}
	getDestination( req, file, cb ) {
		cb( null, '' );
	}

	public getContentType: ContentTypeFunction = (req, file) => {
		return undefined;
	}

	constructor(opts?: StorageOptions & { filename?: any, bucket?:string, contentType?: ContentTypeFunction }) {
		opts = opts || {};

		this.getFilename = opts.filename || this.getFilename;
		this.getContentType = opts.contentType || this.getContentType;

		opts.bucket = opts.bucket || process.env.GCS_BUCKET || null;
		opts.projectId = opts.projectId || process.env.GCLOUD_PROJECT || null;
		opts.keyFilename = opts.keyFilename || process.env.GCS_KEYFILE || null;

		if (!opts.bucket) {
			throw new Error('You have to specify bucket for Google Cloud Storage to work.');
		}

		if (!opts.projectId) {
			throw new Error('You have to specify project id for Google Cloud Storage to work.');
		}

		if (!opts.keyFilename) {
			throw new Error('You have to specify credentials key file for Google Cloud Storage to work.');
		}

		this.gcsStorage = storage({
			projectId: opts.projectId,
			keyFilename: opts.keyFilename
		});

		this.gcsBucket = this.gcsStorage.bucket(opts.bucket);

		this.options = opts;
	}

	_handleFile = (req, file, cb) => {
		this.getDestination(req, file, (err, destination) => {

			if (err) {
				return cb(err);
			}

			this.getFilename(req, file, (err, filename) => {
				if (err) {
					return cb(err);
				}
				var gcFile = this.gcsBucket.file(filename);

				const streamOpts: CreateWriteStreamOptions = {
					predefinedAcl: this.options.acl || 'private'
				};

				const contentType = this.getContentType(req, file);

				if (contentType) {
				  streamOpts.metadata = {contentType};
				}

				const outStream = gcFile.createWriteStream(streamOpts);
				const size = outStream.writableLength;

				file.stream.pipe(outStream)
					.on('error', (err) => cb(err))
					.on('finish', (file) => cb(null, {
							destination: `${this.options.bucket}`,
							uri: `gs://${this.options.bucket}/${filename}`,
							linkurl: `https://storage.cloud.google.com/${this.options.bucket}/${filename}`,
							filename: filename,
							size: size
						})
					);
			});

		});
	}
	_removeFile =  (req, file, cb) => {
		var gcFile = this.gcsBucket.file(file.filename);
		gcFile.delete();
	};
}

export function storageEngine(opts?: StorageOptions & { filename?: any, bucket?:string }){
	return new MulterGoogleCloudStorage(opts);
}

export type ContentTypeFunction = (req: Request, file: Express.Multer.File) => string | undefined;
