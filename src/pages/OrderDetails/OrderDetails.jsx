/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Loading } from '@carbon/react';
import { Button, FloatButton } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getOrder } from '../../state/order/orderSelector';
import { fetchUserOrders } from '../../state/order/orderThrunk';
import Items from './assets/Items';
import Payment from './assets/Payment';
import PersonalInfo from './assets/PersonalInfo';
import Shipping from './assets/Shipping';

/*----------------------------------------------------------------------------*/
/* OrderDetails                                                               */
/*----------------------------------------------------------------------------*/

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { ordersByUser, loadedUserOrders } = useSelector(getOrder);

  const selectedOrder = loadedUserOrders
    ? ordersByUser?.find((order) => order.id === parseInt(id))
    : null;

  const formatDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;
  };

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  console.log(selectedOrder);

  return (
    <>
      {loadedUserOrders ? (
        <div className='cds--offset-lg-3 cds--col-lg-10 pl-0 pr-0 pt-4'>
          <h1 className='text-bold pl-2'>{`Order #${id}`}</h1>
          <div>
            <h4 className='pl-2'>
              From the {formatDate(selectedOrder.createdAt)}
            </h4>
          </div>
          <PersonalInfo data={selectedOrder} />
          <Items data={selectedOrder} />
          <Shipping data={selectedOrder} />
          <Payment data={selectedOrder} />
          <div className='d-flex f-je pb-3'>
            <Button
              size='large'
              type='primary'
              onClick={() => navigate('/orders')}
            >
              Go Back
            </Button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <FloatButton.BackTop />
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default OrderDetails;
