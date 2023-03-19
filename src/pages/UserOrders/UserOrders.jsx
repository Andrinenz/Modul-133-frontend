/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Loading } from '@carbon/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../state/order/orderSelector';
import { fetchUserOrders } from '../../state/order/orderThrunk';

/*----------------------------------------------------------------------------*/
/* UserOrders                                                                 */
/*----------------------------------------------------------------------------*/

const UserOrders = () => {
  const dispatch = useDispatch();

  const { ordersByUser, loadedUserOrders } = useSelector(getOrder);

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
    },
  ];

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const isDateIn14Days = (dateArr) => {
    const today = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const datesInLast14Days = dateArr.filter((dateObj) => {
      const date = new Date(dateObj.createdAt);
      const diffInDays = Math.round(
        Math.abs((today - date) / millisecondsPerDay)
      );
      return diffInDays <= 14;
    });

    return datesInLast14Days;
  };

  return (
    <>
      {loadedUserOrders ? (
        <div className='pt-4 pl-0 cds--offset-lg-3 cds--col-lg-10'>
          {console.log(isDateIn14Days(ordersByUser))}
          <h1>Your Orders</h1>
          <div className='bcol-ibm-white'>
            <div className='pt-2 pl-2 mt-2'>
              <div className='d-flex f-jb'>
                <div className='d-flex pl-4 fd-c'>
                  <h5>Overall Orders</h5>
                  <h2 className='col-ibm-gray-50 mb-0 text-bold'>
                    {ordersByUser.length}
                  </h2>
                </div>
                <div className='d-flex fd-c pr-4'>
                  <h5>Orders in the last 14 days</h5>
                  <h2 className='col-ibm-gray-50 mb-0 text-bold'>
                    {isDateIn14Days(ordersByUser).length}
                  </h2>
                </div>
              </div>
              <div className='mt-2'>
                <h1>Table</h1>
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
export default UserOrders;
