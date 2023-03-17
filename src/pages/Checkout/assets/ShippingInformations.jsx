/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Select, Input, InputNumber } from 'antd';

/*----------------------------------------------------------------------------*/
/* ShippingInformations                                                       */
/*----------------------------------------------------------------------------*/

const ShippingInformations = () => {
  return (
    <div className='mt-1 pt-1'>
      <div className=''>
        <h3 className='deco-underline mb-0'>Shipping details:</h3>
        <div className='d-flex bx-wrap mt-2'>
          <div className='cds--col-lg-8 mr-1 pl-0 pr-0'>
            <h5>Address:</h5>
            <Input size='large' placeholder='Address' />
          </div>
          <div className='ml-2 cds--col-lg-3 margin-res-top pl-0 pr-0'>
            <h5>House number:</h5>
            <InputNumber
              className='w100p'
              size='large'
              placeholder='House number'
            />
          </div>
          <div className='ml-2 cds--col-lg-3 margin-res-top pl-0 pr-0'>
            <h5>PLZ:</h5>
            <InputNumber
              className='w100p margin-top'
              size='large'
              placeholder='PLZ'
            />
          </div>
          <div className='cds--col-lg-7 mt-1 pl-0 pr-0'>
            <h5>Country:</h5>
            <Select
              showSearch
              className='w100p'
              size='large'
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              placeholder='Search for a country'
            />
          </div>
        </div>
        <div className='cds--col-lg-7 mt-1 pl-0 pr-0'>
          <h5>State:</h5>
          <Select
            showSearch
            className='w100p'
            size='large'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            placeholder='State'
          />
        </div>
        <div className='cds--col-lg-7 mt-1 pl-0 pr-0'>
          <h5>City:</h5>
          <Select
            showSearch
            className='w100p'
            size='large'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            placeholder='City'
          />
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ShippingInformations;
