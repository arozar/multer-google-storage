import * as  multer from 'multer';

import MulterGoogleCloudStorage from 'multer-google-storage';

const createUploadHandler = multer({
  storage: new MulterGoogleCloudStorage()
});

export {
	createUploadHandler
}