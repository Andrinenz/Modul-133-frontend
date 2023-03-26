/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIfValidInput,
  handleKeyUp,
} from '../../../state/newOrder/newOrderThrunk';
import { getNewOrder } from '../../../state/newOrder/newOrderSelector';

/*----------------------------------------------------------------------------*/
/* PersonalInformation                                                                   */
/*----------------------------------------------------------------------------*/

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const newOrder = useSelector(getNewOrder);

  return (
    <div className='mt-1 pt-1'>
      <h3 className='deco-underline mb-0'>Personal details:</h3>
      <div className='d-flex f-jb mt-2 mr-1'>
        <div className='cds--col-lg-7 mr-1 pl-0 pr-0'>
          <h5>Firstname:</h5>
          <Input
            size='large'
            placeholder='Firstname'
            value={newOrder.firstname.value}
            status={newOrder.firstname.invalid ? 'error' : ''}
            onChange={(e) => {
              dispatch(handleKeyUp(e, 'firstname', 'textinput'));
              dispatch(checkIfValidInput(e, 'firstname', 'textinput'));
            }}
            onBlur={(e) =>
              dispatch(checkIfValidInput(e, 'firstname', 'textinput'))
            }
          />
          {newOrder.firstname.invalid ? (
            <div className='pt-1' style={{ color: '#ff4d4f' }}>
              <h6>{newOrder.firstname.invalidText}</h6>
            </div>
          ) : null}
        </div>
        <div className='cds--col-lg-7 ml-1 pl-0 pr-0'>
          <h5>Lastname:</h5>
          <Input
            size='large'
            placeholder='Lastname'
            value={newOrder.lastname.value}
            status={newOrder.lastname.invalid ? 'error' : ''}
            onChange={(e) => {
              dispatch(handleKeyUp(e, 'lastname', 'textinput'));
              dispatch(checkIfValidInput(e, 'lastname', 'textinput'));
            }}
            onBlur={(e) =>
              dispatch(checkIfValidInput(e, 'lastname', 'textinput'))
            }
          />
          {newOrder.lastname.invalid ? (
            <div className='pt-1' style={{ color: '#ff4d4f' }}>
              <h6>{newOrder.lastname.invalidText}</h6>
            </div>
          ) : null}
        </div>
      </div>
      <div className='cds--col-lg-7 pl-0 pr-0 mt-1 mr-1'>
        <h5>Email for updates:</h5>
        <Input
          size='large'
          placeholder='Email'
          value={newOrder.email.value}
          status={newOrder.email.invalid ? 'error' : ''}
          onChange={(e) => {
            dispatch(handleKeyUp(e, 'email', 'textinput'));
            dispatch(
              checkIfValidInput(e, 'email', 'textinput', {
                onlyEmail: true,
              })
            );
          }}
          onBlur={(e) =>
            dispatch(
              checkIfValidInput(e, 'email', 'textinput', {
                onlyEmail: true,
              })
            )
          }
        />
        {newOrder.email.invalid ? (
          <div className='pt-1' style={{ color: '#ff4d4f' }}>
            <h6>{newOrder.email.invalidText}</h6>
          </div>
        ) : null}
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default PersonalInformation;
