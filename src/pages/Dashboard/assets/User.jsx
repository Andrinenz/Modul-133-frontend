/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import '../Dashboard.scss';
import { Table } from 'antd';

/*----------------------------------------------------------------------------*/
/* User                                                                       */
/*----------------------------------------------------------------------------*/

const User = () => {
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

  const data = [
    {
      key: '1',
      firstname: 'John',
      lastname: 'Brown',
      email: 'andrin.es',
      isAdmin: 'true',
    },
  ];

  return (
    <div className='bcol-ibm-white pl-2 pt-3 pb-3 content pr-2'>
      <h1>Users</h1>
      <div className='mt-2'>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default User;
