import * as gcs from '@google-cloud/storage'
import MulterGoogleCloudStorage from './index'
jest.mock('@google-cloud/storage');

const cloudStorage = (opts?: any) => new MulterGoogleCloudStorage(opts);

describe('MulterGoogleCloudStorage checks', () => {
  const opts = { bucket: 'test', projectId: 'test', keyFilename: './test' };

  test('Constructor shall accept parameters defined in process.env', () => {
    process.env.GCS_BUCKET = 'test';
    process.env.GCLOUD_PROJECT = 'test';
    process.env.GCS_KEYFILE = './test';

    expect(cloudStorage())
      .toBeInstanceOf(MulterGoogleCloudStorage)

    delete process.env.GCS_BUCKET;
    delete process.env.GCLOUD_PROJECT;
    delete process.env.GCS_KEYFILE;
  })
  
  test('Constructor shall accept parameters defined in opts', () => {
    expect(cloudStorage(opts))
      .toBeInstanceOf(MulterGoogleCloudStorage)
  })
    
  test('Constructor shall throw error when missing bucket', () => {
    const noBucket = { projectId: 'test', keyFilename: './test' };
    expect(() => { cloudStorage(noBucket) }).toThrow();
  })

  test('Constructor shall throw error when missing projectId', () => {
    const noProj = { bucket: 'test', keyFilename: './test' };
    expect(() => { cloudStorage(noProj) }).toThrow();
  })

  test('Constructor shall throw error when missing keyFilename', () => {
    const noKey = { bucket: 'test', projectId: 'test' };
    expect(() => { cloudStorage(noKey) }).toThrow();
  })

  test('MulterGoogleCloudStorage shall expose _handleFile', () => {
    expect(cloudStorage(opts)._handleFile).toBeInstanceOf(Function);
  })

  test('MulterGoogleCloudStorage shall expose _remofeFile', () => {
    expect(cloudStorage(opts)._removeFile).toBeInstanceOf(Function);
  })

})