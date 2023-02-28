/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../state/user/userThrunk.js';
import React from 'react';
import './Login.scss';
import { Button, Input } from 'antd';
import { User } from '@carbon/icons-react';
import { useNavigate } from 'react-router';

/*----------------------------------------------------------------------------*/
/* Login                                                                      */
/*----------------------------------------------------------------------------*/

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mail, setMail] = useState('');
  const [passw, setPassw] = useState('');

  const handleOnClick = () => {
    dispatch(login(mail, passw, false));
    navigate('/products');
  };

  console.log(mail);

  return (
    <div className='d-flex f-jc pt-6'>
      <div className='cds--col-lg-9 pl-4 pr-4 box'>
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
              onChange={(e) => setMail(e.target.value)}
            />
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
            <Button size='large'>Sign up</Button>
          </div>
          <div>
            <Button
              type='primary'
              size={'large'}
              onClick={() => handleOnClick()}
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
