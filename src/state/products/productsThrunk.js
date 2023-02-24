/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios.js';
import {
  setProducts,
  setProductById,
  updateProductById,
  addProduct,
  deleteProduct,
} from './productsSlice.js';

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

export const fetchProductById = (id) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get(`/api/items/getItemById?id=${id}`);

      if (res.data.result) {
        dispatch(setProductById(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateProduct = (productObj) => {
  return async (dispatch) => {
    try {
      if (!productObj.id) {
        console.log('No id given');
      }

      const fields = ['title', 'image', 'price', 'description', 'itemsInStock'];

      let valid = true;
      Object.keys(productObj).forEach((key) => {
        if (!fields.includes(key)) {
          valid = false;
        }
      });
      if (valid) {
        return console.log('Field not possible to update order');
      }

      const res = await axiosAuth.patch('/api/items/updateById', productObj);

      if (res.status === 200) {
        dispatch(updateProductById(productObj));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCreateProduct = (productObj) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.post('/api/items/createItem', productObj);

      if (res.status === 201) {
        dispatch(addProduct(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axiosAuth.delete('/api/items/deleteById', { data: { id } });

      dispatch(deleteProduct({ id }));
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
