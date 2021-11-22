import { Storage } from '@google-cloud/storage';
import { join } from 'path';

// const gc = new Storage({
//   credentials: JSON.parse(process.env.GCS_KEYFILE),
//   projectId: 'fleet-petal-329519'
// });

const gc = new Storage({
  keyFilename: join(__dirname, '../../fleet-petal-329519-cb1e7f8f25e8.json'),
  projectId: 'fleet-petal-329519'
});

const audioBucket = gc.bucket('masterclass_audio_assets');

export default audioBucket;