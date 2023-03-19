/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* cardSlice                                                                  */
/*----------------------------------------------------------------------------*/

export const cardSlice = createSlice({
  name: 'card',
  initialState: {
    loadedCardByUser: false,
    loaded: false,
    cards: [],
    cardByUser: [],
    error: null,
  },
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
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setCards, setCardsbyUser, addCard } = cardSlice.actions;

export default cardSlice.reducer;
