/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { CloseOutline } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "../../state/products/productsSelector";
import { fetchProductById } from "../../state/products/productsThrunk";
import "./ItemOverview.scss";

/*----------------------------------------------------------------------------*/
/* ItemOverview                                                                   */
/*----------------------------------------------------------------------------*/

const ItemOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams("id");

  const { productById, loadedById } = useSelector(getProduct);

  useEffect(() => {
    dispatch(fetchProductById(parseInt(id)));
  }, [dispatch]);

  console.log(productById);

  return (
    <>
      {loadedById ? (
        <div className="maincontent">
          <div className="close">
            <CloseOutline size={"22"} />
          </div>
          <div className="picture">picture</div>
          <div className="title">
            zb Zalando
            <div className="description">Bla bla bla bla bla bla</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ItemOverview;
