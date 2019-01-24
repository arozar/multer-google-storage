"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid/v1");
var storage = require('@google-cloud/storage');
var MulterGoogleCloudStorage = /** @class */ (function () {
    function MulterGoogleCloudStorage(opts) {
        var _this = this;
        this.getContentType = function (req, file) {
            return undefined;
        };
        this._handleFile = function (req, file, cb) {
            _this.getDestination(req, file, function (err, destination) {
                if (err) {
                    return cb(err);
                }
                _this.getFilename(req, file, function (err, filename) {
                    if (err) {
                        return cb(err);
                    }
                    var gcFile = _this.gcsBucket.file(filename);
                    var streamOpts = {
                        predefinedAcl: _this.options.acl || 'private'
                    };
                    var contentType = _this.getContentType(req, file);
                    if (contentType) {
                        streamOpts.metadata = { contentType: contentType };
                    }
                    file.stream.pipe(gcFile.createWriteStream(streamOpts))
                        .on('error', function (err) { return cb(err); })
                        .on('finish', function (file) { return cb(null, {
                        path: "https://" + _this.options.bucket + ".storage.googleapis.com/" + filename,
                        filename: filename
                    }); });
                });
            });
        };
        this._removeFile = function (req, file, cb) {
            var gcFile = _this.gcsBucket.file(file.filename);
            gcFile.delete();
        };
        opts = opts || {};
        this.getFilename = (opts.filename || this.getFilename);
        this.getContentType = (opts.contentType || this.getContentType);
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
    MulterGoogleCloudStorage.prototype.getFilename = function (req, file, cb) {
        cb(null, uuid() + "_" + file.originalname);
    };
    MulterGoogleCloudStorage.prototype.getDestination = function (req, file, cb) {
        cb(null, '');
    };
    return MulterGoogleCloudStorage;
}());
exports.default = MulterGoogleCloudStorage;
function storageEngine(opts) {
    return new MulterGoogleCloudStorage(opts);
}
exports.storageEngine = storageEngine;
//# sourceMappingURL=index.js.map