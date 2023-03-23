/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* cardSlice                                                                  */
/*----------------------------------------------------------------------------*/

const initialState = {
  loadedCardByUser: false,
  loaded: false,
  cards: [],
  cardByUser: [],
  error: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState: { ...initialState },
  reducers: {
    setCardsbyUser: (state, { payload }) => {
      state.cardByUser = payload;
      state.loadedCardByUser = true;
    },
    setCards: (state, { payload }) => {
      state.cards = payload;
      state.loaded = true;
    },
    addCard: (state, { payload }) => {
      state.cards.push(payload);
    },
    reset: (state, { payload }) => {
      return { ...initialState };
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setCards, setCardsbyUser, addCard, reset } = cardSlice.actions;

export default cardSlice.reducer;
