import { areRequiredParamsValid, isObjectEmpty } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import baseFunctionsGenerator from './base/baseFunctions';
import musicGenderModel from '../models/musicGender';

const musicGenderFunctions = baseFunctionsGenerator(musicGenderModel);

const createMusicGender = (musicGender) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(musicGender) || !areRequiredParamsValid(musicGender, musicGenderModel)) {
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

const findManyMusicGendersByFilter = ({ _id, name, active, deleted }) =>
  new Promise((resolve, reject) => {
    const query = {};

    if (_id) {
      query._id = _id;
    }

    if (name) {
      query.name = name;
    }

    if (active || false === active) {
      query.active = active;
    }

    if (deleted || false === deleted) {
      query.deleted = deleted;
    }

    musicGenderFunctions.findByQuery(query)
      .then((musicGenders) => {
        resolve(musicGenders);
      })
      .catch((musicGendersError) => {
        reject(musicGendersError);
      });
  });

const updateMusicGender = (musicGender) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(musicGender) || !areRequiredParamsValid(musicGender, musicGenderModel) || !musicGender._id) {
      reject(WRONG_PARAMS);
    } else {
      musicGenderFunctions.update(musicGender._id, musicGender)
        .then((updatedMusicGender) => {
          resolve(updatedMusicGender);
        })
        .catch((updatedMusicGenderError) => {
          reject(updatedMusicGenderError);
        });
    }
  });

export default {
  ...musicGenderFunctions,
  createMusicGender,
  findManyMusicGendersByFilter,
  updateMusicGender,
};
