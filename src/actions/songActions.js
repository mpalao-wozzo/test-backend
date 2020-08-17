import { areRequiredParamsValid, isObjectEmpty, cleanSearchText } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import baseFunctionsGenerator from './base/baseFunctions';
import uploadActions from './uploadActions';
import songModel from '../models/song';
import artistActions from './artistActions';
import { genreActions, songActions } from '.';

const songFunctions = baseFunctionsGenerator(songModel);

const createSong = (imgUrl, songUrl, song) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(song) || !areRequiredParamsValid(song, songModel)) {
      reject(WRONG_PARAMS);
    } else {
      Promise.all([ uploadActions.getUrl(imgUrl), uploadActions.getUrl(songUrl) ])
        .then((result) => {
          songFunctions.create({ ...song, imgUrl: result[0], songUrl: result[1] })
            .then((createdSong) => {
              resolve(createdSong);
            })
            .catch((createdSongError) => {
              reject(createdSongError);
            });
        });
    }
  });

const findManySongsByFilter = ({ _id, name, artistId, genreId, album, active, deleted }) =>
  new Promise((resolve, reject) => {
    const query = {};

    if (_id) {
      query._id = _id;
    }

    if (name) {
      query.name = name;
    }

    if (artistId) {
      query.artistId = artistId;
    }

    if (genreId) {
      query.genreId = genreId;
    }

    if (album) {
      query.album = album;
    }

    if (active || false === active) {
      query.active = active;
    }

    if (deleted || false === deleted) {
      query.deleted = deleted;
    }

    songFunctions.findByQuery(query)
      .then((songs) => {
        resolve(songs);
      })
      .catch((songsError) => {
        reject(songsError);
      });
  });

const findSongsBySearch = (search = '') =>
  new Promise((resolve, reject) => {
    if (search) {
      const findByName = { name: { $regex: cleanSearchText(search), $options: 'i' } };
      Promise.all([
        artistActions.findByQuery(findByName),
        genreActions.findByQuery(findByName),
      ])
        .then((result) => {
          songActions.findByQuery({
            $or: [
              findByName,
              { artistId: { $in: result[0].map((element) => element._id) } },
              { genreId: { $in: result[1].map((element) => element._id) } },
            ],
          })
            .then((songs) => {
              resolve(songs);
            })
            .catch((songsError) => {
              reject(songsError);
            });
        });
    } else {
      reject(WRONG_PARAMS);
    }
  });

const updateSong = (imgUrl, songUrl, song) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(song) || !areRequiredParamsValid(song, songModel) || !song._id) {
      reject(WRONG_PARAMS);
    } else {
      Promise.all([ uploadActions.getUrl(imgUrl), uploadActions.getUrl(songUrl) ])
        .then((result) => {
          songFunctions.update(song._id, { ...song, imgUrl: result[0] || song.imgUrl, songUrl: result[1] || song.songUrl })
            .then((createdSong) => {
              resolve(createdSong);
            })
            .catch((createdSongError) => {
              reject(createdSongError);
            });
        })
        .catch((errUpload) => {
          reject(errUpload);
        });
    }
  });

export default {
  ...songFunctions,
  createSong,
  findManySongsByFilter,
  findSongsBySearch,
  updateSong,
};
