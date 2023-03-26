/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios';
import { fetchCardsFromUser } from '../card/cardThrunk';
import { reset } from '../newOrder/newOrderSlice';
import { addSuccessNotification } from '../notification/notificationSlice';
import {
  addOrder,
  deleteOrder,
  setOrderById,
  setOrders,
  setOrdersByUser,
  updateOrderById,
} from './orderSlice.js';

/*----------------------------------------------------------------------------*/
/* orderThrunk                                                                */
/*----------------------------------------------------------------------------*/

export const fetchOrdersData = () => {
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

export const fetchUserOrders = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/order/ordersFromUser');

      if (res.data.result) {
        dispatch(setOrdersByUser(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchOrderById = (id) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get(`/api/order/getOrderById?id=${id}`);

      if (res.data.result) {
        dispatch(setOrderById(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCreateOrder = (orderObj, navigate) => {
  return async (dispatch) => {
    try {
      console.log(orderObj);
      let res = await axiosAuth.post('/api/order/createOrder', orderObj);

      if (res.status === 201) {
        dispatch(addOrder(res.data));
        navigate(`/orderDone/${res.data.id}`);
        dispatch(
          addSuccessNotification({
            message: 'OK',
            description: 'Order successfully created',
          })
        );
        dispatch(fetchCardsFromUser());
        setTimeout(() => {
          dispatch(reset());
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateOrder = (orderObj) => {
  return async (dispatch) => {
    try {
      if (!orderObj.id) {
        console.log('No id given');
      }

      const fields = [
        'firstname',
        'lastname',
        'email',
        'address',
        'apartementNumber',
        'country',
        'plz',
        'sentToShippingCompany',
        'ItemId',
      ];

      let valid = true;
      Object.keys(orderObj).forEach((key) => {
        if (!fields.includes(key)) {
          valid = false;
        }
      });
      if (valid) {
        return console.log('Field not possible to update order');
      }

      const res = await axiosAuth.patch('/api/order/updateOrderById', orderObj);

      if (res.status === 200) {
        dispatch(updateOrderById(orderObj));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteOrder = (id) => {
  return async (dispatch) => {
    try {
      await axiosAuth.delete('/api/order/deleteOrder', { data: { id } });

      dispatch(deleteOrder({ id }));
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
