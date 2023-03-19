/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Select, Input, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { newOrderConfig } from '../../../libs/newOrderConfig';
import { getNewOrder } from '../../../state/newOrder/newOrderSelector';
import { setOrderInfo } from '../../../state/newOrder/newOrderSlice';
import {
  checkIfValidInput,
  handleKeyUp,
} from '../../../state/newOrder/newOrderThrunk';

/*----------------------------------------------------------------------------*/
/* Payment                                                                    */
/*----------------------------------------------------------------------------*/

const Payment = () => {
  const dispatch = useDispatch();
  const newOrder = useSelector(getNewOrder);

  return (
    <div className='mt-1 pt-1'>
      <h3 className='deco-underline mb-0'>Payment details:</h3>
      <div className='mt-2'>
        <div className='w100p d-flex fd-c f-ac f-jc'>
          <div>
            <h5>Payment option:</h5>
            <Select
              size='large'
              className='payment-size'
              placeholder='Select a payment option'
              options={newOrderConfig.paymentOptions}
              status={newOrder.paymentMethod.invalid ? 'error' : ''}
              value={
                newOrder.paymentMethod.value === ''
                  ? null
                  : newOrder.paymentMethod.value
              }
              onChange={(e) => {
                dispatch(handleKeyUp(e, 'paymentMethod', 'dropdown'));
                dispatch(checkIfValidInput(e, 'paymentMethod', 'dropdown'));
              }}
            />
            {newOrder.paymentMethod.invalid ? (
              <div className='pt-1' style={{ color: '#ff4d4f' }}>
                <h6>{newOrder.paymentMethod.invalidText}</h6>
              </div>
            ) : null}
          </div>
          {newOrder.paymentMethod.value === 'PayPal' ? null : (
            <div className='mt-1'>
              <h5>Card Provider:</h5>
              <Select
                size='large'
                className='payment-size'
                placeholder='Select a provider'
                options={newOrderConfig.cardProvider}
                value={
                  newOrder.cardProvider.value === ''
                    ? null
                    : newOrder.cardProvider.value
                }
                disabled={newOrder.paymentMethod.value === '' ? true : false}
                status={newOrder.cardProvider.invalid ? 'error' : ''}
                onChange={(e) => {
                  dispatch(handleKeyUp(e, 'cardProvider', 'dropdown'));
                  dispatch(checkIfValidInput(e, 'cardProvider', 'dropdown'));
                }}
              />
              {newOrder.cardProvider.invalid ? (
                <div className='pt-1' style={{ color: '#ff4d4f' }}>
                  <h6>{newOrder.cardProvider.invalidText}</h6>
                </div>
              ) : null}
            </div>
          )}
        </div>
        {newOrder.paymentMethod.value === 'Credit Card' ||
        newOrder.paymentMethod.value === '' ? (
          <>
            <div className='mt-2'>
              <div className=''>
                <h5>Name on Card:</h5>
                <Input
                  size='large'
                  placeholder='Card holder'
                  value={newOrder.cardHolder.value}
                  status={newOrder.cardHolder.invalid ? 'error' : ''}
                  onChange={(e) => {
                    dispatch(handleKeyUp(e, 'cardHolder', 'textinput'));
                    dispatch(checkIfValidInput(e, 'cardHolder', 'textinput'));
                  }}
                  onBlur={(e) =>
                    dispatch(checkIfValidInput(e, 'cardHolder', 'textinput'))
                  }
                  disabled={newOrder.cardProvider.value === '' ? true : false}
                />
                {newOrder.cardHolder.invalid ? (
                  <div className='pt-1' style={{ color: '#ff4d4f' }}>
                    <h6>{newOrder.cardHolder.invalidText}</h6>
                  </div>
                ) : null}
              </div>
              <div className='mt-1'>
                <h5>Card Number:</h5>
                <Input
                  className='w100p'
                  size='large'
                  placeholder='Card number'
                  disabled={newOrder.cardProvider.value === '' ? true : false}
                  value={newOrder.cardNumber.value}
                  status={newOrder.cardNumber.invalid ? 'error' : ''}
                  onChange={(e) => {
                    dispatch(handleKeyUp(e, 'cardNumber', 'textinput'));
                    dispatch(
                      checkIfValidInput(e, 'cardNumber', 'textinput', {
                        cardNumber: newOrder.cardProvider.value,
                      })
                    );
                  }}
                  onBlur={(e) =>
                    dispatch(
                      checkIfValidInput(e, 'cardNumber', 'textinput', {
                        cardNumber: newOrder.cardProvider.value,
                      })
                    )
                  }
                />
                {newOrder.cardNumber.invalid ? (
                  <div className='pt-1' style={{ color: '#ff4d4f' }}>
                    <h6>{newOrder.cardNumber.invalidText}</h6>
                  </div>
                ) : null}
              </div>
              <div className='d-flex mt-1 f-jb'>
                <div className='cds--col-lg-7 mr-1 pl-0 pr-0'>
                  <h5>CVC:</h5>
                  <Input
                    size='large'
                    placeholder='CVC'
                    disabled={newOrder.cardProvider.value === '' ? true : false}
                    value={newOrder.cvc.value}
                    status={newOrder.cvc.invalid ? 'error' : ''}
                    maxLength={3}
                    onKeyDown={(e) => {
                      if (
                        !(
                          e.key === 'Backspace' ||
                          e.key === 'Tab' ||
                          /^\d+$/.test(e.key)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      dispatch(handleKeyUp(e, 'cvc', 'textinput'));
                      dispatch(checkIfValidInput(e, 'cvc', 'textinput'));
                    }}
                    onBlur={(e) =>
                      dispatch(checkIfValidInput(e, 'cvc', 'textinput'))
                    }
                  />
                  {newOrder.cvc.invalid ? (
                    <div className='pt-1' style={{ color: '#ff4d4f' }}>
                      <h6>{newOrder.cvc.invalidText}</h6>
                    </div>
                  ) : null}
                </div>
                <div className='cds--col-lg-7 ml-1 pl-0 pr-0'>
                  <h5>Expiry Date (mm/yy):</h5>
                  <Input
                    className='w100p'
                    size='large'
                    maxLength='7'
                    placeholder='Enter date'
                    type='tel'
                    pattern='[0-9]*'
                    inputMode='numeric'
                    disabled={newOrder.cardProvider.value === '' ? true : false}
                    value={newOrder.cardExpiryDate.value}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/\D/g, '');
                      if (value.length > 2) {
                        value = value.slice(0, 2) + ' / ' + value.slice(2);
                      }
                      dispatch(
                        handleKeyUp(value, 'cardExpiryDate', 'textinput')
                      );
                      dispatch(
                        checkIfValidInput(e, 'cardExpiryDate', 'textinput')
                      );
                    }}
                    onBlur={(e) =>
                      dispatch(
                        checkIfValidInput(e, 'cardExpiryDate', 'textinput')
                      )
                    }
                  />
                  {newOrder.cardExpiryDate.invalid ? (
                    <div className='pt-1' style={{ color: '#ff4d4f' }}>
                      <h6>{newOrder.cardExpiryDate.invalidText}</h6>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='d-flex f-jc mt-3'>
              <h4>
                Click on Submit to get redirected to the official PayPal site.
              </h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Payment;
