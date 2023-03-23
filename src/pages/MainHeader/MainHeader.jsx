/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import './MainHeader.scss';
import {
  ShoppingCart,
  VisualRecognition,
  Dashboard,
  Logout,
  Login,
  OrderDetails,
} from '@carbon/icons-react';
import { Badge, Layout, Menu } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../state/user/userSelector';
import { logoutUser } from '../../state/user/userSlice';
const { Header } = Layout;

/*----------------------------------------------------------------------------*/
/* MainHeader                                                                 */
/*----------------------------------------------------------------------------*/

const MainHeader = () => {
  const { user, loaded } = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogOut = () => {
    navigate('/logout');
    dispatch(logoutUser());
    localStorage.removeItem('accessToken');
  };

  let items = [
    loaded && user
      ? {
          key: '2',
          icon: <VisualRecognition />,
          label: 'Products',
          className: 'NavProducts',
          path: '/products',
          onClick: () => {
            navigate('/products');
          },
        }
      : null,
    user?.isAdmin
      ? {
          key: '5',
          icon: <Dashboard />,
          label: 'Dashboard',
          path: '/dashboard',
          onClick: () => {
            navigate('/dashboard');
          },
        }
      : null,
    {
      key: '45',
      icon: <OrderDetails />,
      label: 'Orders',
      path: '/orders',
      onClick: () => {
        navigate('/orders');
      },
    },
    loaded && user
      ? {
          key: '3',
          icon: (
            <Badge count={2}>
              <ShoppingCart size={'20'} />
            </Badge>
          ),
          className: 'NavCart',
          path: '/cart',
          onClick: () => {
            navigate('/cart');
          },
        }
      : null,
    loaded && user
      ? {
          key: '7',
          icon: <Logout />,
          label: 'Logout',
          path: '/logout',
          className: 'my-menu',
          onClick: () => {
            handleLogOut();
          },
        }
      : {
          key: '5',
          icon: <Login />,
          label: 'Login/Sign up',
          path: '/login',
          onClick: () => {
            navigate('/login');
          },
        },
  ];

  const selectedKey =
    items.find((item) => item?.path === location.pathname)?.key || '';

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Menu
          theme='dark'
          mode='horizontal'
          className='my-menu-whole'
          selectedKeys={[selectedKey]}
          items={items}
        />
      </Header>
    </Layout>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default MainHeader;
