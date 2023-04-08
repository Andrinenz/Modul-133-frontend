/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Delivery } from '@carbon/icons-react';

/*----------------------------------------------------------------------------*/
/* Shipping                                                                   */
/*----------------------------------------------------------------------------*/

const Shipping = (props) => {
  const selectedOrder = props.data;

  return (
    <div className='mt-2'>
      <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-5 prl'>
        <div className='d-flex fd-c'>
          <div className='d-flex f-ac'>
            <div style={{ marginTop: '5px' }}>
              <Delivery size={'32'} className='mr-2' />
            </div>
            <h1 className='smaller-font mb-0'>Shipping details</h1>
          </div>
          <div className='mt-3 d-flex mb-3 fd-c'>
            <div className='d-flex'>
              <div>
                <h4>Country:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.country ? selectedOrder?.country : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>State:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.state ? selectedOrder?.state : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>City:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.city === 'null' ? '-' : selectedOrder?.city}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>Address:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.address ? selectedOrder?.address : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>House number:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.apartementNumber
                    ? selectedOrder?.apartementNumber
                    : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <h4>PLZ:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.plz ? selectedOrder?.plz : '-'}
                </h4>
              </div>
            </div>
            <div className='d-flex mt-2'>
              <div>
                <h4>Shipped:</h4>
              </div>
              <div>
                <h4 className='text-bold ml-1 h4'>
                  {selectedOrder?.sentToShippingCompany ? 'Yes' : 'No'}
                </h4>
              </div>
            </div>
            <div className='d-flex mt-1'>
              <div>
                <h4>Cost:</h4>
              </div>
              <div>
                <h4 className='ml-1 text-bold'>25.-</h4>
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
export default Shipping;
