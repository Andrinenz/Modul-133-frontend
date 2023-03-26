/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import './Dashboard.scss';
import { Tabs } from 'antd';
import User from './assets/User/User';
import Products from './assets/Products/Products';
import Orders from './assets/Orders/Orders';
import Stats from './assets/Stats/Stats';
import { getDashboard } from '../../state/dashboard/dashboardSelectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders, fetchUsers } from '../../state/dashboard/dashboardThrunk';
import { Loading } from '@carbon/react';

/*----------------------------------------------------------------------------*/
/* Dashboard                                                                  */
/*----------------------------------------------------------------------------*/

const Dashboard = () => {
  const dispatch = useDispatch();

  const { users, orders, loadedOrders, loadedUser } = useSelector(getDashboard);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      {loadedUser && loadedOrders ? (
        <div className='pt-4 h100p pl-0 cds--offset-lg-3 cds--col-lg-10'>
          <h1>Dashboard</h1>
          <div className='mt-2'>
            <Tabs
              type='card'
              size='large'
              className='ant-tabs-nav'
              items={[
                {
                  key: 'orders',
                  children: <Orders data={orders} />,
                  label: 'Orders',
                },
                { key: 'products', children: <Products />, label: 'Products' },
                {
                  key: 'users',
                  children: <User data={users} />,
                  label: 'Users',
                },
                { key: 'stats', children: <Stats />, label: 'Stats' },
              ]}
            />
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
export default Dashboard;
