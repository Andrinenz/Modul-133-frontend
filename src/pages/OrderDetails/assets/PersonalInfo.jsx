/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { UserProfile } from '@carbon/icons-react';

/*----------------------------------------------------------------------------*/
/* PersonalInfo                                                               */
/*----------------------------------------------------------------------------*/

const PersonalInfo = (props) => {
  const selectedOrder = props.data;

  return (
    <div className='mt-3'>
      <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-5 prl'>
        <div className='d-flex fd-c'>
          <div className='d-flex f-ac'>
            <div style={{ marginTop: '5px' }}>
              <UserProfile size={'32'} className='mr-2' />
            </div>
            <h1 className='smaller-font mb-0'>Personal information</h1>
          </div>
          <div className='mt-3 d-flex mb-3 fd-c'>
            <div className='d-flex'>
              <div>
                <h4>Firstname:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.firstname ? selectedOrder?.firstname : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>Lastname:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.lastname ? selectedOrder?.lastname : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>E-mail:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.email ? selectedOrder?.email : '-'}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default PersonalInfo;
