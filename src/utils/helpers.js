export const cleanSearchText = (text) =>
  text
    .replace(/a|á/g, '[aá]')
    .replace(/e|é/g, '[eé]')
    .replace(/i|í/g, '[ií]')
    .replace(/o|ó/g, '[oó]')
    .replace(/u|ú/g, '[uú]');

export const isBoolean = (elem) => 'boolean' === typeof elem;
export const isFunction = (elem) => 'function' === typeof elem;
export const checkIfAllRequiredPropertiesExist = (object, model) => {
  let valid = true;
  Object.keys(model?.schema?.obj).forEach((key) => {
    if (!!model?.schema?.obj[key]?.required && model.schema.obj[key].default === undefined) {
      valid = null !== object[key] && object[key] !== undefined ? true && valid : false;
    }
  });
  return true;
};