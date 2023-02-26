/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../state/user/userSelector.js';

/*----------------------------------------------------------------------------*/
/* RequireAuth                                                                */
/*----------------------------------------------------------------------------*/

const RequireAuth = (props) => {
  const { roles, alwaysTrue } = props;
  const { loaded, user } = useSelector(getUser);

  if (alwaysTrue) return props.children;
  if (!loaded) return null;

  if (!user) return <Navigate to='/login' replace />;

  if (!roles) {
    return props.children;
  }

  if ((roles.includes('Admin') && user.isAdmin) || roles.includes(user.type)) {
    return props.children;
  }

  return <Navigate to='/' replace />;
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default RequireAuth;
