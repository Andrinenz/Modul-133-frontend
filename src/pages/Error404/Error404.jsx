/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import './Error404.scss';
import { Link } from 'react-router-dom';
import { DataError } from '@carbon/icons-react';

/*----------------------------------------------------------------------------*/
/* Error404                                                                   */
/*----------------------------------------------------------------------------*/

const Error404 = () => {
  return (
    <div className='mh100 d-flex f-jc'>
      <div className='d-flex fd-c f-ac mt-6'>
        <DataError size='32' className='error404Icon mb-4' />

        <h1 className='mb-1'>Error 404</h1>
        <h3 className='mb-1'>Your page can't be found</h3>

        <p className='cursor-pointer'>
          <Link className='direction-home' to='/'>
            Back to Homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Error404;
