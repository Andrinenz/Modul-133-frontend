/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Input } from 'antd';

/*----------------------------------------------------------------------------*/
/* PersonalInformation                                                                   */
/*----------------------------------------------------------------------------*/

const PersonalInformation = () => {
  return (
    <div className='mt-1 pt-1'>
      <h3 className='deco-underline mb-0'>Personal details:</h3>
      <div className='d-flex f-jb mt-2 mr-1'>
        <div className='cds--col-lg-7 mr-1 pl-0 pr-0'>
          <h5>Firstname:</h5>
          <Input size='large' placeholder='Firstname' />
        </div>
        <div className='cds--col-lg-7 ml-1 pl-0 pr-0'>
          <h5>Lastname:</h5>
          <Input size='large' placeholder='Lastname' />
        </div>
      </div>
      <div className='cds--col-lg-7 pl-0 pr-0 mt-1 mr-1'>
        <h5>Email:</h5>
        <Input size='large' placeholder='Email' />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default PersonalInformation;
