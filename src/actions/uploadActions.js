import { uploadStream } from '../utils/amazon';
import { WRONG_PARAMS } from '../utils/constants';

/**
 * Uploads an element and returns the url
 * @param {Object} element
 * @returns url
 */
const uploadElement = (element) =>
  new Promise((resolve, reject) => {
    if (!element || !element.createReadStream || !element.mimetype || !element.filename) {
      const error = new Error('Wrong data sent');
      reject(error);
    } else {
      uploadStream(element)
        .then((url) => {
          resolve(url);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });

/**
 * Will upload the element and if there is no element will resolve to null
 * @param {*} element
 */
const getUrl = (element) => new Promise((resolve, reject) => {
  if (!element) {
    resolve();
  } else if (element && 'function' === typeof element.then) {
    element.then((elementObj) => {
      uploadActions.uploadElement(elementObj)
        .then((elementUrl) => {
          resolve(elementUrl);
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
        getUrl(image)
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

const uploadActions = {
  getUrl,
  uploadElement,
  uploadImages,
};

export default uploadActions;
