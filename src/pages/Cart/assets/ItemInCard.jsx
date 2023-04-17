/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/
import { Add, CloseOutline, Information, Subtract } from '@carbon/icons-react';
import { Button, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import {
  fetchDeleteCard,
  fetchUpdateCardById,
} from '../../../state/card/cardThrunk';
import { useNavigate } from 'react-router';
/*----------------------------------------------------------------------------*/
/* ItemInCard                                                                 */
/*----------------------------------------------------------------------------*/

const ItemInCard = (props) => {
  let data = props.data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddSub = (type) => {
    if (type === 'plus') {
      dispatch(
        fetchUpdateCardById(
          { id: data?.id, itemCount: data?.itemCount + 1 },
          data?.Item?.title
        )
      );
    }

    if (type === 'minus') {
      //   setItemCount(itemCount - 1);
      dispatch(
        fetchUpdateCardById(
          { id: data?.id, itemCount: data?.itemCount - 1 },
          data?.Item?.title
        )
      );
    }
  };

  const handleOnDelete = () => {
    dispatch(fetchDeleteCard(data?.id));
  };

  return (
    <div className='mb-2'>
      <div className='d-flex bx-wrap bcol-ibm-white'>
        <div className='border-right d-flex f-jc cds--col-lg-8 pl-0 pr-0 pt-1 pb-1'>
          <img src={data?.Item?.image} alt='product' className='item-image' />
        </div>
        <div className='cds--col-lg-8 pl-0 pr-0'>
          <div className='border-bottom pl-2 pt-2'>
            <h3>{data?.Item?.title}</h3>
          </div>
          <div className='ml-2 mr-2 mt-2'>
            <div className='d-flex f-jb'>
              <h4>Size</h4>
              <h4 className='text-bold'>{data?.choosedSize}</h4>
            </div>
            <div className='mt-3 d-flex f-ac f-jb mb-2'>
              <div>
                <h5>Item count:</h5>
                <div className='d-flex'>
                  <InputNumber
                    value={data?.itemCount}
                    min={1}
                    readOnly={true}
                  />
                  <div className='d-flex ml-2'>
                    <Button
                      className='d-flex f-ac f-jc'
                      type='primary'
                      icon={<Add size={'20'} />}
                      disabled={
                        parseInt(data?.Item?.itemInStock) === data?.itemCount
                          ? true
                          : false
                      }
                      onClick={() => handleAddSub('plus')}
                    />
                    <Button
                      className='d-flex ml-1 f-ac f-jc'
                      type='primary'
                      disabled={data?.itemCount === 1 ? true : false}
                      icon={<Subtract size={'20'} />}
                      onClick={() => handleAddSub('minus')}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className='text-bold'>
                  {parseInt(data?.Item?.price) * data?.itemCount}.-
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bcol-ibm-white'>
        <div className='d-flex border-top'>
          <div
            className='d-flex f-ac cursor-pointer f-jc pl-0 pr-0 hover-item cds--col-lg-8 border-right'
            onClick={() => navigate(`/item/${data?.Item?.id}`)}
          >
            <div className='p-2 d-flex f-ac'>
              <Information size={'20'} className='mr-1' />
              <h5 className='mb-0'>Details</h5>
            </div>
          </div>
          <div
            className='d-flex f-ac cursor-pointer f-jc hover-item pr-0 pl-0 cds--col-lg-8'
            onClick={() => handleOnDelete()}
          >
            <div className='p-2 d-flex f-ac'>
              <CloseOutline size={'20'} className='mr-1 col-ibm-red-60' />
              <h5 className='mb-0'>Delete item</h5>
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
export default ItemInCard;
