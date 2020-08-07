import { areRequiredParamsValid, isObjectEmpty } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import artistModel from '../models/artist';
import baseFunctionsGenerator from './base/baseFunctions';

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

const findManyArtistsByFilter = ({ _id, name, active, deleted }) =>
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

    artistFunctions.findByQuery(query)
      .then((artists) => {
        resolve(artists);
      })
      .catch((aritstsError) => {
        reject(aritstsError);
      });
  });

const updateArtist = (artist) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty || !areRequiredParamsValid(artist, artistModel) || !artist._id) {
      reject(WRONG_PARAMS);
    } else {
      artistFunctions.update(artist._id, artist)
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
  findManyArtistsByFilter,
  updateArtist,
};
