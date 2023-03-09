/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { setData } from './newProductSlice';
import {
  addErrorNotification,
  addSuccessNotification,
} from '../notification/notificationSlice';

/*----------------------------------------------------------------------------*/
/* uploadFileThrunk                                                           */
/*----------------------------------------------------------------------------*/

export const handleFileUpload = (event) => {
  return async (dispatch) => {
    dispatch(setData({ target: 'image', value: '...' }));

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
      .then((response) => response.json())
      .then((result) => {
        if (result.result.hostedPath) {
          let imagePath = result.result.hostedPath;

          dispatch(setData({ target: 'image', value: imagePath }));
          dispatch(setData({ target: 'status', value: 'edit' }));
          dispatch(
            addSuccessNotification({
              message: 'OK',
              description: 'File uploaded successfully',
            })
          );
        }
      })
      .catch((error) => console.log('file could not be uploaded'));

    try {
    } catch (err) {
      dispatch(
        addErrorNotification({
          message: 'Error',
          description: err.toString(),
        })
      );
    }
  };
};

export const handleFileUploadDelete = () => {
  return async (dispatch) => {
    dispatch(setData({ target: 'image', value: '' }));
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
