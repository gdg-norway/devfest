import {
    importSpeakers,
  } from './utils';
  import {speakersWrite } from '../../functions/src/generate-sessions-speakers-schedule';
  
  importSpeakers()
    .then(() => {
      console.log('Finished');
      process.exit();
    })
    .catch((err: Error) => {
      console.log(err);
      process.exit();
    });
  
    export {
        speakersWrite,
      };