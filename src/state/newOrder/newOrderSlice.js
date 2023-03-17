/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* newOrderSlice                                                              */
/*----------------------------------------------------------------------------*/

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  address: '',
  apartementNumber: '',
  plz: '',
  country: '',
  state: '',
  city: '',
  paymentMethod: '',
  cardHolder: '',
  cardNumber: '',
  cvv: '',
  cardExpiryDate: '',
};

export const newOrderSlice = createSlice({
  name: 'createOrder',
  initialState: { ...initialState },
  reducers: {
    setOrderInfo: (state, { payload }) => {
      state[payload.target] = payload;
    },
    reset: (state, { payload }) => {
      return { ...initialState };
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setOrderInfo, reset } = newOrderSlice.actions;

export default newOrderSlice.reducer;
