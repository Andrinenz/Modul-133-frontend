/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Select, Input, InputNumber } from 'antd';

/*----------------------------------------------------------------------------*/
/* Payment                                                                    */
/*----------------------------------------------------------------------------*/

const Payment = () => {
  return (
    <div className='mt-1 pt-1'>
      <h3 className='deco-underline mb-0'>Payment details:</h3>
      <div className='mt-2'>
        <div className='w100p d-flex f-jc'>
          <div>
            <h5>Payment option:</h5>
            <Select
              size='large'
              className='payment-size'
              placeholder='Select a payment option'
            />
          </div>
        </div>
        <div className='mt-2'>
          <div className=''>
            <h5>Card holder:</h5>
            <Input size='large' placeholder='Card holder' />
          </div>
          <div className='mt-1'>
            <h5>Card Number:</h5>
            <InputNumber
              className='w100p'
              size='large'
              placeholder='Card number'
            />
          </div>
          <div className='d-flex mt-1 f-jb'>
            <div className='cds--col-lg-7 mr-1 pl-0 pr-0'>
              <h5>CVV:</h5>
              <Input size='large' placeholder='CVV' />
            </div>
            <div className='cds--col-lg-7 ml-1 pl-0 pr-0'>
              <h5>Expiry Date:</h5>
              <Input size='large' placeholder='CVV' />
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
export default Payment;
