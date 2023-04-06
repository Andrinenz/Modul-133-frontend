/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from "@reduxjs/toolkit";

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
  name: "card",
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
    updateCardById: (state, { payload }) => {
      state.cardByUser = state.cardByUser.map((card) => {
        if (card.id === payload.id) {
          card.choosedSize = payload.choosedSize;
          card.itemCount = payload.itemCount;
          card.isArchived = payload.isArchived;
        }
        return card;
      });
    },
    reset: (state, { payload }) => {
      return { ...initialState };
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { setCards, updateCardById, setCardsbyUser, addCard, reset } =
  cardSlice.actions;

export default cardSlice.reducer;
