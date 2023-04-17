/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/
import './Cards.scss';
import { Button } from 'antd';
import { ShoppingCartArrowDown } from '@carbon/icons-react';
/*----------------------------------------------------------------------------*/
/* Card                                                                       */
/*----------------------------------------------------------------------------*/
const Card = (props) => {
  let data = props.data;

  return (
    <div className='d-flex bx-wrap BackGround'>
      <div className='border-right pl-1 pt-1'></div>
      <div className='Cards'>
        <div className='ProductTitle d-flex fd-c f-jc fac'>
          <h3>{data?.title}</h3>
          <div className='d-flex f-jb mt-2 cursor-pointer'>
            <img className='PicturePreview' alt='product' src={data?.image} />
            <div className='d-flex fd-c'>
              <div className='ProductPrice ml-2'>
                <h3>{data?.price}.-</h3>
              </div>
              <div className='Review ml-3'>
                <Button className='ml-2 mt-2'>
                  <ShoppingCartArrowDown size='24' />
                </Button>
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
export default Card;
