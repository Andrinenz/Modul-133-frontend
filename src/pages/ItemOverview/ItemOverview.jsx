/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { CloseOutline, ShoppingCart } from "@carbon/icons-react";
import { Favorite } from "@carbon/icons-react";
import { StarHalf } from "@carbon/icons-react";
import { StarFilled } from "@carbon/icons-react";
import { Image } from "@carbon/icons-react";
import { Loading } from "@carbon/react";
import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchCreateCard } from "../../state/card/cardThrunk";
import { getProduct } from "../../state/products/productsSelector";
import { resetProductById } from "../../state/products/productsSlice";
import { fetchProductById } from "../../state/products/productsThrunk";
import "./ItemOverview.scss";
/*----------------------------------------------------------------------------*/
/* ItemOverview                                                                   */
/*----------------------------------------------------------------------------*/
const { createRoot } = ReactDOM;
const { Rate } = antd;
const App = () => <Rate allowHalf defaultValue={2.5} />;

const ItemOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams("id");

  const { productById, loadedById } = useSelector(getProduct);

  useEffect(() => {
    dispatch(fetchProductById(parseInt(id)));
  }, [dispatch, id]);

  console.log(productById);

  const close = () => {
    navigate("/products");
    dispatch(resetProductById);
  };

  const handleOnClick = () => {
    let obj = {
      ItemId: id,
      itemCount: 1,
      choosedSize: "S",
    };

    dispatch(fetchCreateCard(obj));
  };

  return (
    <>
      <div className="main d-flex bcol-ibm-white cds--offset-lg-3 cds--col-lg-10 pl-0 pr-0 mt-6">
        <div className=""></div>
        <img className="MainPicture" src={productById?.image} />
        <div className="d-flex fd-c f-jc">
          <div className="title d-flex f-jc">
            <h1>{productById?.title}</h1>
          </div>
          <div classname="Description">
            <h3>{productById?.description}</h3>
          </div>
            <div id="container" style="padding: 24px" />
            <script>
              const mountNode = document.getElementById('container');
            </script>
          </div>
          <div className="Price">
            <h2>{productById?.price}.-</h2>
          </div>

          <div className="AddToCart">
            <Button icon={<ShoppingCart />} onClick={() => handleOnClick()}>
              Add
            </Button>
          </div>
        </div>
        <div className="close">
          <CloseOutline
            size={"22"}
            onClick={() => close()}
            className="cursor-pointer"
          ></CloseOutline>
        </div>
      </div>
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ItemOverview;
