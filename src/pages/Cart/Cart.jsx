/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import ItemInCard from "./assets/ItemInCard";
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
  let obj = ["1", "2", "3", "4"];
  return (
    <div>
      <h1 className="Title">Cart</h1>
      <div className="d-flex f-jc">
        <div className="backgroundbox">
          {obj.map((Cart, index) => {
            return <ItemInCard data={Cart} />;
          })}
          <div>
            <h2 className="GoToCheckout">go to Checkout</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Cart;
