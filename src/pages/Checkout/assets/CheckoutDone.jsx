/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Store } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getOrder } from '../../../state/order/orderSelector';
import { fetchOrderById } from '../../../state/order/orderThrunk';
import '../Checkout.scss';

/*----------------------------------------------------------------------------*/
/* CheckoutDone                                                               */
/*----------------------------------------------------------------------------*/

const CheckoutDone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { orderById, loadedById } = useSelector(getOrder);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const formatDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;
  };

  return (
    <>
      {loadedById ? (
        <div className='cds--offset-lg-2 pt-6'>
          <div className='cds--col-lg-12 bcol-ibm-gray-30'>
            <div className='d-flex pt-2 f-ac f-jb'>
              <h2>Modul-133 Webshop</h2>
              <h4 className='col-ibm-gray-70'>ORDER #{orderById?.id}</h4>
            </div>
            <div className='mt-3'>
              <h3>
                Thanks for your purchase from the{' '}
                {formatDate(orderById.createdAt)}!
              </h3>
            </div>
            <div className='mt-1'>
              <h4 className='col-ibm-gray-70'>
                Hi {orderById?.firstname} we're getting your order ready to be
                shipped. We will notify you when it has been sent.
              </h4>
            </div>
            <div className='mt-3'>
              <Button
                size='large'
                className='d-flex f-ac'
                type='primary'
                onClick={() => navigate('/products')}
                style={{ width: 200, height: 70 }}
                icon={<Store size={'24'} className='mr-1' />}
              >
                Back to store
              </Button>
            </div>
            <div className='mt-3 pb-2 cds--col-lg-8 pl-0 pr-0 '>
              <h4 className='text-bold deco-underline'>Order summary</h4>
              {orderById.Cards.map((card, index) => {
                return (
                  <div className='mt-3 mb-3 d-flex fd-r' key={index}>
                    <img
                      src={card.Item.image}
                      alt='product'
                      width={70}
                      height={70}
                    />
                    <div className='d-flex f-jb w100p'>
                      <div className='d-flex fd-c ml-2'>
                        <h5 className='text-bold'>
                          {card.Item.title} x {card.itemCount}
                        </h5>
                        <h6 className='col-ibm-gray-70'>{card.choosedSize}</h6>
                      </div>
                      <div className='d-flex'>
                        <h4 className='text-bold'>
                          {parseFloat(card.Item.price) * card.itemCount}.-
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className='border-bottom-done' />
              <div className='mt-2 d-flex f-jb'>
                <h5>Shipping</h5>
                <h4 className='text-bold'>25.-</h4>
              </div>
              <div className='border-bottom-done' />
              <div className='mt-2 d-flex f-jb'>
                <h3>Total</h3>
                <h2 className='text-bold'>{orderById.totalAmount}.-</h2>
              </div>
            </div>
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
export default CheckoutDone;
