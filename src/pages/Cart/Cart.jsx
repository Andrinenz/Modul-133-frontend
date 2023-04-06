/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import ItemInCard from './assets/ItemInCard';
import { ShoppingCartMinus } from '@carbon/icons-react';
import { Button } from 'antd';
import { Image } from '@carbon/icons-react';
import { ArrowRight } from '@carbon/icons-react';
import { Purchase } from '@carbon/icons-react';
import { DeliveryParcel } from '@carbon/icons-react';
import { DataShare } from '@carbon/icons-react';
import './Cart.scss';
import { useNavigate } from 'react-router';

/*----------------------------------------------------------------------------*/
/* Cart                                                                       */
/*----------------------------------------------------------------------------*/

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className='bx-wrap'>
      <div className='d-flex pt-4 cds--col-lg-11 res-top pl-0 pr-0'>
        <div className='cds--offset-lg-2 cds--col-lg-12 pl-0 pr-0'>
          <div className='d-flex margin-res-top  margin-l-r-res f-ac f-jb'>
            <h2 className='text-bold'>My Shopping bag</h2>
            <h6>
              <a href='/products' target={'_blank'} rel='noreferrer'>
                Continue Shopping
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
      <div className='cds--col-lg-5 border-bottom-res mt-4 pt-0 pl-0 pr-0 bcol-ibm-white fixed-sidenav'>
        <div className='d-flex sum-box f-jc fd-c ml-4 mr-4'>
          <div className='d-flex f-jb mt-2'>
            <span>Subtotal</span>
            <span>2000.-</span>
          </div>
          <div className='d-flex f-jb mt-2'>
            <span>Shipping</span>
            <span>25.-</span>
          </div>
          <div className='mt-2 border-bottom' />
          <div className='d-flex f-jb mt-2'>
            <h3>Total</h3>
            <h3 className='text-bold'>2025.-</h3>
          </div>
          <div className='d-flex fd-c f-jc'>
            <Button
              size='large'
              type='primary'
              onClick={() => navigate('/checkout')}
              className='mt-4'
            >
              Proceed to Checkout
            </Button>
          </div>
          <div className='border-bottom pl-2 pt-2'></div>
          <div className='d-flex f-jb mt-2'>
            <div className='d-flex f-js'>
              <h3>
                <Purchase size='32' />
              </h3>
            </div>
            <div className='d-flex fd-c mr-5'>
              <h4>Payment</h4>
              <p className='text-lighter'>Secure payment</p>
            </div>
          </div>
          <div className='border-bottom pl-2 pt-2'></div>
          <div className='d-flex f-jb mt-2'>
            <h3>
              <DeliveryParcel size='32' />
            </h3>
            <div className='d-flex fd-c mr-2'>
              <h4>Shipping & Delivery</h4>
              <p className='text-lighter'>Fast shipping within 48 hours</p>
            </div>
          </div>
          <div className='border-bottom pl-2 pt-2'></div>
          <div className='d-flex f-jb mt-2'>
            <h3>
              <DataShare size='32' />
            </h3>
            <div className='d-flex fd-c'>
              <h4>Returns</h4>
              <p className='text-lighter'>
                If you are not satisfied, contact us for a return
              </p>
            </div>
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
