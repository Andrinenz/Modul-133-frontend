/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import '../Dashboard.scss';
import { Table } from 'antd';
import { useState } from 'react';
import EditUserModal from './EditUserModal.jsx';

/*----------------------------------------------------------------------------*/
/* User                                                                       */
/*----------------------------------------------------------------------------*/

const User = (props) => {
  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);

  let users = props.data;

  const handleModalOpen = (id) => {
    setModalOpen({
      open: true,
      userId: id,
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    return;
  };

  const generateTableData = (users) => {
    let data = [];
    users.forEach((user) => {
      data.push({
        key: user?.id.toString(),
        firstname: user?.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user?.isAdmin ? 'Yes' : 'No',
      });
    });
    return data;
  };

  return (
    <div className='bcol-ibm-white pl-2 pt-3 pb-3 content pr-2'>
      <EditUserModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose.bind(this)}
      />
      <h1>Users</h1>
      <div className='mt-2'>
        <Table
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => handleModalOpen(parseInt(record.key)),
            };
          }}
          dataSource={generateTableData(users)}
          pagination={false}
        />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default User;
