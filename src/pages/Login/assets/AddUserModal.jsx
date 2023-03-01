/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchCreateUser } from '../../../state/user/userThrunk.js';
import validator from 'validator';

/*----------------------------------------------------------------------------*/
/* AdduserModal                                                               */
/*----------------------------------------------------------------------------*/

const AddUserModal = (props) => {
  let defaultData = {
    firstname: '',
    lastname: '',
    password: '',
    isAdmin: false,
    email: '',
  };

  const handleOnClose = () => {
    props.handleModalClose();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ ...defaultData });

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

  const handleSubmit = () => {
    dispatch(fetchCreateUser(data, navigate));
  };

  const disableBtn = () => {
    if (
      validator.isEmail(data.email) &&
      data.email !== '' &&
      data.firstname !== '' &&
      data.lastname !== '' &&
      data.password !== ''
    ) {
      return false;
    } else return true;
  };

  return (
    <div>
      <Modal
        title='Create user login'
        open={props.modalOpen}
        onCancel={handleOnClose}
        footer={
          <div>
            <Button onClick={handleOnClose}>Cancel</Button>
            <Button
              disabled={disableBtn()}
              type='primary'
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        }
        afterClose={() => setData(defaultData)}
      >
        <div className=''>
          <div className='d-flex bx-wrap f-jb mt-2'>
            <div className='d-flex pl-0 pr-0'>
              <div>
                <h5>Firstname:</h5>
                <Input
                  placeholder='firstname'
                  value={data.firstname}
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
                  value={data.lastname}
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
                value={data.email}
                onChange={(e) => handleKeyUp(e, 'email', 'textinput')}
                size='large'
              />
            </div>
            <div className='mt-1 mb-2'>
              <h5>Password:</h5>
              <Input.Password
                placeholder='password'
                value={data.password}
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
