/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* reviewSlice                                                                */
/*----------------------------------------------------------------------------*/

export const reviewsSlice = createSlice({
  name: 'review',
  initialState: {
    loaded: false,
    loadedByUser: false,
    reviews: [],
    reviewsByUser: [],
    error: null,
  },
  reducers: {
    setReviews: (state, { payload }) => {
      state.reviews = payload;
      state.loaded = true;
    },
    setReviewsByUser: (state, { payload }) => {
      state.reviewsByUser = payload;
      state.loadedByUser = true;
    },
    addReview: (state, { payload }) => {
      state.reviews.push(payload);
    },
    updateReviewById: (state, { payload }) => {},
    deleteReview: (state, { payload }) => {
      let { id } = payload;
      state.reviews = state.reviews.filter((e) => e.id === id);
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const {
  updateReviewById,
  deleteReview,
  addReview,
  setReviews,
  setReviewsByUser,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
