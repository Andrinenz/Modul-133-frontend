/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Purchase, View, ViewOff } from '@carbon/icons-react';
import { useState } from 'react';

/*----------------------------------------------------------------------------*/
/* Payment                                                                    */
/*----------------------------------------------------------------------------*/

const Payment = (props) => {
  const selectedOrder = props.data;

  const [viewOn, setViewOn] = useState(false);

  const hideChars = (str, type) => {
    if (type === 'card') {
      const lengthToHide = Math.max(str.length - 4, 0); // hide all but the last 4 characters
      const numRandomStars = Math.floor(Math.random() * 3); // add up to 2 additional random stars
      const hidden = '*'.repeat(lengthToHide + numRandomStars);
      return hidden + str.substring(lengthToHide);
    } else {
      return '*'.repeat(str.length);
    }
  };

  return (
    <div className='mt-2 pb-3'>
      <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-5 prl'>
        <div className='d-flex fd-c'>
          <div className='d-flex f-ac'>
            <div style={{ marginTop: '5px' }}>
              <Purchase size={'32'} className='mr-2' />
            </div>
            <h1 className='smaller-font mb-0'>Payment details</h1>
          </div>
          <div className='mt-3 d-flex mb-3 fd-c'>
            <div className='d-flex mb-2'>
              <div>
                <h4>Total Amount:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.totalAmount
                    ? selectedOrder?.totalAmount
                    : '-'}
                  .-
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>Choosed Method:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.paymentMethod
                    ? selectedOrder?.paymentMethod
                    : '-'}
                </h4>
              </div>
            </div>
            {selectedOrder?.paymentMethod === 'Credit Card' ? (
              <>
                <div className='d-flex'>
                  <div>
                    <h4>Card Provider:</h4>
                  </div>
                  <div>
                    <h4 className='text-bold ml-1 h4'>
                      {selectedOrder?.cardCompany
                        ? selectedOrder?.cardCompany
                        : '-'}
                    </h4>
                  </div>
                </div>
                <div className='d-flex'>
                  <div>
                    <h4>Card Holder:</h4>
                  </div>
                  <div>
                    <h4 className='text-bold ml-1 h4'>
                      {selectedOrder?.cardHolder
                        ? selectedOrder?.cardHolder
                        : '-'}
                    </h4>
                  </div>
                </div>
                {!viewOn ? (
                  <>
                    <div className='d-flex'>
                      <div>
                        <h4>Card Number:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {selectedOrder?.cardNumber
                            ? hideChars(selectedOrder?.cardNumber, 'card')
                            : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>CVC:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {selectedOrder?.cvc
                            ? hideChars(selectedOrder?.cvc)
                            : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>Card expiry date:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {selectedOrder?.cardExpiryDate
                            ? hideChars(selectedOrder?.cardExpiryDate)
                            : '-'}
                        </h4>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='d-flex'>
                      <div>
                        <h4>Card Number:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {selectedOrder?.cardNumber
                            ? selectedOrder?.cardNumber
                            : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>CVC:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {selectedOrder?.cvc ? selectedOrder?.cvc : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>Card expiry date:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {selectedOrder?.cardExpiryDate
                            ? selectedOrder?.cardExpiryDate
                            : '-'}
                        </h4>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
        <div className='mt-2 cursor-pointer'>
          {selectedOrder?.paymentMethod === 'Credit Card' ? (
            viewOn ? (
              <ViewOff onClick={() => setViewOn(false)} size={'32'} />
            ) : (
              <View onClick={() => setViewOn(true)} size={'32'} />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Payment;
