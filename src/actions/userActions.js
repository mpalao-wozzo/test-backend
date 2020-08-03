import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import userModel from '../models/user';
import baseFunctionsGenerator from './base/baseFunctions';
import { refreshTokenActions, userRoleActions } from '.';
import { WRONG_PARAMS, ROLE_SUPERADMIN } from '../utils/constants';
import { cleanSearchText } from '../utils/helpers';

const saltRounds = 10;
const userFunctions = baseFunctionsGenerator(userModel);

const userActions = {
  ...userFunctions,
};

const createUser = (user) =>
  new Promise((resolve, reject) => {
    if (!user || !user.name || !user.lastName || !user.email || !user.password) {
      reject(WRONG_PARAMS);
    } else {
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          userFunctions.create({ ...user, password: hash })
            .then((createdUser) => {
              resolve(createdUser);
            })
            .catch((createUserErr) => {
              reject(createUserErr);
            });
        }
      });
    }
  });

const updateUser = (user) =>
  new Promise((resolve, reject) => {
    if (!user || !user._id || !user.name || !user.lastName || !user.email || !user.password) {
      reject(WRONG_PARAMS);
    } else {
      userFunctions.update(user._id, user)
        .then((updatedUser) => {
          resolve(updatedUser);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

const updateUserLastLogin = (userId) => userFunctions.update(userId, { lastLogin: new Date() });

const autologin = (user) =>
  new Promise((resolve, reject) => {
    if (!user || !user._id) {
      reject(new AuthenticationError('User not found'));
    } else {
      const { _id } = user;
      userFunctions
        .findById(_id)
        .populate('userRoleId')
        .then((dbUser) => {
          if (!dbUser || !dbUser.active) {
            reject(new AuthenticationError('User not found'));
          }
          updateUserLastLogin(_id)
            .then(() => {
              resolve(dbUser);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });

const loginError = new AuthenticationError('Wrong email or password');

/**
 * User login
 * @param {*} email
 * @param {*} password
 */
const login = (email, password) =>
  new Promise((resolve, reject) => {
    if (!email || !password) {
      reject(loginError);
    } else {
      userFunctions
        .findOneByQuery({ email, deleted: false })
        .populate('userRoleId')
        .then((user) => {
          if (user && user.active) {
            // Check if passwords are correct
            const passwordsMatch = bcrypt.compareSync(password, user.password); // eslint-disable-line
            if (passwordsMatch) {
              // create the new token
              refreshTokenActions
                .getUserRefreshToken(user._doc)
                .then(({ expiryDate, myToken, refreshToken }) => {
                  user._doc.lastLogin = new Date();

                  updateUserLastLogin(user._id)
                    .then(() => {
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
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              // passwords did not match
              reject(loginError);
            }
          } else if (user) {
            // inactive user
            reject(new AuthenticationError('User inactive'));
          } else {
            reject(loginError);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });

const changePassword = (id, oldPassword, newPassword) =>
  new Promise((resolve, reject) => {
    // check the user
    userActions
      .findById(id)
      .then((user) => {
        if (!user) {
          reject(new AuthenticationError('User not found'));
        } else {
          // check the old password with the dbpassword
          bcrypt.compare(oldPassword, user.password, (err, same) => {
            if (err) {
              reject(err);
            } else if (same) {
              // change the password
              bcrypt.hash(newPassword, saltRounds, (encryptErr, encrypted) => {
                if (encryptErr) {
                  reject(encryptErr);
                } else {
                  userActions.update(id, { password: encrypted })
                    .then(() => {
                      resolve('Password changed');
                    })
                    .catch((updateErr) => {
                      reject(updateErr);
                    });
                }
              });
            } else {
              reject(new AuthenticationError('Changing password error'));
            }
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const generatePassword = (userId, newPassword) =>
  new Promise((resolve, reject) => {
    // check the user
    userActions
      .findById(userId)
      .populate('userRoleId')
      .then((user) => {
        if (!user) {
          reject(new AuthenticationError('User not found'));
        } else {
          // hash the new password
          bcrypt.hash(newPassword, saltRounds, (encryptErr, encrypted) => {
            if (encryptErr) {
              reject(encryptErr);
            } else {
              // update the user
              userActions.update(userId, { password: encrypted })
                .then(() => {
                  resolve('Password changed');
                })
                .catch((updateErr) => {
                  reject(updateErr);
                });
            }
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const findFiltered = ({ _id, fullName, email, userRoleId, active, deleted }, superadminRole) =>
  new Promise((resolve, reject) => {
    const params = {};

    if (fullName) {
      params.fullName = { $regex: cleanSearchText(fullName), $options: 'i' };
    }
    if (email) {
      params.email = { $regex: cleanSearchText(email), $options: 'i' };
    }
    if (superadminRole && !userRoleId) {
      params.userRoleId = { $ne: superadminRole };
    }
    if (_id) {
      params._id = _id;
    }
    if (active || false === active) {
      params.active = active;
    }
    if (deleted || false === deleted) {
      params.deleted = deleted;
    }

    userFunctions.findByQuery(params)
      .then((users) => {
        resolve(users);
      }).catch((error) => {
        reject(error);
      });
  });

const findForAdmin = (args) => new Promise((resolve, reject) => {
  userRoleActions.findOneByQuery({ name: ROLE_SUPERADMIN })
    .then((superadminRole) => {
      resolve(findFiltered(args, superadminRole));
    }).catch((error) => {
      reject(error);
    });
});

export default {
  ...userActions,
  autologin,
  login,
  createUser,
  changePassword,
  generatePassword,
  updateUser,
  findFiltered,
  findForAdmin,
};
