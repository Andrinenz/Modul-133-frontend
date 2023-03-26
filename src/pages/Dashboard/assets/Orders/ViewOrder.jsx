/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Link } from '@carbon/react';
import { Button, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../../../state/dashboard/dashboardSelectors';
import { fetchUpdateOrder } from '../../../../state/dashboard/dashboardThrunk';

/*----------------------------------------------------------------------------*/
/* ViewOrder                                                                  */
/*----------------------------------------------------------------------------*/

const ViewOrder = (props) => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getDashboard);

  const selectedOrder = orders.find(
    (order) => order.id === props.modalOpen.orderId
  );

  const [data, setData] = useState({
    firstname: selectedOrder?.firstname,
    lastname: selectedOrder?.lastname,
    Cards: selectedOrder?.Cards,
    email: selectedOrder?.email,
    address: selectedOrder?.address,
    apartementNumber: selectedOrder?.apartementNumber,
    state: selectedOrder?.state,
    paymentMethod: selectedOrder?.paymentMethod,
    cvc: selectedOrder?.cvc,
    plz: selectedOrder?.plz,
    country: selectedOrder?.country,
    cardHolder: selectedOrder?.cardHolder,
    cardNumber: selectedOrder?.cardNumber,
    totalAmount: selectedOrder?.totalAmount,
  });

  useEffect(() => {
    setData({
      email: selectedOrder?.email,
      firstname: selectedOrder?.firstname,
      Cards: selectedOrder?.Cards,
      lastname: selectedOrder?.lastname,
      address: selectedOrder?.address,
      apartementNumber: selectedOrder?.apartementNumber,
      state: selectedOrder?.state,
      paymentMethod: selectedOrder?.paymentMethod,
      cvc: selectedOrder?.cvc ? selectedOrder?.cvc : ' ',
      plz: selectedOrder?.plz,
      country: selectedOrder?.country,
      cardHolder: selectedOrder?.cardHolder,
      cardNumber: selectedOrder?.cardNumber,
      totalAmount: selectedOrder?.totalAmount,
    });
  }, [selectedOrder]);

  const handleOnClose = () => {
    props.handleModalClose();
  };

  const handleKeyUp = (event, type, inputType) => {
    let dataTemp = { ...data };
    switch (inputType) {
      case 'textinput':
        dataTemp[type] = event.target.value;
        break;
      case 'dropdown':
        dataTemp[type] = event;
        break;
      default:
        break;
    }
    setData(dataTemp);
  };

  const handleSubmit = () => {
    dispatch(fetchUpdateOrder({ ...data, id: props.modalOpen.orderId }));
    handleOnClose();
  };

  const disableBtn = () => {
    if (
      data.firstname === '' ||
      data.lastname === '' ||
      data.address === '' ||
      data.apartementNumber === '' ||
      data.state === '' ||
      data.plz === '' ||
      data.country === '' ||
      data.cvv === '' ||
      data.cardHolder === '' ||
      data.cardNumber === '' ||
      data.totalAmount === ''
    ) {
      return true;
    } else return false;
  };

  return (
    <div>
      <Modal
        title='Edit Order'
        open={props.modalOpen.open}
        onCancel={() => handleOnClose()}
        footer={
          <div>
            <Button onClick={handleOnClose}>Cancel</Button>
            <Button
              type='primary'
              disabled={disableBtn()}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        }
      >
        <div>
          <div>
            <h3 className='mb-1 deco-underline'>Created by:</h3>
            <div className='d-flex fd-c'>
              <div className='d-flex'>
                <h5 className='text-no-bold'>Email:</h5>
                <h5 className='text-bold ml-1'>{data.email}</h5>
              </div>
            </div>
            <div className='d-flex bx-wrap'>
              {data?.Cards?.map((card, index) => {
                return (
                  <div className='d-flex mr-6 fd-c' key={index + 1}>
                    <h3 className='mb-1 deco-underline'>{`Item ${
                      index + 1
                    }`}</h3>
                    <div className='d-flex'>
                      <h5 className='text-no-bold'>Title:</h5>
                      <h5 className='text-bold ml-1'>{card.Item.title}</h5>
                    </div>
                    <div className='d-flex'>
                      <h5 className='text-no-bold'>Descr:</h5>
                      <h5 className='text-bold ml-1'>
                        {card.Item.description}
                      </h5>
                    </div>
                    <div className='d-flex'>
                      <h5 className='text-no-bold'>Price:</h5>
                      <h5 className='text-bold ml-1'>{card.Item.price}.-</h5>
                    </div>
                    <div className='d-flex'>
                      <h5 className='text-no-bold'>Stock:</h5>
                      <h5 className='text-bold ml-1'>
                        {card.Item.itemsInStock}
                      </h5>
                    </div>
                    <div className='d-flex'>
                      <h5 className='text-no-bold'>Item count:</h5>
                      <h5 className='text-bold ml-1'>{card.itemCount}</h5>
                    </div>
                    <div className='d-flex'>
                      <h5 className='text-no-bold'>Image Link:</h5>
                      <h5 className='text-bold ml-1'>
                        <Link size='lg'>
                          <a
                            href={card.Item.image}
                            target='_blank'
                            rel='noreferrer'
                          >
                            Image
                          </a>
                        </Link>
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <h3 className='mb-1 deco-underline'>Order details:</h3>
            <div className='d-flex bx-wrap f-jb'>
              <div className='d-flex pl-0 pr-0'>
                <div>
                  <h5>Firstname:</h5>
                  <Input
                    placeholder='firstname'
                    onChange={(e) => handleKeyUp(e, 'firstname', 'textinput')}
                    value={data.firstname}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex pl-0 pr-0'>
                <div>
                  <h5>Firstname:</h5>
                  <Input
                    placeholder='lastname'
                    onChange={(e) => handleKeyUp(e, 'lastname', 'textinput')}
                    value={data.lastname}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex mt-2 pl-0 pr-0'>
                <div>
                  <h5>Address:</h5>
                  <Input
                    placeholder='address'
                    onChange={(e) => handleKeyUp(e, 'address', 'textinput')}
                    value={data.address}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex mt-2 pl-0 pr-0'>
                <div>
                  <h5>Appartement Number:</h5>
                  <Input
                    placeholder='34'
                    onChange={(e) =>
                      handleKeyUp(e, 'apartementNumber', 'textinput')
                    }
                    value={data.apartementNumber}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex mt-2 pl-0 pr-0'>
                <div>
                  <h5>State:</h5>
                  <Input
                    placeholder='state'
                    onChange={(e) => handleKeyUp(e, 'state', 'textinput')}
                    value={data.state}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex mt-2 pl-0 pr-0'>
                <div>
                  <h5>PLZ:</h5>
                  <Input
                    placeholder='plz'
                    onChange={(e) => handleKeyUp(e, 'plz', 'textinput')}
                    value={data.plz}
                    size={'large'}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex fd-c bx-wrap'>
              <div className='mt-2'>
                <h5>Country:</h5>
                <Input
                  placeholder='country'
                  value={data.country}
                  onChange={(e) => handleKeyUp(e, 'country', 'textinput')}
                  size='large'
                />
              </div>
            </div>
            <h3 className='mb-1 deco-underline mt-1'>Payment details:</h3>
            <div className='d-flex fd-c bx-wrap'>
              <div>
                <h5>Payment Method:</h5>
                <Select
                  value={data.paymentMethod}
                  className='w100p'
                  options={[
                    { value: 'PayPal', label: 'PayPal' },
                    { value: 'CreditCard', label: 'Credit card' },
                  ]}
                  onChange={(e) => handleKeyUp(e, 'paymentMethod', 'dropdown')}
                  size='large'
                />
              </div>
            </div>
            <div className='d-flex bx-wrap f-jb'>
              <div className='d-flex mt-2 pl-0 pr-0'>
                <div>
                  <h5>Card holder:</h5>
                  <Input
                    placeholder='card holder'
                    onChange={(e) => handleKeyUp(e, 'cardHolder', 'textinput')}
                    value={data.cardHolder}
                    disabled={data.paymentMethod === 'PayPal' ? true : false}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex mt-2 pl-0 pr-0'>
                <div>
                  <h5>Price amount:</h5>
                  <Input
                    placeholder='price amount'
                    value={data.totalAmount}
                    onChange={(e) => handleKeyUp(e, 'totalAmount', 'textinput')}
                    size={'large'}
                  />
                </div>
              </div>
              <div className='d-flex pl-0 mt-2 pr-0'>
                <div>
                  <h5>CVC:</h5>
                  <Input
                    placeholder='cvv'
                    disabled={data.paymentMethod === 'PayPal' ? true : false}
                    value={data.cvc}
                    onChange={(e) => handleKeyUp(e, 'cvv', 'textinput')}
                    size={'large'}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex fd-c bx-wrap'>
              <div className='mt-1 mb-2'>
                <h5>Card number:</h5>
                <Input
                  placeholder='card number'
                  onChange={(e) => handleKeyUp(e, 'cardNumber', 'textinput')}
                  value={data.cardNumber}
                  disabled={data.paymentMethod === 'PayPal' ? true : false}
                  size={'large'}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ViewOrder;
