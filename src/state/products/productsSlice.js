/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* productslice                                                               */
/*----------------------------------------------------------------------------*/

export const productsSlice = createSlice({
  name: 'product',
  initialState: {
    loaded: false,
    products: [],
    productById: null,
    loadedById: false,
    error: null,
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.loaded = true;
    },
    setProductById: (state, { payload }) => {
      state.productById = payload;
      state.loadedById = true;
    },
    addProduct: (state, { payload }) => {
      state.products.push(payload);
    },
    deleteProduct: (state, { payload }) => {
      let { id } = payload;
      state.products = state.products.filter((e) => e.id === id);
    },
    updateProductById: (state, { payload }) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.id) {
          product.title = payload.title;
          product.description = payload.description;
          product.image = payload.image;
          product.size = payload.size;
          product.isArchived = payload.isArchived;
          product.price = payload.price;
          product.itemsInStock = payload.itemsInStock;
        }
        return product;
      });
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const {
  updateProductById,
  setProductById,
  deleteProduct,
  addProduct,
  setProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
