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

export default {
  ...artistFunctions,
  createArtist,
};
