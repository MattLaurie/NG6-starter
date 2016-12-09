import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

import {environment} from 'environment';

export class AuthService {
  constructor($q) {
    "ngInject";
    this.$q = $q;
    this.redirectState = undefined;
  }

  setRedirectState(state) {
    this.redirectState = state;
  }

  getRedirectState() {
    return this.redirectState;
  }

  /**
   * Configure the authentication.  This will find and refresh any credentials founds.
   *
   * @returns {Function}
   */
  configure() {
    AWS.config.region = environment.aws.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.aws.identityPoolId
    });
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.aws.userPoolId,
      ClientId: environment.aws.clientId
    });

    let defer = this.$q.defer();
    let cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          reject(error);
        } else {
          let logins = {};
          const key = `cognito-idp.${environment.aws.region}.amazonaws.com/${environment.aws.userPoolId}`;
          logins[key] = session.getIdToken().getJwtToken();
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.aws.identityPoolId,
            Logins: logins
          });
          AWS.config.credentials.get((error) => {
            if (error) {
              defer.reject(error);
            } else {
              defer.resolve();
            }
          })
        }
      });
    } else {
      console.log('no user');
      defer.reject('no_user');
    }
    return defer.promise;
  }

  /**
   * Check if there is a currently authenticated user.
   *
   * @returns {Function}
   */
  isAuthenticated() {
    let defer = this.$q.defer();
    let cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          defer.resolve(false);
        } else {
          defer.resolve(true);
        }
      });
    } else {
      defer.resolve(false);
    }
    return defer.promise;
  }

  /**
   * Sign in a user.
   *
   * @param email
   * @param password
   * @returns {Function}
   */
  signin(email, password) {
    console.log('AWS.config.region', AWS.config.region);
    let defer = this.$q.defer();
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });
    let cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        let logins = [];
        const key = `cognito-idp.${environment.aws.region}.amazonaws.com/${environment.aws.userPoolId}`;
        logins[key] = result.getIdToken().getJwtToken();
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: environment.aws.identityPoolId,
          Logins: logins
        });
        AWS.config.credentials.refresh(() => {
          defer.resolve(result);
        });
      },
      onFailure: (error) => {
        defer.reject(error);
      }
    });
    return defer.promise;
  }

  /**
   * Sign out a user.
   *
   * @returns {Function}
   */
  signout() {
    return this._currentCognitoUser()
      .then(cognitoUser => {
        cognitoUser.signOut();
      });
  }

  // --

  /**
   * Register a new user.  A confirmation code will be sent to the email address.  The user will need to present
   * that code to confirmUser before we will allow them into the system.
   *
   * @param email
   * @param password
   * @returns {Function}
   */
  registerUser(email, password) {
    let defer = this.$q.defer();
    let attributes = [];
    attributes.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    );
    this.userPool.signUp(email, password, attributes, null, (error, result) => {
      if (error) {
        defer.reject(error);
      } else {
        defer.resolve()
      }
    });
    return defer.promise;
  }

  /**
   * Confirm a new user.  The user needs to present the code sent to their email during registerUser.
   *
   * @param email
   * @param code
   * @returns {Function}
   */
  confirmUser(email, code) {
    let defer = this.$q.defer();
    console.log('confirmUser: email=' + email + ', code=' + code);
    console.log('confirmUser: credentials', AWS.config.credentials);
    let cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    console.log('confirmUser: cognitoUser', cognitoUser);
    cognitoUser.confirmRegistration(code, true, (error, result) => {
      if (error) {
        defer.reject(error);
      } else {
        defer.resolve();
      }
    });
    return defer.promise;
  }

  /**
   * Resend the new user confirmation code to the email.
   *
   * @param email
   * @returns {Function}
   */
  confirmUserResendCode(email) {
    let defer = this.$q.defer();
    let cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    cognitoUser.resendConfirmationCode((error, result) => {
      if (error) {
        defer.reject(error);
      } else {
        defer.resolve();
      }
    });
    return defer.promise;
  }

  // --

  /**
   * Change the password of the current user.
   *
   * @param oldPassword
   * @param newPassword
   * @returns {Function}
   */
  changePassword(oldPassword, newPassword) {
    let defer = this.$q.defer();
    this._currentCognitoUser()
      .then(cognitoUser => {
        cognitoUser.changePassword(oldPassword, newPassword, (error, result) => {
          if (error) {
            defer.reject(error);
          } else {
            defer.resolve();
          }
        })
      })
      .catch(error => defer.reject(error));
    return defer.promise;
  }

  /**
   * Initiate the forgot password flow.  This will send the user a code to use to reset their password.
   *
   * @param email
   * @returns {Function}
   */
  forgotPassword(email) {
    let defer = this.$q.defer();
    let cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
      },
      onFailure: (error) => {
        defer.reject(error);
      },
      inputVerificationCode: () => {
        defer.resolve();
      }
    });
    return defer.promise;
  }

  /**
   * Reset the user password with the code from forgot password flow.
   *
   * @param email
   * @param code
   * @param password
   * @returns {Function}
   */
  resetPassword(email, code, password) {
    let defer = this.$q.defer();
    let cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    cognitoUser.confirmPassword(code, password, {
      onSuccess: (result) => {
        defer.resolve();
      },
      onFailure: (error) => {
        defer.reject(error);
      }
    });
    return defer.promise;
  }

  // --

  /**
   * Retrieve the current user authentication token.  This is to be used when communicating with other Amazon services.
   *
   * @returns {Promise.<string>|*}
   */
  token() {
    return this._currentCognitoSession()
      .then(session => session.getIdToken().getJwtToken());
  }

  /**
   * Retrieve the current user attributes.
   *
   * @returns {Function}
   */
  profile() {
    let defer = this.$q.defer();
    this._currentCognitoUser()
      .then(cognitoUser => {
        cognitoUser.getUserAttributes((error, result) => {
          if (error) {
            defer.reject(error);
          } else {

            let profile = {};
            result.map(value => profile[value.Name] = value.Value);
            defer.resolve(profile);
          }
        });
      })
      .catch(error => defer.reject(error));
    return defer.promise;
  }

  profileMerge(profile) {
    let defer = this.$q.defer();
    this._currentCognitoUser()
      .then(cognitoUser => {
        let updates = [];
        const keys = Object.keys(profile);
        for (let i in keys) {
          const name = keys[i];
          const value = profile[keys[i]];
          if (profile[name] !== null || profile[name] !== undefined) {
            const attribute = new CognitoUserAttribute({
              Name: name,
              Value: value
            });
            updates.push(attribute);
          }
        }
        if (updates.length > 0) {
          cognitoUser.updateAttributes(updates, (error, result) => {
            if (error) {
              defer.reject(error);
            } else {
              defer.resolve();
            }
          })
        } else {
          defer.resolve();
        }
      });
    return defer.promise;
  }

  /**
   * Retrieve the list of devices for the current user.  If the passed limit is less than total number of devices a
   * pagination token will be returned to retrieve the next page of data.
   *
   * Note paginationToken should initially be null.
   *
   * @param limit
   * @param paginationToken
   */
  devices(limit, paginationToken) {
    let defer = this.$q.defer();
    this._currentCognitoUser()
      .then(cognitoUser => {
        cognitoUser.listDevices(limit, paginationToken || null, {
          onSuccess: (result) => {
            defer.resolve(result.Devices);
          },
          onFailure: (error) => {
            defer.reject(error);
          }
        })
      })
      .catch(error => defer.reject(error));
    return defer.promise;
  }

  // --

  /**
   * Helper method to retrieve the current CognitoUser.
   *
   * @returns {Function}
   * @private
   */
  _currentCognitoUser() {
    let defer = this.$q.defer();
    let cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          defer.reject('no_session');
        } else {
          defer.resolve(cognitoUser);
        }
      });
    } else {
      defer.reject('no_user');
    }
    return defer.promise;
  }

  /**
   * Helper method to retrieve the current Cognito session.
   *
   * ```
   * {
   *   accessToken: {
   *     jwtToken: '...'
   *   },
   *   idToken: {
   *     jwtToken: '...'
   *   },
   *   refreshToken: {
   *     jwtToken: '...'
   *   }
   * }
   * ```
   *
   * @returns {Function}
   * @private
   */
  _currentCognitoSession() {
    let defer = this.$q.defer();
    let cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          defer.reject('no_session');
        } else {
          defer.resolve(session);
        }
      });
    } else {
      defer.reject('no_user');
    }
    return defer.promise;
  }
}
