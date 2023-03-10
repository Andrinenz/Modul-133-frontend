/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Button, Input, Modal, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { getDashboard } from '../../../../state/dashboard/dashboardSelectors';
import { fetchUpdateUser } from '../../../../state/dashboard/dashboardThrunk';

/*----------------------------------------------------------------------------*/
/* EditUserModal                                                              */
/*----------------------------------------------------------------------------*/

const EditUserModal = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector(getDashboard);

  const selectedUser = users.find((user) => user.id === props.modalOpen.userId);

  const [data, setData] = useState({
    firstname: selectedUser?.firstname,
    lastname: selectedUser?.lastname,
    isAdmin: selectedUser?.isAdmin,
    email: selectedUser?.email,
  });

  useEffect(() => {
    setData({
      firstname: selectedUser?.firstname,
      lastname: selectedUser?.lastname,
      isAdmin: selectedUser?.isAdmin,
      email: selectedUser?.email ? selectedUser?.email : '',
    });
  }, [selectedUser]);

  const handleKeyUp = (event, type, inputType) => {
    let dataTemp = { ...data };
    switch (inputType) {
      case 'textinput':
        dataTemp[type] = event.target.value;
        break;
      case 'radio':
        dataTemp[type] = event.target.value;
        break;
      default:
        break;
    }
    setData(dataTemp);
  };

  const disableBtn = () => {
    if (
      data.firstname === '' ||
      data.lastname === '' ||
      !validator.isEmail(data.email)
    ) {
      return true;
    } else return false;
  };

  const handleOnClose = () => {
    props.handleModalClose();
  };

  const handleSubmit = () => {
    dispatch(fetchUpdateUser({ ...data, id: props.modalOpen.userId }));
    handleOnClose();
  };

  return (
    <div>
      {data.email ? (
        <>
          <Modal
            title='Edit User'
            open={props.modalOpen.open}
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
            onCancel={() => handleOnClose()}
          >
            <div>
              <div className='d-flex bx-wrap f-jb mt-2'>
                <div className='d-flex pl-0 pr-0'>
                  <div>
                    <h5>Firstname:</h5>
                    <Input
                      placeholder='firstname'
                      value={data?.firstname}
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
                    status={
                      data.email !== ''
                        ? !validator.isEmail(data.email) ||
                          data.email.trim() === ''
                          ? 'error'
                          : ''
                        : ''
                    }
                    placeholder='email'
                    value={data.email}
                    onChange={(e) => handleKeyUp(e, 'email', 'textinput')}
                    size={'large'}
                  />
                  {data.email !== '' ? (
                    !validator.isEmail(data.email) ||
                    data.email.trim() === '' ? (
                      <div className='pt-1' style={{ color: '#ff4d4f' }}>
                        <h6>Field has to be an email</h6>
                      </div>
                    ) : null
                  ) : null}
                </div>
                <div className='mt-2 mb-2'>
                  <h5>Admin:</h5>
                  <Radio.Group
                    value={data.isAdmin}
                    onChange={(e) => handleKeyUp(e, 'isAdmin', 'radio')}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default EditUserModal;
