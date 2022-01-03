import { Storage } from '@google-cloud/storage';
import { join } from 'path';
import config from './config';

const gc = process.env.NODE_ENV === 'production'
  ? new Storage({
    credentials: JSON.parse(process.env.GCS_KEYFILE),
    projectId: config.GCS_PROJECT_ID
    })
  : new Storage({
    keyFilename: join(__dirname, '../../fleet-petal-329519-cb1e7f8f25e8.json'),
    projectId: config.GCS_PROJECT_ID
    });

const audioBucket = gc.bucket('masterclass_audio_assets');

export default audioBucket;