/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { logoutUser, setAccessToken, setUser } from './userSlice';

import { extractToken } from '../../libs/extractToken.js';

/*----------------------------------------------------------------------------*/
/* userThrunk                                                                 */
/*----------------------------------------------------------------------------*/

export const login = (email, password) => {
  return (dispatch) => {
    extractToken((valid, token, user) => {
      console.log('Extract Token:', valid, user);
      if (token === null || !valid) {
        dispatch(logoutUser());
      }
      if (valid) {
        dispatch(setAccessToken(token));
        dispatch(setUser(user));
      }
    });
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
