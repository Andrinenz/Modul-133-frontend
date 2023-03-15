/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import ProductItem from './assets/ProductItem';
import './Checkout.scss';

/*----------------------------------------------------------------------------*/
/* Checkout                                                                   */
/*----------------------------------------------------------------------------*/

const Checkout = () => {
  return (
    <div className='d-flex bxw-wrap'>
      <div className='d-flex fd-c cds--col-lg-11 pl-0 pr-0'>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
        <h1>Test 2</h1>
      </div>
      <div className='d-flex cds--col-lg-5 pl-0 pr-0 fixed-sidenav bcol-ibm-white'>
        <ProductItem />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Checkout;
