/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios.js';
import { setProducts } from './productsSlice.js';

/*----------------------------------------------------------------------------*/
/* productsThrunk                                                             */
/*----------------------------------------------------------------------------*/

export const fetchProductsData = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/items/getItems');

      if (res.data.result) {
        dispatch(setProducts(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProductById = () => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateProduct = () => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCreateProduct = () => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteProduct = () => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
