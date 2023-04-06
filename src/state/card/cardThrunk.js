/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { axiosAuth } from "../../helpers/axios";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../notification/notificationSlice";
import { addCard, setCardsbyUser, updateCardById } from "./cardSlice";

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

export const fetchUpdateCardById = (obj, title) => {
  return async (dispatch) => {
    try {
      if (!obj.id) {
        dispatch(
          addErrorNotification({
            message: "Error",
            description: "No Id given",
          })
        );
      }

      const fields = ["itemCount", "choosedSize", "isArchived"];

      let valid = true;
      Object.keys(obj).forEach((key) => {
        if (!fields.includes(key)) {
          valid = false;
        }
      });
      if (valid) {
        return console.log("Field not possible to update order");
      }

      console.log(obj);

      const res = await axiosAuth.patch("/api/card/updateCardById", obj);

      if (res.status === 200) {
        dispatch(updateCardById(obj));
        dispatch(fetchCardsFromUser());
        dispatch(
          addSuccessNotification({
            message: "OK",
            description: `Item ${title} updated successfully`,
          })
        );
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

      let res = await axiosAuth.post("/api/card/createCard", obj);

      if (res.status === 201) {
        dispatch(
          addSuccessNotification({
            message: res.statusText,
            description: "Successfully added to card",
          })
        );
        dispatch(addCard(res.data.result));
        dispatch(fetchCardsFromUser());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
