import * as  multer from 'multer';
import * as storage from '@google-cloud/storage';
import * as uuid from 'uuid/v1';

export default class MulterGoogleCloudStorage implements multer.StorageEngine {

	private gcobj: storage.Storage;
	private gcsBucket: storage.Bucket;
	private options: storage.ConfigurationObject & { acl?: string, bucket?: string };

	getFilename(req, file, cb) {
    	cb(null,`${uuid()}_${file.originalname}`);
	}
	getDestination( req, file, cb ) {
		cb( null, '' );
	}

	constructor(opts: storage.ConfigurationObject & { filename?: any, bucket?:string }) {
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

        //TODO submit pr to typedef repo for default export
		let s:any = storage; 
		this.gcobj =  s({
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
				file.stream.pipe(gcFile.createWriteStream({ predefinedAcl: this.options.acl || 'private' }))
					.on('error', (err) => cb(err))
					.on('finish', (file) => cb(null, {
							path: `https://'${this.options.bucket}.storage.googleapis.com/${filename}`,
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