/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Box, RowCollapse } from '@carbon/icons-react';
import { Button, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../../state/products/productsSelector';
import {
  fetchProductsData,
  fetchUpdateProduct,
} from '../../../../state/products/productsThrunk';
import EditProduct from './EditProduct';
import NewProduct from './NewProduct';

/*----------------------------------------------------------------------------*/
/* Products                                                                   */
/*----------------------------------------------------------------------------*/

const Products = () => {
  const dispatch = useDispatch();
  const [modalOpenNew, setModalOpenNew] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  const { products, loaded } = useSelector(getProduct);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const handleUpdateArchive = (id, type) => {
    const selectedProduct = products.filter((product) => product.id === id);

    let product = { ...selectedProduct[0] };

    delete product.createdAt;
    delete product.updatedAt;

    product.isArchived = type;

    dispatch(fetchUpdateProduct(product));
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Items in stock',
      dataIndex: 'itemsInStock',
      key: 'itemsInStock',
    },
    {
      title: 'Archvied',
      dataIndex: 'isArchived',
      key: 'isArchived',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (e, record) => (
        <div className='d-flex fd-r f-ac'>
          {record.isArchived === 'No' ? (
            <Tooltip title='Archive product'>
              <Button
                className='d-flex f-jc f-ac'
                shape='circle'
                size='middle'
                icon={<Box />}
                onClick={() => handleUpdateArchive(parseInt(record.key), true)}
              />
            </Tooltip>
          ) : (
            <Tooltip title='Revert archived'>
              <Button
                className='d-flex f-jc f-ac'
                shape='circle'
                size='middle'
                icon={<RowCollapse />}
                onClick={() => handleUpdateArchive(parseInt(record.key), false)}
              />
            </Tooltip>
          )}
          <Button
            type='primary'
            className='ml-1'
            onClick={() => handleModalOpen('edit', parseInt(record.key))}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const generateTableData = (products) => {
    let data = [];
    products.forEach((product) => {
      data.push({
        key: product.id.toString(),
        title: product.title,
        price: product.price,
        isArchived: product.isArchived ? 'Yes' : 'No',
        itemsInStock: product.itemsInStock,
      });
    });
    return data;
  };

  const handleModalOpen = (type, id) => {
    if (type === 'new') {
      setModalOpenNew(true);
    } else
      setModalOpenEdit({
        open: true,
        productId: id,
      });
  };

  const handleModalClose = (type) => {
    if (type === 'new') {
      setModalOpenNew(false);
      return;
    } else setModalOpenEdit(false);
    return;
  };

  return (
    <div className='bcol-ibm-white pl-2 pt-3 pb-3 pr-2'>
      <NewProduct
        modalOpen={modalOpenNew}
        handleModalClose={handleModalClose.bind(this)}
      />

      <EditProduct
        modalOpen={modalOpenEdit}
        handleModalClose={handleModalClose.bind(this)}
      />
      <div className='d-flex f-jb f-ac'>
        <h1>Products</h1>
        <Button onClick={() => handleModalOpen('new')} type='primary'>
          Add new Product
        </Button>
      </div>
      <div className='mt-2'>
        <Table
          columns={columns}
          loading={loaded ? false : true}
          dataSource={generateTableData(products)}
          pagination={false}
        />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Products;
