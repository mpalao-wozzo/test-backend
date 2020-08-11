import { areRequiredParamsValid, isObjectEmpty } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import baseFunctionsGenerator from './base/baseFunctions';
import updateActions from './updateActions';
import songModel from '../models/song';

const songFunctions = baseFunctionsGenerator(songModel);

const createSong = (imgUrl, songUrl, song) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(song) || !areRequiredParamsValid(song, songModel)) {
      reject(WRONG_PARAMS);
    } else {
      Promise.all([ updateActions.getUrl(imgUrl), updateActions.getUrl(songUrl) ])
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

const updateSong = (imgUrl, songUrl, song) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(song) || !areRequiredParamsValid(song, songModel) || !song._id) {
      reject(WRONG_PARAMS);
    } else {
      Promise.all([ updateActions.getUrl(imgUrl), updateActions.getUrl(songUrl) ])
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
  updateSong,
};
