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
        .then((cretatedArtist) => {
          resolve(cretatedArtist);
        })
        .catch((createdArtistError) => {
          reject(createdArtistError);
        });
    }
  });

const deleteArtist = (artistId) =>
  new Promise((resolve, reject) => {
    artistFunctions.update({ _id: artistId }, { deleted: true })
      .then((artistUpdated) => {
        resolve(artistUpdated);
      })
      .catch((artistUpdatedError) => {
        reject(artistUpdatedError);
      });
  });

const findManyArtistsByFilter = (filter = {}) =>
  new Promise((resolve, reject) => {
    const query = {};

    if (filter._id) {
      query._id = filter._id;
    }

    if (filter.name) {
      query.name = filter.name;
    }

    if (filter.active || false === filter.active) {
      query.active = filter.active;
    }

    if (filter.deleted || false === filter.deleted) {
      query.deleted = filter.deleted;
    }

    artistFunctions.findByQuery(query)
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
      artistFunctions.update({ _id: artistId }, artist)
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
  findManyArtistsByFilter,
  updateArtist,
};
