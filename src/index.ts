import * as  multer from 'multer';
import { Storage, Bucket, ConfigurationObject } from '@google-cloud/storage';
import * as uuid from 'uuid/v1';
const storage: (options?:ConfigurationObject)=>Storage = require('@google-cloud/storage'); 

export default class MulterGoogleCloudStorage implements multer.StorageEngine {

	private gcobj: Storage;
	private gcsBucket: Bucket;
	private options: ConfigurationObject & { acl?: string, bucket?: string };

	getFilename(req, file, cb) {
    	cb(null,`${uuid()}_${file.originalname}`);
	}
	getDestination( req, file, cb ) {
		cb( null, '' );
	}

	constructor(opts?: ConfigurationObject & { filename?: any, bucket?:string }) {
		 opts = opts || {};
		
		this.getFilename = (opts.filename || this.getFilename);

		opts.bucket = (opts.bucket || process.env.GCS_BUCKET || null);
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

		this.gcobj = storage({
			projectId: opts.projectId,
			keyFilename: opts.keyFilename
		});

		this.gcsBucket = this.gcobj.bucket(opts.bucket);

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
				file.stream.pipe(gcFile.createWriteStream({
          predefinedAcl: this.options.acl || 'private',
          metadata: {
            contentType: file.mimetype
          }
        }))
					.on('error', (err) => cb(err))
					.on('finish', (file) => cb(null, {
							path: `https://${this.options.bucket}.storage.googleapis.com/${filename}`,
							filename: filename
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

export function storageEngine(opts?: ConfigurationObject & { filename?: any, bucket?:string }){
	
	return new MulterGoogleCloudStorage(opts);
}