import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProduct, IProductReducer } from "../../types/interfaces";
import { RootState } from "../store";

const initialState: IProductReducer = {
  productInfo: null,
  action: {
    type: null,
    loading: false,
  },
  products: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.productInfo = action.payload;
    },

    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    resetProducts: (state) => {
      state.action = initialState.action;
      state.productInfo = initialState.productInfo;
      state.products = initialState.products;
    },
    resetAction(state) {
      state.action = initialState.action;
    },
  },
});
export const { setProduct, setProducts, resetAction, resetProducts } =
  productSlice.actions;

export default productSlice.reducer;
export const product = (state: RootState) => state.product;
