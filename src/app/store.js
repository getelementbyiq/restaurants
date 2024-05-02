import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './features/ProductsSlice';

export const store = configureStore({
  reducer: {
    products: ProductSlice,
  },
});
