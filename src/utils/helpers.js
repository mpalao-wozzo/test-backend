export const cleanSearchText = (text) =>
  text
    .replace(/a|á/g, '[aá]')
    .replace(/e|é/g, '[eé]')
    .replace(/i|í/g, '[ií]')
    .replace(/o|ó/g, '[oó]')
    .replace(/u|ú/g, '[uú]');

export const isBoolean = (elem) => 'boolean' === typeof elem;
export const isFunction = (elem) => 'function' === typeof elem;

/**
 * This function will check the sent object against the mongoose model required fields and validate the object.
 * @param {object} object to validate
 * @param {model}  model Mongoose model
 * @returns true if valid, false if invalid
 */

export const areRequiredParamsValid = (object, model) => {
  let valid = true;
  Object.keys(model?.schema?.obj).forEach((key) => {
    if (!!model?.schema?.obj[key]?.required && model.schema.obj[key].default === undefined) {
      valid = null !== object[key] && object[key] !== undefined ? true && valid : false;
    }
  });
  return valid;
};

/**
 * This function will check if the sent object is empty.The object will be empty if it is null, undefined or {}.
 * @param {object} object to validate
 * @returns true if empty, false if not empty
 */

export const isObjectEmpty = (object) => !(object && Object.keys(object).length);
