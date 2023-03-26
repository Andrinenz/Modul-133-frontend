/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getNewOrder } from '../../../state/newOrder/newOrderSelector';
import {
  checkIfValidInput,
  handleKeyUp,
} from '../../../state/newOrder/newOrderThrunk';
import { Country, State, City } from 'country-state-city';
import { newOrderConfig } from '../../../libs/newOrderConfig';

/*----------------------------------------------------------------------------*/
/* ShippingInformations                                                       */
/*----------------------------------------------------------------------------*/

const ShippingInformations = () => {
  const dispatch = useDispatch();

  const newOrder = useSelector(getNewOrder);
  const countries = Country.getAllCountries();

  const generateCountryOptions = (options) => {
    let data = [];
    options.forEach((country) => {
      data.push({
        label: country.name,
        value: country.name,
      });
    });
    return data;
  };

  const dropdownSelection = () => {
    return {
      statesEnabled: newOrder.country.value ? false : true,
      cityEnabled: newOrder.state.value ? false : true,
      addressEnabled:
        newOrder.country.value.trim().length === 0 ||
        newOrder.state.value.trim().length === 0,
      houseNumberEnabled:
        newOrder.country.value.trim().length === 0 ||
        newOrder.state.value.trim().length === 0,
      plzEnabled:
        newOrder.country.value.trim().length === 0 ||
        newOrder.state.value.trim().length === 0,
    };
  };

  const getCountryCode = (countryState, type) => {
    if (type === 'code') {
      const selectedCountry = countries.find(
        (country) => country.name === countryState
      );

      if (
        newOrderConfig?.isoCodes.includes(
          selectedCountry?.isoCode ? selectedCountry?.isoCode : ''
        )
      ) {
        return selectedCountry?.isoCode;
      } else {
        return 'any';
      }
    }

    if (type === 'state') {
      const selectedCountry = countries.find(
        (country) => country.name === countryState
      );
      return selectedCountry?.isoCode ? selectedCountry?.isoCode : '';
    }
  };

  const getStatesOfCountry = (countryId) => {
    let data = [];
    const states = State.getStatesOfCountry(countryId);
    states.forEach((state) => {
      data.push({
        label: state.name,
        value: state.name,
      });
    });
    return data;
  };

  const getCitiesOfState = (countryId) => {
    let data = [];
    const state = State.getStatesOfCountry(countryId).find(
      (state) => state.name === newOrder.state.value
    );
    const cities = City.getCitiesOfState(
      countryId,
      state?.isoCode ? state?.isoCode : ''
    );
    cities.forEach((city) => {
      data.push({
        label: city.name,
        value: city.name,
      });
    });
    return data;
  };

  return (
    <div className='mt-1 pt-1'>
      <div className=''>
        <h3 className='deco-underline mb-0'>Shipping details:</h3>
        <div className='cds--col-lg-7 mt-2 pl-0 pr-0'>
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
            options={generateCountryOptions(countries)}
            status={newOrder.country.invalid ? 'error' : ''}
            value={
              newOrder.country.value === '' ? null : newOrder.country.value
            }
            onChange={(e) => {
              dispatch(handleKeyUp(e, 'country', 'dropdown'));
              dispatch(checkIfValidInput(e, 'country', 'dropdown'));
            }}
          />
          {newOrder.country.invalid ? (
            <div className='pt-1' style={{ color: '#ff4d4f' }}>
              <h6>{newOrder.country.invalidText}</h6>
            </div>
          ) : null}
        </div>
        <div className='cds--col-lg-7 mt-1 pl-0 pr-0'>
          <h5>State:</h5>
          <Select
            showSearch
            className='w100p'
            size='large'
            placeholder='State'
            disabled={dropdownSelection().statesEnabled}
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={getStatesOfCountry(
              getCountryCode(newOrder.country.value, 'state')
            )}
            value={newOrder.state.value === '' ? null : newOrder.state.value}
            onChange={(e) => {
              dispatch(handleKeyUp(e, 'state', 'dropdown'));
              dispatch(checkIfValidInput(e, 'state', 'dropdown'));
            }}
          />
          {newOrder.state.invalid ? (
            <div className='pt-1' style={{ color: '#ff4d4f' }}>
              <h6>{newOrder.state.invalidText}</h6>
            </div>
          ) : null}
        </div>
        <div className='cds--col-lg-7 mt-1 pl-0 pr-0'>
          <h5>City:</h5>
          <Select
            showSearch
            className='w100p'
            size='large'
            placeholder='City'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={newOrder.city.value === '' ? null : newOrder.city.value}
            disabled={dropdownSelection().cityEnabled}
            options={getCitiesOfState(
              getCountryCode(newOrder.country.value, 'state')
            )}
            onChange={(e) => {
              dispatch(handleKeyUp(e, 'city', 'dropdown'));
              dispatch(checkIfValidInput(e, 'city', 'dropdown'));
            }}
          />
          {newOrder.city.invalid ? (
            <div className='pt-1' style={{ color: '#ff4d4f' }}>
              <h6>{newOrder.city.invalidText}</h6>
            </div>
          ) : null}
        </div>
        <div className='d-flex bx-wrap mt-2'>
          <div className='cds--col-lg-8 mr-1 pl-0 pr-0'>
            <h5>Address:</h5>
            <Input
              size='large'
              placeholder='Address'
              value={newOrder.address.value}
              status={newOrder.address.invalid ? 'error' : ''}
              onKeyDown={(e) => {
                if (
                  !(
                    e.key === 'Backspace' ||
                    e.key === 'Tab' ||
                    /^[a-zA-Z\söäüèé,-]+$/.test(e.key)
                  )
                ) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                dispatch(handleKeyUp(e, 'address', 'textinput'));
                dispatch(checkIfValidInput(e, 'address', 'textinput'));
              }}
              onBlur={(e) =>
                dispatch(checkIfValidInput(e, 'address', 'textinput'))
              }
              disabled={dropdownSelection().addressEnabled}
            />
            {newOrder.address.invalid ? (
              <div className='pt-1' style={{ color: '#ff4d4f' }}>
                <h6>{newOrder.address.invalidText}</h6>
              </div>
            ) : null}
          </div>
          <div className='ml-2 cds--col-lg-3 margin-res-top pl-0 pr-0'>
            <h5>House number:</h5>
            <Input
              className='w100p'
              size='large'
              placeholder='House number'
              onKeyDown={(e) => {
                if (
                  !(
                    e.key === 'Backspace' ||
                    e.key === 'Tab' ||
                    /^\d+$/.test(e.key)
                  )
                ) {
                  e.preventDefault();
                }
              }}
              value={newOrder.apartementNumber.value}
              status={newOrder.apartementNumber.invalid ? 'error' : ''}
              onChange={(e) => {
                dispatch(handleKeyUp(e, 'apartementNumber', 'textinput'));
                dispatch(checkIfValidInput(e, 'apartementNumber', 'textinput'));
              }}
              onBlur={(e) => {
                dispatch(checkIfValidInput(e, 'apartementNumber', 'textinput'));
              }}
              disabled={dropdownSelection().houseNumberEnabled}
            />
            {newOrder.apartementNumber.invalid ? (
              <div className='pt-1' style={{ color: '#ff4d4f' }}>
                <h6>{newOrder.apartementNumber.invalidText}</h6>
              </div>
            ) : null}
          </div>
          <div className='ml-2 cds--col-lg-3 margin-res-top pl-0 pr-0'>
            <h5>PLZ:</h5>
            <Input
              className='w100p margin-top'
              size='large'
              placeholder='PLZ'
              value={newOrder.plz.value}
              status={newOrder.plz.invalid ? 'error' : ''}
              onChange={(e) => {
                dispatch(handleKeyUp(e, 'plz', 'textinput'));
                dispatch(
                  checkIfValidInput(e, 'plz', 'textinput', {
                    local: getCountryCode(newOrder.country.value, 'code'),
                  })
                );
              }}
              onBlur={(e) =>
                dispatch(
                  checkIfValidInput(e, 'plz', 'textinput', {
                    local: getCountryCode(newOrder.country.value, 'code'),
                  })
                )
              }
              disabled={dropdownSelection().plzEnabled}
            />
            {newOrder.plz.invalid ? (
              <div className='pt-1' style={{ color: '#ff4d4f' }}>
                <h6>{newOrder.plz.invalidText}</h6>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ShippingInformations;
