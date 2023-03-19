/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { setOrderInfo, setOrderValidation } from './newOrderSlice';
import validator from 'validator';

/*----------------------------------------------------------------------------*/
/* newOrderThrunk                                                             */
/*----------------------------------------------------------------------------*/

export const handleKeyUp = (event, type, inputType) => {
  return (dispatch) => {
    switch (inputType) {
      case 'textinput':
        if (type === 'cardExpiryDate') {
          dispatch(setOrderInfo({ target: 'cardExpiryDate', value: event }));
          return;
        }
        dispatch(setOrderInfo({ target: type, value: event.target.value }));
        break;
      case 'numberInput':
        dispatch(
          setOrderInfo({
            target: type,
            value: event === null ? null : event.toString(),
          })
        );
        break;
      case 'dropdown':
        if (type === 'country') {
          dispatch(setOrderInfo({ target: 'state', value: '' }));
          dispatch(setOrderInfo({ target: 'city', value: '' }));
          dispatch(setOrderInfo({ target: 'plz', value: '' }));
        }
        if (type === 'state') {
          dispatch(setOrderInfo({ target: 'city', value: '' }));
          dispatch(setOrderInfo({ target: 'plz', value: '' }));
        }
        dispatch(
          setOrderInfo({ target: type, value: event === [] ? '' : event })
        );
        break;
      default:
        console.log('Error handle key up', type, inputType);
    }
  };
};

export const checkIfValidInput = (event, type, inputType, options) => {
  return (dispatch) => {
    switch (inputType) {
      case 'textinput':
        if (event.target.value.trim() === '') {
          //Validate if Input is empty
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'Field cannot be empty',
            })
          );

          return;
        }

        //Validate if input is Card Expiry
        if (type === 'cardExpiryDate' && event.target.value.length !== 7) {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'Field has to be a valid expiry date',
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );

        //Validate if input is cvc
        if (type === 'cvc' && event.target.value.length !== 3) {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'Field has to be a valid cvc number',
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );

        //Validate if input is email
        if (
          options &&
          options.onlyEmail &&
          !validator.isEmail(event.target.value)
        ) {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'This field has to be an email',
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );

        //Validate if input is card number
        if (
          options &&
          options.cardNumber &&
          !validator.isCreditCard(event.target.value, {
            brands: [options.cardNumber],
          })
        ) {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: `This number is not a valid ${options.cardNumber} card number`,
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );

        if (
          options &&
          options.local &&
          !validator.isPostalCode(event.target.value, options.local)
        ) {
          //Validate if input is plz
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'Field has to be a valid PLZ',
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );
        break;

      case 'numberInput':
        console.log(event);
        if (event === null) {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'This field cannot be empty',
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );
        break;

      case 'dropdown':
        if (event.trim() === '') {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'This field cannot be empty',
            })
          );
          return;
        }
        dispatch(
          setOrderValidation({
            target: type,
            invalid: false,
            invalidText: '',
          })
        );
        break;

      default:
        break;
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
