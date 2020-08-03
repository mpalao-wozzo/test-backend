export const cleanSearchText = (text) =>
  text
    .replace(/a|á/g, '[aá]')
    .replace(/e|é/g, '[eé]')
    .replace(/i|í/g, '[ií]')
    .replace(/o|ó/g, '[oó]')
    .replace(/u|ú/g, '[uú]');

export const isBoolean = (elem) => 'boolean' === typeof elem;
export const isFunction = (elem) => 'function' === typeof elem;
