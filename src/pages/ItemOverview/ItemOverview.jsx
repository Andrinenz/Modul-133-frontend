/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { CloseOutline } from "@carbon/icons-react";
import { Favorite } from "@carbon/icons-react";
import { StarHalf } from "@carbon/icons-react";
import { StarFilled } from "@carbon/icons-react";
import { Image } from "@carbon/icons-react";
import { useEffect } from "react";
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
  }, [dispatch, id]);

  console.log(productById);

  return (
    <>
      {loadedById ? (
        <div className="maincontent">
          <div className="close">
            <CloseOutline size={"22"} />
          </div>
          <img className="MainPicture" src={productById?.image} />
          <div className="PictureTitle">
            <h1>{}</h1>
            <div className="PictureAuthor">
              <h1>{productById?.title}</h1>
            </div>
            <div className="PicturePrice">
              <h2>Price:{productById?.price}.-</h2>
            </div>
            <div className="PictureDescription">
              <h4>{productById?.description}</h4>
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
