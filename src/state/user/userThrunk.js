/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import {
  getProfile,
  logoutUser,
  setAccessToken,
  setButtonLoading,
  setProfile,
  setUser,
} from './userSlice';
import { addErrorNotification } from '../notification/notificationSlice.js';
import validator from 'validator';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { axiosAuth } from '../../helpers/axios';
import { config } from '../../helpers/config';

/*----------------------------------------------------------------------------*/
/* userThrunk                                                                 */
/*----------------------------------------------------------------------------*/
const extractToken = async (email, password, start, navigate, dispatch) => {
  if (!start) {
    dispatch(setButtonLoading(true));
    let res = await axios
      .post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password,
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(
            addErrorNotification({
              message: 'Error',
              description: 'Wrong Email or password entered',
            })
          );
          dispatch(setButtonLoading(false));
        }
      });

    if (res.data.token) {
      let token = res.data.token;

      if (token !== null && validator.isJWT(token)) {
        localStorage.setItem('accessToken', token);
        let decodedUser = jwtDecode(token);
        return { valid: true, token: token, user: decodedUser };
      }
    } else {
      dispatch(setButtonLoading(false));
      return { valid: false, token: null, user: null };
    }
    dispatch(setButtonLoading(false));
  } else {
    let localStorageToken = localStorage.getItem('accessToken');
    if (
      localStorageToken !== null &&
      validator.isJWT(localStorage.getItem('accessToken'))
    ) {
      let decodedUser = jwtDecode(localStorageToken);
      if (
        decodedUser !== null &&
        decodedUser.exp > new Date().getTime() / 1000
      ) {
        return { valid: true, token: localStorageToken, user: decodedUser };
      }
      console.log('token abgelaufen', localStorageToken);
      dispatch(setButtonLoading(false));
      return { valid: false, token: null, user: null };
    } else {
      return { valid: false, token: null, user: null };
    }
  }
};

export const login = (email, password, start, navigate, dispatch2) => {
  return async (dispatch) => {
    let data = await extractToken(email, password, start, navigate, dispatch2);

    if (data.token === null || !data.valid) {
      dispatch(logoutUser());
    }

    dispatch(setButtonLoading(false));

    if (data.valid) {
      dispatch(setAccessToken(data.token));
      dispatch(setUser(data.user));
      dispatch(navigate('/products'));
    }
  };
};

export const fetchCreateUser = (obj, navigate) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.post('/api/auth/createUser', obj);

      if (res.status === 201) {
        if (res.data.token) {
          let token = res.data.token;

          if (token !== null && validator.isJWT(token)) {
            localStorage.setItem('accessToken', token);
            let decodedUser = jwtDecode(token);
            dispatch(logoutUser());
            dispatch(setUser(decodedUser));
            dispatch(setAccessToken(res.data.token));
            dispatch(navigate('/products'));
          }
        } else {
          dispatch(
            addErrorNotification({
              message: 'Error',
              description: 'Failed while creating user',
            })
          );
        }
      }
    } catch (err) {}
  };
};

export const fetchUserProfile = (id) => {
  return async (dispatch) => {
    dispatch(getProfile());
    try {
      const res = await axiosAuth.get(`/api/user/getUserById?id=${id}`);
      dispatch(setProfile(res.data.result));
    } catch (err) {
      dispatch(
        addErrorNotification({
          message: 'Error',
          description: err.toString(),
        })
      );
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
