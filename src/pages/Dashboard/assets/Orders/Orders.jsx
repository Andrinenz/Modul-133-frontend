/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Delivery, Promote } from '@carbon/icons-react';
import { Button, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUpdateOrder } from '../../../../state/dashboard/dashboardThrunk';
import ViewOrder from './ViewOrder';

/*----------------------------------------------------------------------------*/
/* Orders                                                                     */
/*----------------------------------------------------------------------------*/

const Orders = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (id) => {
    setModalOpen({
      open: true,
      orderId: id,
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    return;
  };

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
      width: '10%',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
      width: '10%',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: '20%',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '10%',
    },
    {
      title: 'Package sent',
      dataIndex: 'sentToShippingCompany',
      key: 'sentToShippingCompany',
      width: '10%',
    },
    {
      title: 'Action',
      key: 'operation',
      width: '15%',
      render: (e, record) => (
        <div className='d-flex fd-r f-ac'>
          {record.sentToShippingCompany !== 'Yes' ? (
            <Tooltip title='Ship package'>
              <Button
                className='d-flex f-jc f-ac'
                shape='circle'
                onClick={() =>
                  dispatch(
                    fetchUpdateOrder({
                      id: parseInt(record.key),
                      sentToShippingCompany: true,
                    })
                  )
                }
                size='middle'
                icon={<Delivery />}
              />
            </Tooltip>
          ) : (
            <Tooltip title='Revert package ship'>
              <Button
                className='d-flex f-jc f-ac'
                shape='circle'
                onClick={() =>
                  dispatch(
                    fetchUpdateOrder({
                      id: parseInt(record.key),
                      sentToShippingCompany: false,
                    })
                  )
                }
                size='middle'
                icon={<Promote />}
              />
            </Tooltip>
          )}
          <Button
            onClick={() => handleModalOpen(parseInt(record.key))}
            className='ml-1'
            size='middle'
            type={'primary'}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  let orders = props.data;

  let totalAmount = orders;

  console.log(totalAmount);

  const generateTableData = (orders) => {
    let data = [];
    orders.forEach((order) => {
      data.push({
        key: order.id.toString(),
        firstname: order.firstname,
        lastname: order.lastname,
        country: order.country,
        totalAmount: order.totalAmount + ' CHF',
        sentToShippingCompany: order.sentToShippingCompany ? 'Yes' : 'No',
      });
    });
    return data;
  };

  return (
    <div className='bcol-ibm-white pl-2 pt-3 pb-3 pr-2'>
      <ViewOrder
        modalOpen={modalOpen}
        handleModalClose={handleModalClose.bind(this)}
      />
      <h1>Orders</h1>
      <div className='mt-2'>
        <Table
          columns={columns}
          dataSource={generateTableData(orders)}
          pagination={false}
        />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Orders;
