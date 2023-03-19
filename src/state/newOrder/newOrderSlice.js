/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* newOrderSlice                                                              */
/*----------------------------------------------------------------------------*/

const initialState = {
  firstname: { value: '', invalid: null, invalidText: '' },
  lastname: { value: '', invalid: null, invalidText: '' },
  email: { value: '', invalid: null, invalidText: '' },
  address: { value: '', invalid: null, invalidText: '' },
  apartementNumber: { value: '', invalid: null, invalidText: '' },
  plz: { value: '', invalid: null, invalidText: '' },
  country: { value: '', invalid: null, invalidText: '' },
  state: { value: '', invalid: null, invalidText: '' },
  city: { value: '', invalid: null, invalidText: '' },
  paymentMethod: { value: '', invalid: null, invalidText: '' },
  cardHolder: { value: '', invalid: null, invalidText: '' },
  cardProvider: { value: '', invalid: null, invalidText: '' },
  cardNumber: { value: '', invalid: null, invalidText: '' },
  cvc: { value: '', invalid: null, invalidText: '' },
  cardExpiryDate: { value: '', invalid: null, invalidText: '' },
};

export const newOrderSlice = createSlice({
  name: 'createOrder',
  initialState: { ...initialState },
  reducers: {
    setOrderInfo: (state, { payload }) => {
      state[payload.target].value = payload.value;
    },
    setOrderValidation: (state, { payload }) => {
      state[payload.target].invalid = payload.invalid;
      state[payload.target].invalidText = payload.invalidText;
    },
    reset: (state, { payload }) => {
      return { ...initialState };
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setOrderInfo, reset, setOrderValidation } =
  newOrderSlice.actions;

export default newOrderSlice.reducer;
