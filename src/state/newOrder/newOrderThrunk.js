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
        //Validate if Input is empty
        if (event.target.value.trim() === '') {
          dispatch(
            setOrderValidation({
              target: type,
              invalid: true,
              invalidText: 'Field cannot be empty',
            })
          );

          return;
        }

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

        //Validate if input is plz
        if (
          options &&
          options.local !== 'any' &&
          !validator.isPostalCode(event.target.value, options.local)
        ) {
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
