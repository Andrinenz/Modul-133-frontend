/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import './Dashboard.scss';
import { Tabs } from 'antd';
import User from './assets/User';
import Products from './assets/Products';
import Orders from './assets/Orders';
import Stats from './assets/Stats';
import { useDispatch } from 'react-redux';

/*----------------------------------------------------------------------------*/
/* Dashboard                                                                  */
/*----------------------------------------------------------------------------*/

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className='pt-4 pl-0 cds--offset-lg-3 cds--col-lg-10'>
      <h1>Dashboard</h1>
      <div className='mt-2'>
        <Tabs
          type='card'
          size='large'
          className='ant-tabs-nav'
          items={[
            { key: 'users', children: <User />, label: 'Users' },
            { key: 'products', children: <Products />, label: 'Products' },
            { key: 'orders', children: <Orders />, label: 'Orders' },
            { key: 'stats', children: <Stats />, label: 'Stats' },
          ]}
        />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Dashboard;
