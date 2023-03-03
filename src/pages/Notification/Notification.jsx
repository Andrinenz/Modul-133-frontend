/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNotification } from '../../state/notification/notificationSelector';
import './Notification.scss';

/*----------------------------------------------------------------------------*/
/* Notification                                                               */
/*----------------------------------------------------------------------------*/

const Notification = (props) => {
  const { notifications } = useSelector(getNotification);
  const [notificationTop, setNotificationTop] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setNotificationTop(window.scrollY);
    });
  });

  return (
    <div
      className='Notification-wrapper'
      style={{ transform: `translateY(${notificationTop}px)` }}
    >
      {notifications.map((notification, index) => {
        return (
          <Alert
            type={notification.type}
            key={index}
            description={notification.description}
            message={notification.message}
            closable
            showIcon
          />
        );
      })}
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Notification;
