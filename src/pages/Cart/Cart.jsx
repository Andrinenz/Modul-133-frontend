/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import ItemInCard from "./assets/ItemInCard";
import { ShoppingCartMinus } from "@carbon/icons-react";
import { Button } from "antd";
import { Image } from "@carbon/icons-react";
import "./Cart.scss";

/*----------------------------------------------------------------------------*/
/* Cart                                                                       */
/*----------------------------------------------------------------------------*/

/* const Cart = () => {
  let obj = ["1", "2", "3", "4"];
  return obj.map((Cart, index) => {
    return (
      <div>
        <ItemInCard data={Cart} />
      </div>
    );
  });
}; */
const Cart = () => {
  const handleOnClick = () => {
    let obj = {
      choosedSize: "S",
    };
  };
  return (
    <>
      <div className="title mt-3 d-f f-jc">
        <h1>My Cart</h1>
      </div>
      <div className="main d-flex bcol-ibm-white cds--offset-lg-10 cds--col-lg-4 pl-0 pr-0 f-jc mt-5 fd-r">
        <h1>Checkout</h1>
      </div>
      <div className="main d-flex bcol-ibm-white cds--offset-lg-1 cds--col-lg-8 pl-0 pr-0 f-jc fd-r">
        {/*<img className="MainPicture" src={<Image />} />*/}
        <div className="d-flex f-jc fd-c">
          <div className="title d-flex f-jc">
            <h2>title</h2>
          </div>
          <div classname="Description">
            <h4>description</h4>
          </div>
          <div className="Price">
            <h3>Price.-</h3>
          </div>
          <div className="RemoveFromCart">
            <Button
              className="RFC"
              icon={<ShoppingCartMinus />}
              onClick={() => handleOnClick()}
            >
              remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Cart;
