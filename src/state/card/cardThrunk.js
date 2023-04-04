/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from "../../helpers/axios";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../notification/notificationSlice";
import { addCard, setCardsbyUser } from "./cardSlice";

/*----------------------------------------------------------------------------*/
/* cardThrunk                                                                 */
/*----------------------------------------------------------------------------*/

export const fetchCardsFromUser = () => {
  return async (dispatch) => {
    try {
      let res = await axiosAuth.get("/api/card/getCardFromUser");

      if (res.data.result) {
        dispatch(setCardsbyUser(res.data.result));
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCreateCard = (obj) => {
  return async (dispatch) => {
    try {
      if (!obj.ItemId) {
        dispatch(
          addErrorNotification({
            message: "Error",
            description: "No Id given",
          })
        );
      }

      let res = await axiosAuth.post("/api/card/createCard");

      if (res.status === 200) {
        dispatch(
          addSuccessNotification({
            message: res.statusText,
            description: "Successfully added to card",
          })
        );
        dispatch(addCard(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
