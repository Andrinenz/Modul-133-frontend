/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { CloseOutline } from "@carbon/icons-react";
import { Favorite } from "@carbon/icons-react";
import { StarHalf } from "@carbon/icons-react";
import { StarFilled } from "@carbon/icons-react";
import { Image } from "@carbon/icons-react";
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
          <div className="MainPicture">
            <Image />
          </div>
          <div className="SmallPicture1">
            <Image />
          </div>
          <div className="SmallPicture2">
            <Image />
          </div>
          <div className="SmallPicture3">
            <Image />
          </div>
          <div className="PictureTitle">
            <h1>Mona Lisa</h1>
            <div className="PictureAuthor">
              <h3>Author: Picasso</h3>
            </div>
            <div className="PicturePrice">
              <h2>256.-</h2>
            </div>
            <div className="PictureDescription">
              <h4>Nice in the corner next to the TV</h4>
            </div>
            <div className="PictureReview">
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarHalf />
              56
            </div>
            <div className="PictureSizeInfo">we recommend size m</div>
            <div className="PictureSize">
              <label for="size">Choose a size </label>
              <select name="size" id="size">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
            </div>
            <div className="AddToCart">
              <button classname="ButtonATC">add to Cart</button>
              <Favorite />
            </div>
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
