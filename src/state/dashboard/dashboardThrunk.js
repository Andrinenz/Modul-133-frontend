/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios';
import {
  setOrders,
  setUsers,
  upateUserById,
  updateOrderById,
} from './dashboardSlice';
import {
  addErrorNotification,
  addSuccessNotification,
} from '../notification/notificationSlice.js';

/*----------------------------------------------------------------------------*/
/* dashboardThrunk                                                            */
/*----------------------------------------------------------------------------*/

// Users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/user/getUsers');

      if (res.data.result) {
        dispatch(setUsers(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateUser = (obj) => {
  return async (dispatch) => {
    try {
      if (!obj.id) {
        return dispatch(
          addErrorNotification({
            message: 'Error',
            description: 'No Id given to update user',
          })
        );
      }

      const res = await axiosAuth.patch('/api/user/updateById', obj);

      if (res.status === 200) {
        dispatch(upateUserById(obj));
        dispatch(fetchUsers());
        dispatch(
          addSuccessNotification({
            message: 'OK',
            description: 'User Updated successfully',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//Orders

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/order/allOrders');

      if (res.data.result) {
        dispatch(setOrders(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateOrder = (obj) => {
  return async (dispatch) => {
    try {
      if (!obj.id) {
        return dispatch(
          addErrorNotification({
            message: 'Error',
            description: 'No Id given to update user',
          })
        );
      }

      delete obj.title;
      delete obj.description;
      delete obj.price;
      delete obj.image;
      delete obj.stock;

      const res = await axiosAuth.patch('/api/order/updateOrderById', obj);

      if (res.status === 200) {
        dispatch(updateOrderById(obj));
        dispatch(fetchOrders());
        dispatch(
          addSuccessNotification({
            message: 'OK',
            description: 'Order Updated successfully',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
