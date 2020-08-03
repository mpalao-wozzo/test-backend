import artistModel from '../models/artist';
import baseFunctionsGenerator from './base/baseFunctions';
import { checkIfAllRequiredPropertiesExist } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';

const artistFunctions = baseFunctionsGenerator(artistModel);

const createArtist = (artist) =>
  new Promise((resolve, reject) => {
    if (!checkIfAllRequiredPropertiesExist(artist, artistModel)) {
      reject(WRONG_PARAMS);
    } else {
      artistFunctions.create(artist)
        .then((cretatedArtist) => { resolve(cretatedArtist); })
        .catch((createdArtistError) => { reject(createdArtistError); });
    }
  });

const deleteArtist = (artistId) =>
  new Promise((resolve, reject) => {
    artistFunctions.findByQueryAndUpdate({ _id: artistId }, { deleted: true })
      .then((artistUpdated) => {
        resolve(artistUpdated);
      })
      .catch((artistUpdatedError) => {
        reject(artistUpdatedError);
      });
  });

export default {
  ...artistFunctions,
  createArtist,
  deleteArtist,
};
