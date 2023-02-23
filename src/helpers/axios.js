/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import axios from 'axios';
import { config } from './config';

/*----------------------------------------------------------------------------*/
/* axios                                                                   */
/*----------------------------------------------------------------------------*/

//Get BaseUrl
const { baseUrl } = config;
// For common config
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = baseUrl;

//With Authentication
const axiosAuth = axios.create({});
axiosAuth.interceptors.request.use((config) => {
  const token = `Bearer ${localStorage.getItem('accessToken')}`;
  config.headers.Authorization = token;

  return config;
});

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log('Not Authorized');
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);

const axiosNoAuth = axios.create({});
/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export { axiosAuth, axiosNoAuth };
