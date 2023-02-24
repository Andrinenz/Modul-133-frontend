/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios';
import {
  addReview,
  deleteReview,
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

      const fields = ['rating', 'comment'];

      let valid = true;
      Object.keys(reviewObj).forEach((key) => {
        if (!fields.includes(key)) {
          valid = false;
        }
      });
      if (valid) {
        return console.log('Field not possible to update order');
      }

      const res = await axiosAuth.patch('/api/rating/updateById', reviewObj);

      if (res.status === 200) {
        dispatch(updateReviewById(reviewObj));
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
