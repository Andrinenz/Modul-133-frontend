/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* notificationSlice                                                          */
/*----------------------------------------------------------------------------*/

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  reducers: {
    addSuccessNotification: (state, { payload }) => {
      state.notifications.push({
        type: 'success',
        description: payload.description,
        message: payload.message,
      });
    },
    addErrorNotification: (state, { payload }) => {
      state.notifications.push({
        type: 'error',
        description: payload.description,
        message: payload.message,
      });
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { addSuccessNotification, addErrorNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
