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
    buttonLoading: false,
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
    setButtonLoading: (state, { payload }) => {
      state.buttonLoading = payload;
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
export const { setAccessToken, setButtonLoading, setUser, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
