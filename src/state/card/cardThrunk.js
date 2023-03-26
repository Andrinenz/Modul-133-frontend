/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from '../../helpers/axios';
import { setCardsbyUser } from './cardSlice';

/*----------------------------------------------------------------------------*/
/* cardThrunk                                                                 */
/*----------------------------------------------------------------------------*/

export const fetchCardsFromUser = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get('/api/card/getCardFromUser');

      if (res.data.result) {
        dispatch(setCardsbyUser(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
