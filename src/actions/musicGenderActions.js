import { areRequiredParamsValid, isObjectValid } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import baseFunctionsGenerator from './base/baseFunctions';
import musicGenderModel from '../models/musicGender';

const musicGenderFunctions = baseFunctionsGenerator(musicGenderModel);

const createMusicGender = (musicGender) =>
  new Promise((resolve, reject) => {
    if (!isObjectValid(musicGender) || !areRequiredParamsValid(musicGender, musicGenderModel)) {
      reject(WRONG_PARAMS);
    } else {
      musicGenderFunctions.create(musicGender)
        .then((createdMusicGender) => {
          resolve(createdMusicGender);
        })
        .catch((createdMusicGenderError) => {
          reject(createdMusicGenderError);
        });
    }
  });

export default {
  ...musicGenderFunctions,
  createMusicGender,
};
