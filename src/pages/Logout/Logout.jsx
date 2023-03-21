/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { GroupAccess } from '@carbon/icons-react';
import { useNavigate } from 'react-router';
import './Logout.scss';

/*----------------------------------------------------------------------------*/
/* Logout                                                                     */
/*----------------------------------------------------------------------------*/

const Logout = () => {
  let navigate = useNavigate();

  return (
    <div className='title-wrapper center d-flex fd-c logout-wrapper'>
      <GroupAccess size='32' className='logoutSiteIcon' />
      <h1 className='center'>You are now logged out</h1>
      <h4>Thanks for visiting our webshop</h4>

      <p
        className='cursor-pointer decoration-underline'
        style={{ color: '#0f62fe' }}
        onClick={(e) => navigate('/login')}
      >
        Login
      </p>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Logout;
