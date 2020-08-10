import { areRequiredParamsValid, isObjectEmpty, isObject } from '../utils/helpers';
import { WRONG_PARAMS } from '../utils/constants';
import baseFunctionsGenerator from './base/baseFunctions';
import songModel from '../models/song';
import imageActions from './imageActions';

const songFunctions = baseFunctionsGenerator(songModel);

const createSong = (imgUrl, songUrl, song) =>
  new Promise((resolve, reject) => {
    if (isObjectEmpty(song) || !areRequiredParamsValid(song, songModel)) {
      reject(WRONG_PARAMS);
    } else {
      imageActions.getUrl(imgUrl)
        .then((newImgUrl) => {
          imageActions.getUrl(songUrl)
            .then((newSongUrl) => {
              songFunctions.create({ ...song, imgUrl: newImgUrl, songUrl: newSongUrl })
                .then((createdSong) => {
                  resolve(createdSong);
                })
                .catch((createdSongError) => {
                  reject(createdSongError);
                });
            });
        });
    }
  });

const findManySongsByFilter = ({ _id, name, artistId, genreId, releaseDate, album, active, deleted }) =>
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

    if (releaseDate) {
      query.releaseDate = releaseDate;
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
      Promise.all([ imageActions.getUrl(imgUrl), imageActions.getUrl(songUrl) ])
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
