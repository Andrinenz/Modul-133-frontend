/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { DonutChart } from '@carbon/charts-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../../../state/dashboard/dashboardSelectors';
import { fetchUsers } from '../../../../state/dashboard/dashboardThrunk';
import '@carbon/charts/styles.css';
import './Stats.scss';

/*----------------------------------------------------------------------------*/
/* Stats                                                                      */
/*----------------------------------------------------------------------------*/

const Stats = () => {
  const dispatch = useDispatch();

  const { users, orders, loadedOrders, loadedUser } = useSelector(getDashboard);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let options = {
    title: 'Active users',
    resizable: true,
    donut: {
      alignment: 'center',
      center: {
        label: 'Users',
      },
    },
    height: '400px',
  };

  let options2 = {
    title: 'Orders',
    resizable: true,
    donut: {
      alignment: 'center',
      center: {
        label: 'Orders',
      },
    },
    height: '400px',
  };

  const generateChartData = (users, type, orders) => {
    if (type === 'users') {
      let data = [];
      let adminUsers = users.filter((user) => user.isAdmin);
      let usersChart = users.filter((user) => !user.isAdmin);
      data.push(
        { group: 'Admins', value: adminUsers.length },
        { group: 'Users', value: usersChart.length }
      );
      return data;
    }

    if (type === 'orders') {
      let data = [];
      let shipped = orders.filter((order) => order.sentToShippingCompany);
      let ordersChart = orders.filter((order) => !order.sentToShippingCompany);
      data.push(
        { group: 'Shipped', value: shipped.length },
        { group: 'To be shipped', value: ordersChart.length }
      );
      return data;
    }
  };

  return (
    <>
      {loadedUser && loadedOrders && (
        <div className='bcol-ibm-white pl-2 pt-3 pb-3 pr-2'>
          <h1>Stats</h1>
          <div className='d-flex f-jb bx-wrap mt-2'>
            <div className='d-flex pl-0 pr-0 cds--col-lg-7'>
              <DonutChart
                data={generateChartData(users, 'users')}
                options={options}
              />
            </div>
            <div className='border' />
            <div className='d-flex pl-0 pr-0 cds--col-lg-7'>
              <DonutChart
                data={generateChartData(users, 'orders', orders)}
                options={options2}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Stats;
