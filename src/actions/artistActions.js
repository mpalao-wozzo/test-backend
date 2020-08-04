import artistModel from '../models/artist';
import baseFunctionsGenerator from './base/baseFunctions';
import { areRequiredParamsValid } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';

const artistFunctions = baseFunctionsGenerator(artistModel);

const createArtist = (artist) =>
  new Promise((resolve, reject) => {
    if (!areRequiredParamsValid(artist, artistModel)) {
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

const findOneArtistByFilter = (filter = {}) =>
  new Promise((resolve, reject) => {
    artistFunctions.findOneByQuery(filter)
      .then((artist) => {
        resolve(artist);
      }).catch((aritstEror) => {
        reject(aritstEror);
      });
  });

const findManyArtistsByFilter = (filter = {}) =>
  new Promise((resolve, reject) => {
    artistFunctions.findByQuery(filter)
      .then((artists) => {
        resolve(artists);
      }).catch((aritstsEror) => {
        reject(aritstsEror);
      });
  });

const updateArtist = (artistId, artist) =>
  new Promise((resolve, reject) => {
    if (!areRequiredParamsValid(artist, artistModel)) {
      reject(WRONG_PARAMS);
    } else {
      artistFunctions.findByQueryAndUpdate({ _id: artistId }, artist)
        .then((artistUpdated) => {
          resolve(artistUpdated);
        })
        .catch((artistUpdatedError) => {
          reject(artistUpdatedError);
        });
    }
  });
export default {
  ...artistFunctions,
  createArtist,
  deleteArtist,
  findOneArtistByFilter,
  findManyArtistsByFilter,
  updateArtist,
};
