/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* userSlice                                                                  */
/*----------------------------------------------------------------------------*/

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loaded: false,
    isLoggedIn: false,
    accessToken: '',
    user: null,
  },
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
      state.isLoggedIn = true;
    },
    setUser: (state, { payload }) => {
      let obj = payload;
      delete obj.accessToken;
      delete obj.password;
      delete obj.iat;
      delete obj.exp;

      state.user = payload;
      state.isLoggedIn = true;
      state.loaded = true;
    },
    setUserCreate: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.loaded = true;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.accessToken = '';
      state.user = null;
      state.loaded = true;
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setAccessToken, setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
