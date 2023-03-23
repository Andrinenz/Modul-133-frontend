/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Loading } from '@carbon/react';
import Table from 'ant-responsive-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getOrder } from '../../state/order/orderSelector';
import { fetchUserOrders } from '../../state/order/orderThrunk';
import './UserOrders.scss';

/*----------------------------------------------------------------------------*/
/* UserOrders                                                                 */
/*----------------------------------------------------------------------------*/

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ordersByUser, loadedUserOrders } = useSelector(getOrder);

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Shipped',
      dataIndex: 'shipped',
      key: 'shipped',
      showOnResponse: true,
      showOnDesktop: true,
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

  const generateTableData = (orders) => {
    let data = [];
    orders.forEach((order) => {
      data.push({
        key: order.id.toString(),
        firstname: order?.firstname,
        lastname: order?.lastname,
        email: order?.email,
        totalAmount: order?.totalAmount + '.-',
        shipped: order?.sentToShippingCompany ? 'Yes' : 'No',
      });
    });
    return data;
  };

  const handleOnClick = (record) => {
    let id = record.key;
    navigate(`/orders/myOrder/${id}`);
  };

  return (
    <>
      {loadedUserOrders ? (
        <div className='pt-4 pl-0 cds--offset-lg-3 cds--col-lg-10'>
          <h1>Your Orders</h1>
          <div className='bcol-ibm-white'>
            <div className='pt-2 pl-2 pr-2 mt-2'>
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
              <div className='mt-3 pb-4'>
                <Table
                  antTableProps={{
                    pagination: false,
                    columns,
                    onRow: (record, rowIndex) => {
                      return {
                        onClick: () => handleOnClick(record),
                      };
                    },
                    dataSource: generateTableData(ordersByUser),
                    className: 'w100p pointer',
                  }}
                  mobileBreakPoint={610}
                />
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
