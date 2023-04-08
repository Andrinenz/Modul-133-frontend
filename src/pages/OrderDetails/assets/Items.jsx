/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { ArrowRight, Product } from '@carbon/icons-react';
import { Link } from '@carbon/react';
import '../OrderDetails.scss';

/*----------------------------------------------------------------------------*/
/* Items                                                                      */
/*----------------------------------------------------------------------------*/

const Items = (props) => {
  const selectedOrder = props.data;

  return (
    <div className='mt-2'>
      <div className='d-flex f-jb fd-r pt-3 bcol-ibm-white pl-4 pr-4 prl'>
        <div className='d-flex w100p fd-c'>
          <div className='d-flex f-ac'>
            <div style={{ marginTop: '5px' }}>
              <Product size={'32'} className='mr-2' />
            </div>
            <h1 className='smaller-font mb-0'>
              {selectedOrder?.Cards.length > 1
                ? 'Purchased Items'
                : 'Purchased Item'}
            </h1>
          </div>
          <div className='mt-3 d-flex f-jb bx-wrap mb-3'>
            {selectedOrder?.Cards.map((card, index) => {
              return (
                <div className='inline-item mb-2' key={index}>
                  <div className='d-flex fd-c bcol-ibm-gray-10 pl-2 pt-1 pr-2'>
                    <div className='d-flex'>
                      <div>
                        <h4>Title:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {card?.Item?.title ? card?.Item?.title : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>Descr:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {card?.Item?.description
                            ? card?.Item?.description
                            : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>Price:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {card?.Item?.price ? card?.Item?.price : '-'}.-
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>Item count:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          {card?.itemCount ? card?.itemCount : '-'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div>
                        <h4>Image Link:</h4>
                      </div>
                      <div>
                        <h4 className='text-bold ml-1 h4'>
                          <Link size='lg'>
                            <a
                              href={card?.Item?.image}
                              target='_blank'
                              rel='noreferrer'
                            >
                              Link
                            </a>
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Items;
