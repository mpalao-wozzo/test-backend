import { format, addDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import refreshTokenModel from '../models/refreshToken';
import baseFunctionsGenerator from './base/baseFunctions';
import { DATE_AND_HOUR_FORMAT } from '../utils/constants';

const refreshTokenFunctions = baseFunctionsGenerator(refreshTokenModel);

const createRefreshToken = (user) =>
  new Promise((resolve, reject) => {
    const refreshToken = jwt.sign(user, process.env.SECRET);

    refreshTokenFunctions
      .create({ userId: user._id, refreshToken })
      .then(() => {
        console.log('RefreshToken Created in database');
        resolve(refreshToken);
      })
      .catch((refreshTokenError) => {
        console.warn(`Error creating refresh Token ${refreshTokenError}`);
        reject(refreshTokenError);
      });
  });

/**
 * Generates a refresh token for a user
 * @param {*} user
 */
const getUserRefreshToken = (user) =>
  new Promise((resolve, reject) => {
    if (!user || !user._id) {
      const error = new Error('Wrong data sent');
      reject(error);
    } else {
      const res = {
        myToken: jwt.sign(user, process.env.SECRET, { expiresIn: '7d' }),
        expiryDate: format(addDays(new Date(), 6), DATE_AND_HOUR_FORMAT),
      };

      // find if user has refresh token, if he has, then send it, if not create a new one
      refreshTokenFunctions
        .findOneByQuery({ userId: user._id })
        .then((foundRefreshToken) => {
          if (foundRefreshToken) {
            res.refreshToken = foundRefreshToken._doc.refreshToken;
            resolve(res);
          } else {
            createRefreshToken(user)
              .then((refreshToken) => {
                res.refreshToken = refreshToken;
                resolve(res);
              })
              .catch((refreshTokenError) => {
                reject(refreshTokenError);
              });
          }
        })
        .catch((refreshTokenError) => {
          console.warn(`Error finding refresh Token ${refreshTokenError}`);
          reject(refreshTokenError);
        });
    }
  });

const refreshAccessToken = (refreshTokenParam) =>
  new Promise((resolve, reject) => {
    refreshTokenFunctions
      .findOneByQuery({ refreshToken: refreshTokenParam })
      .populate({ path: 'userId', populate: 'userRoleId' })
      .then((refreshTokenFound) => {
        // if token was found
        if (refreshTokenFound?._doc?.userId?._doc?.active) {
          // if the user is active and the refresh Token was found, then create a new accessToken
          const { userId: user } = refreshTokenFound._doc;

          getUserRefreshToken(user._doc)
            .then(({ expiryDate, myToken, refreshToken }) => {
              resolve({
                user,
                token: myToken,
                expiryDate,
                refreshToken,
              });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          const error = new Error('jwt expired');
          reject(error);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const refreshTokenActions = {
  ...refreshTokenFunctions,
  getUserRefreshToken,
  refreshAccessToken,
};

export default refreshTokenActions;
