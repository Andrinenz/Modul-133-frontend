/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Delivery, Purchase, UserProfile } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getOrder } from '../../../state/order/orderSelector';

/*----------------------------------------------------------------------------*/
/* OrderDetails                                                               */
/*----------------------------------------------------------------------------*/

const OrderDetails = () => {
  const { id } = useParams();
  const { ordersByUser, orders, loadedUserOrders } = useSelector(getOrder);

  console.log(orders);

  const selectedOrder = loadedUserOrders
    ? ordersByUser?.find((order) => order.id === parseInt(id))
    : null;

  const formatDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;
  };

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
          <div className='mt-3'>
            <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-5 prl'>
              <div className='d-flex fd-c'>
                <div className='d-flex f-ac'>
                  <div style={{ marginTop: '5px' }}>
                    <UserProfile size={'32'} className='mr-2' />
                  </div>
                  <h1 className='smaller-font mb-0'>Personal information</h1>
                </div>
                <div className='mt-3 d-flex mb-3 fd-c'>
                  <div className='d-flex'>
                    <div>
                      <h4>Firstname:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.firstname
                          ? selectedOrder?.firstname
                          : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>Lastname:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.lastname
                          ? selectedOrder?.lastname
                          : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>E-mail:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.email ? selectedOrder?.email : '-'}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-5 prl'>
              <div className='d-flex fd-c'>
                <div className='d-flex f-ac'>
                  <div style={{ marginTop: '5px' }}>
                    <Delivery size={'32'} className='mr-2' />
                  </div>
                  <h1 className='smaller-font mb-0'>Shipping details</h1>
                </div>
                <div className='mt-3 d-flex mb-3 fd-c'>
                  <div className='d-flex'>
                    <div>
                      <h4>Country:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.country ? selectedOrder?.country : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>State:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.state ? selectedOrder?.state : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>City:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.city ? selectedOrder?.city : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>Address:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.address ? selectedOrder?.address : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>House number:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.apartementNumber
                          ? selectedOrder?.apartementNumber
                          : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div>
                      <h4>PLZ:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.plz ? selectedOrder?.plz : '-'}
                      </h4>
                    </div>
                  </div>
                  <div className='d-flex mt-2'>
                    <div>
                      <h4>Shipped:</h4>
                    </div>
                    <div>
                      <h4 className='text-bold ml-1 h4'>
                        {selectedOrder?.sentToShippingCompany ? 'Yes' : 'No'}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*           <div className='mt-2'>
            <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-5 prl'>
              <div className='d-flex fd-c'>
                <div className='d-flex f-ac'>
                  <div style={{ marginTop: '5px' }}>
                    <Purchase size={'32'} className='mr-2' />
                  </div>
                  <h1 className='smaller-font mb-0'>Payment details</h1>
                </div>
                <div className='mt-3 d-flex mb-3 fd-c'>
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
                          <h4>City:</h4>
                        </div>
                        <div>
                          <h4 className='text-bold ml-1 h4'>
                            {selectedOrder?.city ? selectedOrder?.city : '-'}
                          </h4>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div>
                          <h4>Address:</h4>
                        </div>
                        <div>
                          <h4 className='text-bold ml-1 h4'>
                            {selectedOrder?.address
                              ? selectedOrder?.address
                              : '-'}
                          </h4>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div>
                          <h4>House number:</h4>
                        </div>
                        <div>
                          <h4 className='text-bold ml-1 h4'>
                            {selectedOrder?.apartementNumber
                              ? selectedOrder?.apartementNumber
                              : '-'}
                          </h4>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div>
                          <h4>PLZ:</h4>
                        </div>
                        <div>
                          <h4 className='text-bold ml-1 h4'>
                            {selectedOrder?.plz ? selectedOrder?.plz : '-'}
                          </h4>
                        </div>
                      </div>
                      <div className='d-flex mt-2'>
                        <div>
                          <h4>Shipped:</h4>
                        </div>
                        <div>
                          <h4 className='text-bold ml-1 h4'>
                            {selectedOrder?.sentToShippingCompany
                              ? 'Yes'
                              : 'No'}
                          </h4>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div> */}
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
export default OrderDetails;
