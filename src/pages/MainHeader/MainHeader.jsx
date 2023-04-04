/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import './MainHeader.scss';
import { ShoppingCart, Logout, User } from '@carbon/icons-react';
import { Badge } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../state/user/userSelector';
import { logoutUser } from '../../state/user/userSlice';
import { getCard } from '../../state/card/cardSelector';
import { fetchCardsFromUser } from '../../state/card/cardThrunk';
import { reset } from '../../state/card/cardSlice';
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
  Theme,
} from '@carbon/react';
import { Link } from 'react-router-dom';

/*----------------------------------------------------------------------------*/
/* MainHeader                                                                 */
/*----------------------------------------------------------------------------*/

const MainHeader = () => {
  const { user, loaded } = useSelector(getUser);
  const { cardByUser } = useSelector(getCard);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate('/logout');
    dispatch(logoutUser());
    localStorage.removeItem('accessToken');
    dispatch(reset());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (user && loaded) {
      dispatch(fetchCardsFromUser());
    }
  }, [dispatch, loaded, user]);

  return (
    <>
      <Theme theme={'white'}>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label='Template'>
              <SkipToContent />
              <HeaderMenuButton
                aria-label='Open menu'
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName element={Link} to='/' prefix='TBZ'>
                Webshop M133
              </HeaderName>
              <HeaderNavigation aria-label='Webshop M133' className=''>
                <HeaderMenuItem
                  element={Link}
                  to='/products'
                  className='borderHeaders'
                >
                  Products
                </HeaderMenuItem>
                <HeaderMenuItem
                  element={Link}
                  to='/orders'
                  className='borderHeaders'
                >
                  Orders
                </HeaderMenuItem>
                {user?.isAdmin && (
                  <>
                    <HeaderMenuItem
                      element={Link}
                      to='/dashboard'
                      className='borderHeaders'
                    >
                      Dashboard
                    </HeaderMenuItem>
                  </>
                )}
              </HeaderNavigation>

              <HeaderGlobalBar>
                <HeaderGlobalAction
                  onClick={() => navigate('/cart')}
                  aria-label='Cart'
                >
                  <Badge count={cardByUser.length}>
                    <ShoppingCart size={'20'} />
                  </Badge>
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label={
                    user?.isAdmin
                      ? 'Admin'
                      : user === null
                      ? 'Not logged in'
                      : 'User'
                  }
                  onClick={() => navigate(`/profile/${user?.id}`)}
                  tooltipAlignment='end'
                >
                  <User size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label={loaded && user ? 'Logout' : 'Login'}
                  tooltipAlignment={'end'}
                  onClick={loaded && user ? handleLogout : handleLogin}
                >
                  <Logout size='20' />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label='navigation'
                expanded={isSideNavExpanded}
                isPersistent={false}
                onOverlayClick={onClickSideNavExpand}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <>
                      <HeaderMenuItem element={Link} to='/products'>
                        Products
                      </HeaderMenuItem>
                      <HeaderMenuItem element={Link} to='/orders'>
                        Orders
                      </HeaderMenuItem>
                      <>
                        <HeaderMenuItem element={Link} to='/dashboard'>
                          Dashboard
                        </HeaderMenuItem>
                      </>
                    </>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
            </Header>
          )}
        />
      </Theme>
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default MainHeader;
