/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Input } from 'antd';
import ProductItem from './assets/ProductItem';
import './Checkout.scss';

/*----------------------------------------------------------------------------*/
/* Checkout                                                                   */
/*----------------------------------------------------------------------------*/

const Checkout = () => {
  return (
    <>
      <div className='bx-wrap'>
        <div className='d-flex res-top fd-c cds--col-lg-11 pl-0 pr-0'>
          <div className='bcol-ibm-gray-20 mr-3 pt-2 pl-2 pr-2 ml-3 mt-2'>
            <h1 className='mb-0'>Checkout</h1>
            <div className='border-bottom mt-1' />
            <div>
              <h3 className='mb-0 mt-2'>Personal details:</h3>
              <div className='d-flex f-jb mt-2'>
                <div className='cds--col-lg-7 mr-1 pl-0 pr-0'>
                  <h5>Firstname:</h5>
                  <Input size='large' placeholder='firstname' />
                </div>
                <div className='cds--col-lg-7 ml-1 pl-0 pr-0'>
                  <h5>Lastname:</h5>
                  <Input size='large' placeholder='lastname' />
                </div>
              </div>
              <div className='cds--col-lg-7 pl-0 pr-0 mt-1 mr-1'>
                <h5>Email:</h5>
                <Input size='large' placeholder='email' />
              </div>
            </div>
          </div>
          <div className='cds--col-lg-11 pl-0 pr-0 total-box pt-2'>
            <div className='d-flex f-ac f-jb'>
              <h2 className='text-bold pl-3'>Total</h2>
              <h2 className=''>300.-</h2>
            </div>
          </div>
        </div>
        <div className='d-flex fd-c cds--col-lg-5 pl-0 pr-0 fixed-sidenav bcol-ibm-white'>
          <div className='d-flex title-box border-bottom f-jc f-ac mt-2'>
            <h2 className='text-bold'>Item List</h2>
          </div>
          <ProductItem />
        </div>
      </div>
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Checkout;
