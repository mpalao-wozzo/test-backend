import { areRequiredParamsValid, isObjectEmpty } from '../utils/helpers';
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
      imageActions.getImageUrl(imgUrl)
        .then((newImgUrl) => {
          imageActions.getImageUrl(songUrl)
            .then((newSongUrl) => {
              songFunctions.create({ ...song, imgUrl: newImgUrl || song.imgUrl, songUrl: newSongUrl || song.songUrl })
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

export default {
  createSong,
};
