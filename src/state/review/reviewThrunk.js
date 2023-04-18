/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios';
import { addSuccessNotification } from '../notification/notificationSlice';
import {
  addReview,
  deleteReview,
  setReviewByItem,
  setReviews,
  setReviewsByUser,
  updateReviewById,
} from './reviewSlice';

/*----------------------------------------------------------------------------*/
/* reviewThrunk                                                               */
/*----------------------------------------------------------------------------*/

export const fetchReviewbyId = (id) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get(`/api/rating/ratingByUser?id=${id}`);

      if (res.data.result) {
        dispatch(setReviewsByUser(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchReviewByItem = (id) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get(`/api/rating/ratingByItem?id=${id}`);

      if (res.data.result) {
        dispatch(setReviewByItem(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchReviewsData = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/rating/allRatings');

      if (res.data.result) {
        dispatch(setReviews(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateReview = (reviewObj) => {
  return async (dispatch) => {
    try {
      if (!reviewObj.id) {
        console.log('No id given');
      }
      /* 
      console.log(reviewObj);

      const fields = ['rating', 'id'];

      let valid = true;
      Object.keys(reviewObj).forEach((key) => {
        if (!fields.includes(key)) {
          valid = false;
        }
      });
      if (valid) {
        return console.log('Field not possible to update rating');
      } */

      const res = await axiosAuth.patch('/api/rating/updateById', reviewObj);

      if (res.status === 200) {
        dispatch(updateReviewById(reviewObj));
        dispatch(
          addSuccessNotification({
            message: 'OK',
            description: 'Rating successfully updated',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCreateReview = (reviewObj) => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.post('/api/rating/createRating', reviewObj);

      if (res.data.result) {
        dispatch(addReview(reviewObj));
        dispatch(
          addSuccessNotification({
            message: 'OK',
            description: 'Rating successfully created',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteReview = (id) => {
  return async (dispatch) => {
    try {
      await axiosAuth.delete('/api/rating/deleteRating', { data: { id } });

      dispatch(deleteReview({ id }));
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
