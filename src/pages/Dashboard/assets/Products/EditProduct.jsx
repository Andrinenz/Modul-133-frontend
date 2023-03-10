/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Button, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../../state/products/productsSelector';
import { fetchUpdateProduct } from '../../../../state/products/productsThrunk';

/*----------------------------------------------------------------------------*/
/* EditProduct                                                                */
/*----------------------------------------------------------------------------*/

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector(getProduct);

  const selectedProduct = products.find(
    (product) => product.id === props.modalOpen.productId
  );

  const [data, setData] = useState({
    image: selectedProduct?.image,
    title: selectedProduct?.title,
    size: selectedProduct?.size.split(','),
    price: selectedProduct?.price,
    itemsInStock: selectedProduct?.itemsInStock,
    description: selectedProduct?.description,
    isArchived: selectedProduct?.isArchived,
  });

  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('edit');

  useEffect(() => {
    setData({
      image: selectedProduct?.image ? selectedProduct?.image : '',
      title: selectedProduct?.title,
      size: selectedProduct?.size ? selectedProduct?.size.split(',') : '',
      price: selectedProduct?.price,
      itemsInStock: selectedProduct?.itemsInStock,
      description: selectedProduct?.description,
      isArchived: selectedProduct?.isArchived,
    });
    setUrl(data.image);
  }, [selectedProduct, data.image]);

  const handleFileUpload = (event) => {
    setStatus('uploading');
    setUrl('...');
    let headers = new Headers();
    let formData = new FormData();

    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );

    formData.append('file', event.target.files[0], event.target.files[0].name);

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: formData,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/api/files/upload', requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.result.hostedPath) {
          let imagePath = result.result.hostedPath;

          setUrl(imagePath);
          setStatus('edit');
        }
      })
      .catch((error) => console.log('file could not be uploaded'));
  };

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
    props.handleModalClose('edit');
  };

  const handleSubmit = () => {
    let tempData = { ...data };

    tempData.size = tempData.size.join(',');
    dispatch(
      fetchUpdateProduct({ ...tempData, id: props.modalOpen.productId })
    );
    handleOnClose();
  };

  return (
    <div>
      {data.size && selectedProduct?.image ? (
        <>
          <Modal
            open={props.modalOpen.open}
            title='Edit Product'
            onCancel={() => handleOnClose()}
            footer={
              <div>
                <Button onClick={handleOnClose}>Cancel</Button>
                <Button type='primary' onClick={() => handleSubmit()}>
                  Submit
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
                      value={data?.title}
                      onChange={(e) => handleKeyUp(e, 'title', 'textinput')}
                      size={'large'}
                    />
                  </div>
                </div>
                <div className='d-flex pl-0 pr-0'>
                  <div>
                    <h5>Price:</h5>
                    <InputNumber
                      addonAfter='CHF'
                      placeholder='price'
                      value={data?.price}
                      onChange={(e) => handleKeyUp(e, 'price', 'numberInput')}
                      size={'large'}
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
                    value={data?.size}
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
                  <h5>Picture:</h5>
                  <p className='cds--label-description'>
                    Only .jpg, .png and .jpg allowed.
                  </p>
                  <FileUploaderDropContainer
                    onAddFiles={(e) => handleFileUpload(e)}
                    labelText='Drag and drop files here or click to upload'
                  />
                  {url !== '' ? (
                    <div>
                      <FileUploaderItem
                        onDelete={() => setUrl('')}
                        status={status}
                        name={
                          <a
                            href={url}
                            target='_blank'
                            rel='noreferrer'
                            className='mt-2'
                          >
                            {url.split('/')[url.split('/').length - 1]}
                          </a>
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default EditProduct;
