/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/
import { Button } from 'antd';
/*----------------------------------------------------------------------------*/
/* ItemInCard                                                                 */
/*----------------------------------------------------------------------------*/

const ItemInCard = (props) => {
  let data = props.data;

  return (
    <div className='mb-2'>
      <div className='d-flex bx-wrap bcol-ibm-white'>
        <div className='border-right cds--col-lg-8 pl-0 pr-0'>
          <h3>image</h3>
        </div>
        <div className='cds--col-lg-8 pl-0 pr-0'>
          <div className='border-bottom pl-2 pt-2'>
            <h3>Title Product</h3>
          </div>
          <div className='mt-5'>
            <h5>Product info</h5>
          </div>
          <div className='d-flex bx-wrap border-top'>
            <div className='d-flex f-ac f-jc pl-0 pr-0 cds--col-lg-8 border-right'>
              <div className='p-2'>
                <h5 className='mb-0'>Show details</h5>
              </div>
            </div>
            <div className='d-flex f-ac f-jc pr-0 pl-0 cds--col-lg-8'>
              <h5 className='mb-0'>Delete Item</h5>
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
