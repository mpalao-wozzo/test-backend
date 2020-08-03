import { uploadStream } from '../utils/amazon';
import { WRONG_PARAMS } from '../utils/constants';

/**
 * Uploads an image and returns the url
 * @param {Object} image
 * @returns url
 */
const uploadImage = (image) =>
  new Promise((resolve, reject) => {
    if (!image || !image.createReadStream || !image.mimetype || !image.filename) {
      const error = new Error('Wrong data sent');
      reject(error);
    } else {
      uploadStream(image)
        .then((url) => {
          resolve(url);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });

/**
 * Will upload the image and if there is no image will resolve to null
 * @param {*} image
 */
const getImageUrl = (image) => new Promise((resolve, reject) => {
  if (!image) {
    resolve();
  } else if (image && 'function' === typeof image.then) {
    image.then((imageObj) => {
      imageActions.uploadImage(imageObj)
        .then((imageUrl) => {
          resolve(imageUrl);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } else {
    reject(WRONG_PARAMS);
  }
});

/**
 * Uploads images and returns an array of urls
 * @param {Array} images
 * @returns object with errors and urls
 */
const uploadImages = (images) =>
  new Promise((resolve, reject) => {
    if (!images || !images.length) {
      const error = new Error('Wrong data sent');
      reject(error);
    } else {
      const response = {
        errors: [],
        urls: [],
      };
      let index = 0;
      images.forEach((image) => {
        getImageUrl(image)
          .then((url) => {
            index++;
            response.urls.push(url);
            if (index === images.length) {
              resolve(response);
            }
          })
          .catch((err) => {
            index++;
            response.errors.push(err);
            if (index === images.length) {
              resolve(response);
            }
          });
      });
    }
  });

const imageActions = {
  getImageUrl,
  uploadImage,
  uploadImages,
};

export default imageActions;
