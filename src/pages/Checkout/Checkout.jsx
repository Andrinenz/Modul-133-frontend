/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Input, InputNumber, Select, Steps, Button } from 'antd';
import ProductItem from './assets/ProductItem';
import { Country, State, City } from 'country-state-city';
import './Checkout.scss';
import { useState } from 'react';
import PersonalInformation from './assets/PersonalInformations';
import ShippingInformations from './assets/ShippingInformations';
import Payment from './assets/Payment';

/*----------------------------------------------------------------------------*/
/* Checkout                                                                   */
/*----------------------------------------------------------------------------*/

const Checkout = () => {
  const steps = [
    { title: 'Personal Informations', content: <PersonalInformation /> },
    { title: 'Shipping details', content: <ShippingInformations /> },
    { title: 'Payment', content: <Payment /> },
  ];

  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
  };
  const prevStep = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const generateCountryOptions = (options) => {
    let data = [];
    options.forEach((country) => {
      data.push({
        label: country.label,
        value: country.label,
      });
    });
    return data;
  };

  const countries = Country.getAllCountries();

  console.log(countries);

  return (
    <>
      <div className='bx-wrap bcol-ibm-gray-10'>
        <div className='d-flex res-top fd-c cds--col-lg-11 pl-0 pr-0 h100p'>
          <h1 className='ml-3 mt-2 mb-0'>Checkout</h1>
          <div className='bcol-ibm-gray-20 mr-3 pt-2 pl-2 pr-2 ml-3 mt-1'>
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>
            <div className='mt-3 mb-2'>
              {current < steps.length - 1 && (
                <Button type='primary' onClick={() => nextStep()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type='primary'>Submit</Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={() => prevStep()}
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className='d-flex fd-c cds--col-lg-5 pl-0 pr-0 fixed-sidenav bcol-ibm-white'>
          <div className='title-box border-bottom f-jc f-ac mt-2'>
            <div className='d-flex f-ac f-jb'>
              <h2 className='pl-3'>Total</h2>
              <h2 className='text-bold pr-3'>300.-</h2>
            </div>
          </div>
          <ProductItem />
        </div>
      </div>
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Checkout;
