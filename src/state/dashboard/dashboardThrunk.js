/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios';
import { setUsers, upateUserById } from './dashboardSlice';
import {
  addErrorNotification,
  addSuccessNotification,
} from '../notification/notificationSlice.js';

/*----------------------------------------------------------------------------*/
/* dashboardThrunk                                                            */
/*----------------------------------------------------------------------------*/

// Users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/user/getUsers');

      if (res.data.result) {
        dispatch(setUsers(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateUser = (obj) => {
  return async (dispatch) => {
    try {
      console.log(obj);
      if (!obj.id) {
        return dispatch(
          addErrorNotification({
            message: 'Error',
            description: 'No Id given to update user',
          })
        );
      }

      const res = await axiosAuth.patch('/api/user/updateById', obj);

      if (res.status === 200) {
        dispatch(upateUserById(obj));
        dispatch(fetchUsers());
        dispatch(
          addSuccessNotification({
            message: 'OK',
            description: 'User Upated successfully',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
