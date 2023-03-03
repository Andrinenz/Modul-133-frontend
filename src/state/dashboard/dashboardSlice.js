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
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
      state.loadedUser = true;
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
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setUsers, upateUserById } = dashboardSlice.actions;

export default dashboardSlice.reducer;
