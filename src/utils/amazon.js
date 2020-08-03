import AWS from 'aws-sdk';
import sharp from 'sharp';
import { v4 } from 'uuid';
import { WRONG_PARAMS } from './constants';

const awsOptions = {
  s3bucket: null,
  SES: null,
};

export const setAmazonConfig = () => {
  const options = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  };
  awsOptions.s3bucket = new AWS.S3(options);
  awsOptions.SES = new AWS.SES(options);
};

export const getAmazonConfig = () => awsOptions;

const generateShort = () => v4().replace(/-/g, '');

const S3URL = 'https://s3.amazonaws.com';
const PUBLIC_READ = 'public-read';
const CACHE_CONTROL = 'public,max-age=604800';

/**
 * This will receive a buffer and upload it to s3 with the name specified
 * @param {*} newFileName New filename used with the filetype
 * @param {*} fileType File type like jpg or png
 * @param {*} data Buffer
 * @param {*} bucketName
 */
export const uploadToS3 = (newFileName, fileType, data, bucketName) =>
  new Promise((resolve, reject) => {
    if (!newFileName || !fileType || !data || !bucketName) {
      reject(WRONG_PARAMS);
    } else {
      const s3Params = {
        Bucket: bucketName,
        Key: newFileName,
        Expires: 60, // expire after 60 mins
        ContentType: fileType,
        ACL: PUBLIC_READ,
        Body: data,
        CacheControl: CACHE_CONTROL,
      };

      awsOptions.s3bucket.putObject(s3Params, (error) => {
        if (error && error.code) {
          reject(error);
        } else {
          resolve(`${S3URL}/${bucketName}/${newFileName}`);
        }
      });
    }
  });

/**
 * This function creates a buffer from the stream sent and will upload it to s3
 * @param {Object} { createReadStream, mimetype, filename }
 * @returns url for the object
 */
export const uploadStream = ({ createReadStream, mimetype, filename }) =>
  new Promise((resolve, reject) => {
    if (!createReadStream || !mimetype || !filename) {
      reject(new Error('Wrong data sent'));
    }
    const bufferStream = [];
    const stream = createReadStream();

    stream.on('data', (data) => {
      bufferStream.push(data);
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('end', () => {
      const buffer = Buffer.concat(bufferStream);
      const fileType = mimetype.split('/')[1];
      const bucketName = process.env.S3_BUCKET_IMAGES;
      const newFileName = `${generateShort() + generateShort()}.${fileType}`;

      const isPng = fileType.includes('png');
      const func = isPng ? 'png' : 'jpeg';
      if (isPng || fileType.includes('jpg') || fileType.includes('jpeg')) {
        sharp(buffer)[func](isPng ? { compressionLevel: 9 } : { quality: 30 })
          .toBuffer()
          .then((data) => {
            uploadToS3(newFileName, fileType, data, bucketName)
              .then((url) => {
                resolve(url);
              })
              .catch((uploadToS3Err) => {
                reject(uploadToS3Err);
              });
          })
          .catch((sharpErr) => {
            reject(sharpErr);
          });
      } else {
        reject(new Error('Wrong File Type'));
      }
    });
  });
