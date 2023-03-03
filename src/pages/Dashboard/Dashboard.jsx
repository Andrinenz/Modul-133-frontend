/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import './Dashboard.scss';
import { Tabs } from 'antd';
import User from './assets/User';
import Products from './assets/Products';
import Orders from './assets/Orders';
import { getDashboard } from '../../state/dashboard/dashboardSelectors.js';
import Stats from './assets/Stats';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../../state/dashboard/dashboardThrunk';
import { Loading } from '@carbon/react';

/*----------------------------------------------------------------------------*/
/* Dashboard                                                                  */
/*----------------------------------------------------------------------------*/

const Dashboard = () => {
  const dispatch = useDispatch();

  const { users, loadedUser } = useSelector(getDashboard);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {loadedUser ? (
        <div className='pt-4 pl-0 cds--offset-lg-3 cds--col-lg-10'>
          <h1>Dashboard</h1>
          <div className='mt-2'>
            <Tabs
              type='card'
              size='large'
              className='ant-tabs-nav'
              items={[
                {
                  key: 'users',
                  children: <User data={users} />,
                  label: 'Users',
                },
                { key: 'products', children: <Products />, label: 'Products' },
                { key: 'orders', children: <Orders />, label: 'Orders' },
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
