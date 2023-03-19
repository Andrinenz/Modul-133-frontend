/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import reviewReducer from './review/reviewSlice.js';
import productReducer from './products/productsSlice.js';
import orderReducer from './order/orderSlice.js';
import newOrderReducer from './newOrder/newOrderSlice.js';
import notificationReducer from './notification/notificationSlice.js';
import newProductReducer from './newProduct/newProductSlice.js';
import cardReducer from './card/cardSlice.js';
import dashboardReducer from './dashboard/dashboardSlice.js';

/*----------------------------------------------------------------------------*/
/* store                                                                      */
/*----------------------------------------------------------------------------*/

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    review: reviewReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
    newProduct: newProductReducer,
    dashboard: dashboardReducer,
    card: cardReducer,
    notification: notificationReducer,
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
