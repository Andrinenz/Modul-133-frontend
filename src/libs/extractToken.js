/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import validator from 'validator';
import jwt_decode from 'jwt-decode';

/*----------------------------------------------------------------------------*/
/* extractToken                                                               */
/*----------------------------------------------------------------------------*/

const extractToken = (callback) => {
  let url_string = window.location.href;
  let url = new URL(url_string);
  let urlToken = url.searchParams.get('token');
  //New Token
  if (urlToken !== null && validator.isJWT(urlToken)) {
    localStorage.setItem('accessToken', urlToken);
    let decodedUser = jwt_decode(urlToken);
    return callback(true, urlToken, decodedUser);
  }
  //Token from storage
  let localStorageToken = localStorage.getItem('accessToken');
  if (
    localStorageToken !== null &&
    validator.isJWT(localStorage.getItem('accessToken'))
  ) {
    let decodedUser = jwt_decode(localStorageToken);
    if (decodedUser !== null && decodedUser.exp > new Date().getTime() / 1000) {
      return callback(true, localStorageToken, decodedUser);
    }
    console.log('token abgelaufen', localStorageToken);
    return callback(false, null, null);
  }
  return callback(false, null, null);
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export { extractToken };
