import { areRequiredParamsValid, isObjectEmpty } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import baseFunctionsGenerator from './base/baseFunctions';
import genreModel from '../models/genre';

const genreFunctions = baseFunctionsGenerator(genreModel);

const createGenre = (genre) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(genre) || !areRequiredParamsValid(genre, genreModel)) {
      reject(WRONG_PARAMS);
    } else {
      genreFunctions.create(genre)
        .then((createdgenre) => {
          resolve(createdgenre);
        })
        .catch((createdgenreError) => {
          reject(createdgenreError);
        });
    }
  });

const findManyGenresByFilter = ({ _id, name, active, deleted }) =>
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

    genreFunctions.findByQuery(query)
      .then((genres) => {
        resolve(genres);
      })
      .catch((genresError) => {
        reject(genresError);
      });
  });

const updateGenre = (genre) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(genre) || !areRequiredParamsValid(genre, genreModel) || !genre._id) {
      reject(WRONG_PARAMS);
    } else {
      genreFunctions.update(genre._id, genre)
        .then((updatedgenre) => {
          resolve(updatedgenre);
        })
        .catch((updatedgenreError) => {
          reject(updatedgenreError);
        });
    }
  });

export default {
  ...genreFunctions,
  createGenre,
  findManyGenresByFilter,
  updateGenre,
};
