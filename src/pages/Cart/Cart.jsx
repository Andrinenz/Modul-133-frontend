/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import ItemInCard from "./assets/ItemInCard";
import { ShoppingCartMinus } from "@carbon/icons-react";
import { Button } from "antd";
import { Image } from "@carbon/icons-react";
import { ArrowRight } from "@carbon/icons-react";
import "./Cart.scss";

/*----------------------------------------------------------------------------*/
/* Cart                                                                       */
/*----------------------------------------------------------------------------*/

/* const Cart = () => {
  const handleOnClick = () => {
    let obj = {
      choosedSize: "S",
    };
  };
 */
const Cart = () => {
  return (
    <div className="bx-wrap">
      <div className="d-flex pt-4 cds--col-lg-11 pl-0 pr-0">
        <div className="cds--offset-lg-2 cds--col-lg-12 pl-0 pr-0">
          <div className="d-flex f-ac f-jb">
            <h2 className="text-bold">My Cart</h2>
            <h6>
              <a href="/products">
                <Button className="cursor-pointer ct">
                  Continue shopping {<ArrowRight className="arrow" />}
                </Button>
              </a>
            </h6>
          </div>
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
          <ItemInCard />
        </div>
      </div>
      <div className="cds--col-lg-5 mt-4 pt-0 pl-0 pr-0 bcol-ibm-white fixed-sidenav">
        <div className="d-flex sum-box f-jc fd-c ml-4 mr-4">
          <div className="d-flex f-jb mt-2">
            <span>Subtotal</span>
            <span>$2000</span>
          </div>
          <div className="d-flex f-jb mt-2">
            <span>Shipping</span>
            <span>$25</span>
          </div>
          <div className="d-flex f-jb mt-2">
            <h3>Total</h3>
            <h3>$2025</h3>
          </div>
          <Button className="mt-4">Proceed to Checkout</Button>
          <Button className="mt-2">
            <img src="" alt="PayPalLogo" />
          </Button>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Cart;
