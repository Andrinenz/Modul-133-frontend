/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Steps, Button } from 'antd';
import ProductItem from './assets/ProductItem';
import './Checkout.scss';
import { useEffect, useState } from 'react';
import PersonalInformation from './assets/PersonalInformations';
import ShippingInformations from './assets/ShippingInformations';
import Payment from './assets/Payment';
import { useDispatch, useSelector } from 'react-redux';
import { getNewOrder } from '../../state/newOrder/newOrderSelector';
import { getCard } from '../../state/card/cardSelector';
import { fetchCardsFromUser } from '../../state/card/cardThrunk';
import { Loading } from '@carbon/react';
import { getUser } from '../../state/user/userSelector';
import { fetchCreateOrder } from '../../state/order/orderThrunk';
import { useNavigate } from 'react-router';

/*----------------------------------------------------------------------------*/
/* Checkout                                                                   */
/*----------------------------------------------------------------------------*/

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newOrder = useSelector(getNewOrder);
  const { user } = useSelector(getUser);
  const { cardByUser, loadedCardByUser } = useSelector(getCard);

  useEffect(() => {
    dispatch(fetchCardsFromUser());
  }, [dispatch]);

  const generateTotalAmount = (cards) => {
    const totalAmount = cards
      .map((item) => item.itemCount * parseFloat(item.Item.price))
      .reduce((acc, curr) => acc + curr, 0);
    return totalAmount;
  };

  let personalInputFields = ['email', 'firstname', 'lastname'];
  let shippingInputFields = [
    'address',
    'apartementNumber',
    'plz',
    'country',
    'state',
  ];
  let paymentInputFieldsPayPal = ['paymentMethod'];
  let paymentInputFields = [
    'paymentMethod',
    'cardHolder',
    'cardNumber',
    'cardProvider',
    'cvc',
    'cardExpiryDate',
  ];

  const steps = [
    { title: 'Personal Informations', content: <PersonalInformation /> },
    { title: 'Shipping details', content: <ShippingInformations /> },
    { title: 'Payment', content: <Payment /> },
  ];

  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
  };
  const prevStep = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const disabledBtn = (type) => {
    let disableStatus = false;

    if (type === 'personal') {
      personalInputFields.forEach((input) => {
        if (newOrder[input].invalid !== false) {
          disableStatus = true;
        }
      });
    }

    if (type === 'shipping') {
      shippingInputFields.forEach((input) => {
        if (newOrder[input].invalid !== false) {
          disableStatus = true;
        }
      });
    }

    if (type === 'payment') {
      if (newOrder.paymentMethod.value === 'PayPal') {
        paymentInputFieldsPayPal.forEach((input) => {
          if (newOrder[input].invalid !== false) {
            disableStatus = true;
          }
        });
      }
      if (newOrder.paymentMethod.value === 'Credit Card') {
        paymentInputFields.forEach((input) => {
          if (newOrder[input].invalid !== false) {
            disableStatus = true;
          }
        });
      }
    }

    return disableStatus;
  };

  const handleOnSubmit = () => {
    let cards = [];
    cardByUser.forEach((card) => {
      cards.push(card.id);
    });
    let obj = {
      firstname: newOrder.firstname.value,
      lastname: newOrder.lastname.value,
      email: newOrder.email.value,
      country: newOrder.country.value,
      state: newOrder.state.value,
      city: newOrder.city.value === '' ? 'null' : newOrder.city.value,
      address: newOrder.address.value,
      apartementNumber: newOrder.apartementNumber.value,
      plz: newOrder.plz.value,
      paymentMethod: newOrder.paymentMethod.value,
      cardCompany: newOrder.cardProvider.value,
      cardHolder: newOrder.cardHolder.value,
      cardNumber: newOrder.cardNumber.value,
      cvc: newOrder.cvc.value,
      cardExpiryDate: newOrder.cardExpiryDate.value,
      totalAmount: generateTotalAmount(cardByUser).toString(),
      sentToShippingCompany: false,
      Cards: cards,
      UserId: user?.id,
    };

    if (newOrder.paymentMethod.value === 'PayPal') {
      delete obj.cardHolder;
      delete obj.cardCompany;
      delete obj.cardNumber;
      delete obj.cvc;
      delete obj.cardExpiryDate;
      dispatch(fetchCreateOrder(obj, navigate));
      return;
    }

    dispatch(fetchCreateOrder(obj, navigate));
  };

  return (
    <>
      {loadedCardByUser ? (
        <div className='bx-wrap bcol-ibm-gray-10'>
          <div className='d-flex res-top fd-c cds--col-lg-11 pl-0 pr-0 h100p'>
            <h1 className='ml-3 mt-2 mb-0'>Checkout</h1>
            <div className='bcol-ibm-gray-20 mr-3 pt-2 pl-2 pr-2 ml-3 mt-1'>
              <Steps current={current} items={items} />
              <div>{steps[current].content}</div>
              <div className='mt-3 mb-2'>
                {current === 0 ? (
                  <Button
                    type='primary'
                    disabled={disabledBtn('personal')}
                    onClick={() => nextStep()}
                  >
                    Next
                  </Button>
                ) : current === 1 ? (
                  <Button
                    type='primary'
                    disabled={disabledBtn('shipping')}
                    onClick={() => nextStep()}
                  >
                    Next
                  </Button>
                ) : null}
                {current === 2 && (
                  <Button
                    disabled={disabledBtn('payment')}
                    onClick={() => handleOnSubmit()}
                    type='primary'
                  >
                    {
                      <>
                        {newOrder.paymentMethod.value === 'PayPal' ? (
                          <a
                            href={'https://paypal.com'}
                            target={'_blank'}
                            rel='noreferrer'
                            className='col-ibm-white'
                          >
                            Submit
                          </a>
                        ) : (
                          'Submit'
                        )}
                      </>
                    }
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prevStep()}
                  >
                    Back
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className='d-flex mt-4 fd-c cds--col-lg-5 pl-0 pr-0 fixed-sidenav bcol-ibm-white'>
            <div className='title-box border-bottom f-jc f-ac mt-2'>
              <div className='d-flex f-ac f-jb'>
                <h2 className='pl-3'>Total</h2>
                <h2 className='text-bold pr-3'>{`${generateTotalAmount(
                  cardByUser
                )}.-`}</h2>
              </div>
            </div>
            {cardByUser.map((card, index) => {
              return (
                <div key={index}>
                  <ProductItem data={card} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Checkout;
