/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/user/userThrunk.js';
import React from 'react';
import './Login.scss';
import { Button, Input } from 'antd';
import { User } from '@carbon/icons-react';
import { useNavigate } from 'react-router';
import validator from 'validator';
import AddUserModal from './assets/AddUserModal.jsx';
import { getUser } from '../../state/user/userSelector.js';

/*----------------------------------------------------------------------------*/
/* Login                                                                      */
/*----------------------------------------------------------------------------*/

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { buttonLoading } = useSelector(getUser);

  const [mail, setMail] = useState('');
  const [passw, setPassw] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOnClick = () => {
    dispatch(login(mail, passw, false, navigate, dispatch));
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    return;
  };

  return (
    <div className='d-flex f-jc pt-6'>
      <AddUserModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose.bind(this)}
      />
      <div className='cds--col-lg-9 pl-4 pr-4 box-login'>
        <div className='pt-3'>
          <div className='d-flex f-jc'>
            <h1 className='text-bold'>Login</h1>
          </div>
          <div className='pt-2'>
            <div>
              <h5>Email:</h5>
            </div>
            <Input
              placeholder='email'
              prefix={<User />}
              size={'large'}
              status={
                mail !== ''
                  ? !validator.isEmail(mail) || mail.trim() === ''
                    ? 'error'
                    : ''
                  : ''
              }
              onChange={(e) => setMail(e.target.value)}
            />
            {mail !== '' ? (
              !validator.isEmail(mail) || mail.trim() === '' ? (
                <div className='pt-1' style={{ color: '#ff4d4f' }}>
                  <h6>Field has to be an email</h6>
                </div>
              ) : null
            ) : null}
          </div>
          <div className='pt-3'>
            <div>
              <h5>Password:</h5>
            </div>
            <Input.Password
              placeholder='password'
              size={'large'}
              onChange={(e) => setPassw(e.target.value)}
            />
          </div>
        </div>
        <div className='d-flex f-je pt-3'>
          <div className='mr-2'>
            <Button size='large' onClick={() => handleModalOpen()}>
              Sign up
            </Button>
          </div>
          <div>
            <Button
              type='primary'
              size={'large'}
              disabled={
                validator.isEmail(mail) && mail !== '' && passw !== ''
                  ? false
                  : true
              }
              onClick={() => handleOnClick()}
              loading={buttonLoading}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Login;
