/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { ShoppingCart } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import { Button, Rate, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchCreateCard } from '../../state/card/cardThrunk';
import { getProduct } from '../../state/products/productsSelector';
import { resetProductById } from '../../state/products/productsSlice';
import { fetchProductById } from '../../state/products/productsThrunk';
import { getReview } from '../../state/review/reviewSelector';
import {
  fetchCreateReview,
  fetchReviewByItem,
  fetchUpdateReview,
} from '../../state/review/reviewThrunk';
import { getUser } from '../../state/user/userSelector';
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
  const { user } = useSelector(getUser);
  const { reviewByItem, loadedByItem } = useSelector(getReview);

  useEffect(() => {
    dispatch(fetchProductById(parseInt(id)));
    dispatch(fetchReviewByItem(id));
  }, [dispatch, id]);

  console.log(reviewByItem);

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

  const handleRatingChange = (e) => {
    let reviewFromUser = reviewByItem.find(
      (review) => review.User.id === user.id
    );
    if (reviewFromUser) {
      let updateObj = { rating: e.toString(), id: reviewFromUser.id };
      dispatch(fetchUpdateReview(updateObj));
      return;
    }
    let obj = { ItemId: id, rating: e.toString() };
    dispatch(fetchCreateReview(obj));
  };

  const generateRatingOverall = (ratings) => {
    let sum = 0;
    let count = 0;

    ratings.forEach((item) => {
      if (item.rating) {
        sum += parseInt(item.rating);
        count++;
      }
    });

    if (count === 0) {
      return 0;
    }

    return (sum / count).toFixed(2);
  };

  const generateRatingValue = (reviews) => {
    const item = reviews.find(
      (item) => item.User.id === user.id && item.rating
    );
    return item ? item.rating : undefined;
  };

  return (
    <>
      {loadedById && loadedByItem ? (
        <div className='d-flex f-ac'>
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
              <div className='d-flex fd-c mt-1 mb-2'>
                <h5>Rating:</h5>
                <div className='d-flex'>
                  <Rate
                    value={generateRatingValue(reviewByItem)}
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <h5 className='ml-2 col-ibm-blue-40'>{`Overall rating (${generateRatingOverall(
                    reviewByItem
                  )})`}</h5>
                </div>
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
            <Button type='primary' size='large' onClick={() => close()}>
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
