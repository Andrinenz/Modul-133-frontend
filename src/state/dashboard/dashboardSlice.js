/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* dashboardSlice                                                             */
/*----------------------------------------------------------------------------*/

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loaded: false,
    loadedUser: false,
    users: [],
    orders: [],
    loadedOrders: false,
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
      state.loadedUser = true;
    },
    setOrders: (state, { payload }) => {
      state.orders = payload;
      state.loadedOrders = true;
    },
    upateUserById: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload.id) {
          user.isAdmin = payload.isAdmin;
          user.firstname = payload.firstname;
          user.lastname = payload.lastname;
          user.email = payload.email;
        }
        return user;
      });
    },
    updateOrderById: (state, { payload }) => {
      state.orders = state.orders.map((order) => {
        if (order.id === payload.id) {
          order.address = payload.address;
          order.firstname = payload.firstname;
          order.lastname = payload.lastname;
          order.apartementNumber = payload.apartementNumber;
          order.state = payload.state;
          order.plz = payload.plz;
          order.country = payload.country;
          order.cardHolder = payload.cardHolder;
          order.cardNumber = payload.cardNumber;
          order.totalAmount = payload.totalAmount;
        }
        return order;
      });
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setUsers, updateOrderById, upateUserById, setOrders } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
