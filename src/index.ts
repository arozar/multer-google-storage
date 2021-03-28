import multer = require('multer');
import { Bucket, CreateWriteStreamOptions, PredefinedAcl, Storage, StorageOptions } from '@google-cloud/storage';
import { v4 as uuid } from 'uuid';
import urlencode = require('urlencode');
import { Request } from 'express';

export default class MulterGoogleCloudStorage implements multer.StorageEngine {

	private gcsBucket: Bucket;
	private gcsStorage: Storage;
	private options: StorageOptions & { acl?: PredefinedAcl, bucket?: string, contentType?: ContentTypeFunction };
	private blobFile: {destination?: string, filename: string} = { destination: '', filename: '' };
		
	getFilename( req, file, cb ) {
		if(typeof file.originalname === 'string')
			cb( null, file.originalname );
		else
			cb( null, `${uuid()}` );
	}

	getDestination( req, file, cb ) {
		cb( null, '' );
	}
	
	getContentType( req, file ) {
		if(typeof file.mimetype === 'string')
			return file.mimetype;
		else
			return undefined;
	}

	private setBlobFile( req, file ) {
		this.getDestination(req, file, (err, destination) => {
			if (err) {
				return false;
			}

			var escDestination = '';
			escDestination += destination
				.replace(/^\.+/g, '')
				.replace(/^\/+|\/+$/g, '');

			if (escDestination !== '') {
				escDestination = escDestination + '/';
			}
			
			this.blobFile.destination = escDestination;
		});
		
		this.getFilename(req, file, (err, filename) => {
			if (err) {
				return false;
			}

			this.blobFile.filename = urlencode(filename
				.replace(/^\.+/g, '')
				.replace(/^\/+/g, '')
				.replace(/\r|\n/g, '_')
			);
		});

		return true;
	}

	constructor(opts?: StorageOptions & { bucket?: string, destination?: any, filename?: any, hideFilename?: boolean, contentType?: ContentTypeFunction }) {
		opts = opts || {};

		typeof opts.destination === 'string' ? 
			this.getDestination = function (req, file, cb) { cb(null, opts.destination) } 
			: this.getDestination = opts.destination || this.getDestination;
		
		if (opts.hideFilename) {
			this.getFilename = function (req, file, cb) { cb(null, `${uuid()}`) };
			this.getContentType = function (req, file) { return undefined };
		}
		else {
			typeof opts.filename === 'string' ?
				this.getFilename = function (req, file, cb) { cb(null, opts.filename) }
				:	this.getFilename = opts.filename || this.getFilename;
			
			typeof opts.contentType === 'string' ?
				this.getContentType = function (req, file) { return opts.contentType }
				:	this.getContentType = opts.contentType || this.getContentType;
		}

		opts.bucket = opts.bucket || process.env.GCS_BUCKET || null;
		opts.projectId = opts.projectId || process.env.GCLOUD_PROJECT || null;
		opts.keyFilename = opts.keyFilename || process.env.GCS_KEYFILE || null;

		if (!opts.bucket) {
			throw new Error('You have to specify bucket for Google Cloud Storage to work.');
		}

		if (!opts.projectId) {
			throw new Error('You have to specify project id for Google Cloud Storage to work.');
		}

		if (!opts.keyFilename && !opts.credentials) {
			throw new Error('You have to specify credentials key file or credentials object, for Google Cloud Storage to work.');
		}

		this.gcsStorage = new Storage({
			projectId: opts.projectId,
			keyFilename: opts.keyFilename,
			credentials: opts.credentials
		});

		this.gcsBucket = this.gcsStorage.bucket(opts.bucket);

		this.options = opts;
	}

	_handleFile = (req, file, cb) => {
		if(this.setBlobFile( req, file )) {
			var blobName = this.blobFile.destination + this.blobFile.filename;
			var blob = this.gcsBucket.file(blobName);

			const streamOpts: CreateWriteStreamOptions = {
				predefinedAcl: this.options.acl || 'private'
			};

			const contentType = this.getContentType(req, file);
			if (contentType) {
				streamOpts.metadata = {contentType};
			}

			const blobStream = blob.createWriteStream(streamOpts);
			file.stream.pipe(blobStream)
				.on('error', (err) => cb(err))
				.on('finish', (file) => {
					const name = blob.metadata.name;
					const filename = name.substr(name.lastIndexOf('/')+1);
					cb(null, {
						bucket: blob.metadata.bucket,
						destination: this.blobFile.destination,
						filename,
						path: `${this.blobFile.destination}${filename}`,
						contentType: blob.metadata.contentType,
						size: blob.metadata.size,
						uri: `gs://${blob.metadata.bucket}/${this.blobFile.destination}${filename}`,
						linkUrl: `https://storage.cloud.google.com/${blob.metadata.bucket}/${this.blobFile.destination}${filename}`,
						selfLink: blob.metadata.selfLink,
						//metadata: blob.metadata
					})
				});
		}
	}
	_removeFile =  (req, file, cb) => {
		if (this.setBlobFile( req, file )) {
			var blobName = this.blobFile.destination + this.blobFile.filename;
			var blob = this.gcsBucket.file(blobName);
			blob.delete();
		}
	};
}

export function storageEngine(opts?: StorageOptions & { bucket?: string; destination?: any; filename?: any; hideFilename?: boolean; contentType?: ContentTypeFunction }) {
	return new MulterGoogleCloudStorage(opts);
}

export type ContentTypeFunction = (req: Request, file: Express.Multer.File) => string | undefined;