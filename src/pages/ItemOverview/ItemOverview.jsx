/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { CloseOutline, ShoppingCart } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import { Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchCreateCard } from '../../state/card/cardThrunk';
import { getProduct } from '../../state/products/productsSelector';
import { resetProductById } from '../../state/products/productsSlice';
import { fetchProductById } from '../../state/products/productsThrunk';
import './ItemOverview.scss';
/*----------------------------------------------------------------------------*/
/* ItemOverview                                                                   */
/*----------------------------------------------------------------------------*/

const ItemOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams('id');

  const [data, setData] = useState({
    choosedSize: '',
  });

  const { productById, loadedById } = useSelector(getProduct);

  useEffect(() => {
    dispatch(fetchProductById(parseInt(id)));
  }, [dispatch, id]);

  console.log(productById);

  const close = () => {
    navigate('/products');
    dispatch(resetProductById);
  };

  const handleOnClick = () => {
    let obj = {
      ItemId: id,
      itemCount: 1,
      choosedSize: data.choosedSize,
    };

    dispatch(fetchCreateCard(obj));
  };

  const handleKeyUp = (event, type, inputType) => {
    let dataTemp = { ...data };
    switch (inputType) {
      case 'dropdown':
        dataTemp[type] = event === [] ? '' : event;
        break;
      default:
        break;
    }
    setData(dataTemp);
  };

  const generateDropdownItems = (str) => {
    let data = [];

    const sizes = str.split(',');

    sizes.forEach((size) => {
      data.push({ value: size, label: size });
    });

    return data;
  };

  return (
    <>
      {loadedById ? (
        <div>
          <div className='main d-flex bcol-ibm-white cds--offset-lg-3 cds--col-lg-10 pl-0 pr-0 mt-4'>
            <img
              className='MainPicture'
              alt='product'
              src={productById?.image}
            />
            <div className='d-flex fd-c f-jc'>
              <div className='title d-flex f-jc'>
                <h1>{productById?.title}</h1>
              </div>
              <div className='Description'>
                <h3>{productById?.description}</h3>
              </div>
              <div id='container' style={{ padding: '24px' }} />
              <div className='Price'>
                <h2>{productById?.price}.-</h2>
              </div>
              <div>
                <h5>Size:</h5>
                <Select
                  className='w50p'
                  size='large'
                  onChange={(e) => handleKeyUp(e, 'choosedSize', 'dropdown')}
                  options={generateDropdownItems(productById?.size)}
                />
              </div>
              <div className='AddToCar mt-2'>
                <Button
                  disabled={data.choosedSize === '' ? true : false}
                  icon={<ShoppingCart />}
                  onClick={() => handleOnClick()}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          <div className='d-flex f-je mt-3 cds--offset-lg-3 cds--col-lg-10 pl-0 pr-0'>
            <Button type='primary' size='large' onClick={() => onclose()}>
              Go back
            </Button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ItemOverview;
