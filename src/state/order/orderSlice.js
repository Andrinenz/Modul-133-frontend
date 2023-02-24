/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* orderSlice                                                                 */
/*----------------------------------------------------------------------------*/

export const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    loaded: false,
    orders: [],
    orderById: null,
    loadedById: false,
    error: null,
  },
  reducers: {
    setOrders: (state, { payload }) => {
      state.orders = payload;
      state.loaded = true;
    },
    setOrderById: (state, { payload }) => {
      state.orderById = payload;
      state.loadedById = true;
    },
    addOrder: (state, { payload }) => {
      state.orders.push(payload);
    },
    deleteOrder: (state, { payload }) => {
      let { id } = payload;
      state.orders = state.orders.filter((e) => e.id === id);
    },
    updateOrderById: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.orderById[key] = payload[key];
      });
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const {
  deleteOrder,
  addOrder,
  updateOrderById,
  setOrderById,
  setOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
