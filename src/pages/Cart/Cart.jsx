/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import ItemInCard from './assets/ItemInCard';
import { ShoppingCartMinus } from '@carbon/icons-react';
import { Button } from 'antd';
import { Image } from '@carbon/icons-react';
import './Cart.scss';

/*----------------------------------------------------------------------------*/
/* Cart                                                                       */
/*----------------------------------------------------------------------------*/

/* const Cart = () => {
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
}; */

const Cart = () => {
  return (
    <div className='bx-wrap'>
      <div className='d-flex pt-4 cds--col-lg-11 pl-0 pr-0'>
        <div className='cds--offset-lg-2 cds--col-lg-12 pl-0 pr-0'>
          <div className='d-flex f-ac f-jb'>
            <h2 className='text-bold'>My Shopping Bag (2)</h2>
            <h6>
              <a href='/products'>Continue shopping</a>
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
      <div className='cds--col-lg-5 mt-4 pt-0 pl-0 pr-0 bcol-ibm-white fixed-sidenav'>
        <div className='d-flex sum-box f-jc'>
          <h1>Summe:</h1>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Cart;
