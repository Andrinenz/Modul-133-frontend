/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Input, Modal } from 'antd';
import { useState } from 'react';

/*----------------------------------------------------------------------------*/
/* AdduserModal                                                               */
/*----------------------------------------------------------------------------*/

const AddUserModal = (props) => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    isAdmin: false,
    email: '',
  });

  const handleKeyUp = (event, type, inputType) => {
    let dataTemp = { ...data };
    switch (inputType) {
      case 'textinput':
        dataTemp[type] = event.target.value;
        break;
      default:
        break;
    }
    setData(dataTemp);
  };

  console.log(data);

  return (
    <div>
      <Modal
        title='Create user login'
        open={props.modalOpen}
        onCancel={props.onClose}
        okText='Submit'
      >
        <div className=''>
          <div className='d-flex bx-wrap f-jb mt-2'>
            <div className='d-flex pl-0 pr-0'>
              <div>
                <h5>Firstname:</h5>
                <Input
                  placeholder='firstname'
                  onChange={(e) => handleKeyUp(e, 'firstname', 'textinput')}
                  size={'large'}
                />
              </div>
            </div>
            <div className='d-flex pl-0 pr-0'>
              <div>
                <h5>Lastname:</h5>
                <Input
                  placeholder='lastname'
                  onChange={(e) => handleKeyUp(e, 'lastname', 'textinput')}
                  size={'large'}
                />
              </div>
            </div>
          </div>
          <div className='d-flex fd-c bx-wrap'>
            <div className='mt-2'>
              <h5>Email:</h5>
              <Input
                placeholder='email'
                onChange={(e) => handleKeyUp(e, 'email', 'textinput')}
                size='large'
              />
            </div>
            <div className='mt-1 mb-2'>
              <h5>Password:</h5>
              <Input.Password
                placeholder='password'
                onChange={(e) => handleKeyUp(e, 'password', 'textinput')}
                size='large'
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default AddUserModal;
