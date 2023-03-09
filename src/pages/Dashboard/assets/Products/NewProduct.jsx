/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Button, Input, InputNumber, Modal, Select } from 'antd';
import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFileUpload,
  handleFileUploadDelete,
} from '../../../../state/newProduct/uploadFileThrunk';
import { getNewProduct } from '../../../../state/newProduct/newProductSelector';
import { fetchCreateProduct } from '../../../../state/products/productsThrunk';

/*----------------------------------------------------------------------------*/
/* NewProduct                                                                 */
/*----------------------------------------------------------------------------*/

const NewProduct = (props) => {
  const dispatch = useDispatch();
  const newProduct = useSelector(getNewProduct);

  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
    size: [],
    itemsInStock: '',
    isArchived: false,
    image: '',
  });

  const handleKeyUp = (event, type, inputType) => {
    let dataTemp = { ...data };
    switch (inputType) {
      case 'textinput':
        dataTemp[type] = event.target.value;
        break;
      case 'numberInput':
        dataTemp[type] = event === null ? '' : event.toString();
        break;
      case 'dropdown':
        dataTemp[type] = event === [] ? '' : event;
        break;
      default:
        break;
    }
    setData(dataTemp);
  };
  const handleOnClose = () => {
    props.handleModalClose();
  };

  const handleSubmit = () => {
    let tempData = { ...data };
    tempData.size = tempData.size.join(',');
    tempData.image = newProduct.image.value;

    dispatch(fetchCreateProduct(tempData));
    handleOnClose();
  };

  const disableBtn = () => {
    if (
      data.description !== '' &&
      newProduct.image.value !== '' &&
      newProduct.image.value !== '...' &&
      data.itemsInStock !== '' &&
      data.price !== '' &&
      data.size !== [] &&
      data.title !== ''
    ) {
      return false;
    } else return true;
  };

  return (
    <div>
      <Modal
        title='Create Product'
        open={props.modalOpen}
        afterClose={() =>
          setData({
            title: '',
            price: '',
            description: '',
            size: [],
            itemsInStock: '',
            isArchived: false,
            image: '',
          })
        }
        onCancel={() => handleOnClose()}
        footer={
          <div>
            <Button onClick={handleOnClose}>Cancel</Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={disableBtn()}
              type='primary'
            >
              Create
            </Button>
          </div>
        }
      >
        <div>
          <div className='d-flex bx-wrap f-jb mt-2'>
            <div className='d-flex pl-0 pr-0'>
              <div>
                <h5>Title:</h5>
                <Input
                  placeholder='title'
                  value={data.title}
                  onChange={(e) => handleKeyUp(e, 'title', 'textinput')}
                  size='large'
                />
              </div>
            </div>
            <div className='d-flex pl-0 pr-0'>
              <div>
                <h5>Price:</h5>
                <InputNumber
                  addonAfter='CHF'
                  value={data.price}
                  onChange={(e) => handleKeyUp(e, 'price', 'numberInput')}
                  placeholder='price'
                  size='large'
                />
              </div>
            </div>
          </div>
          <div className='d-flex fd-c bx-wrap'>
            <div className='mt-2'>
              <h5>Description:</h5>
              <Input.TextArea
                size='large'
                value={data.description}
                onChange={(e) => handleKeyUp(e, 'description', 'textinput')}
                placeholder='description'
              />
            </div>
            <div className='mt-2'>
              <h5>Sizes:</h5>
              <Select
                mode='multiple'
                className='w100p'
                value={data.size}
                onChange={(e) => handleKeyUp(e, 'size', 'dropdown')}
                placeholder='Choose a option'
                options={[
                  { value: 'S', label: 'S' },
                  { value: 'M', label: 'M' },
                  { value: 'L', label: 'L' },
                  { value: 'XL', label: 'XL' },
                  { value: 'XXL', label: 'XXL' },
                ]}
              />
            </div>
            <div className='mt-2'>
              <h5>Stock of item:</h5>
              <InputNumber
                onChange={(e) => handleKeyUp(e, 'itemsInStock', 'numberInput')}
                size='large'
                value={data.itemsInStock}
                placeholder='stock'
                className='w100p'
              />
            </div>
            <div className='mt-2 mb-2'>
              <h5>Picture:</h5>
              <p className='cds--label-description'>
                Only .jpg, .png and .jpg allowed.
              </p>
              <FileUploaderDropContainer
                onAddFiles={(e) => dispatch(handleFileUpload(e))}
                labelText='Drag and drop files here or click to upload'
              />
              {newProduct.image.value !== '' ? (
                <div className='mt-1'>
                  <FileUploaderItem
                    name={
                      <a
                        href={newProduct.image.value}
                        target='_blank'
                        rel='noreferrer'
                        className='mt-2'
                      >
                        {
                          newProduct?.image.value.split('/')[
                            newProduct?.image.value.split('/').length - 1
                          ]
                        }
                      </a>
                    }
                    status={newProduct.status.value}
                    onDelete={() => dispatch(handleFileUploadDelete())}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default NewProduct;
