import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ICartItem, ICartReducer } from "../../types/interfaces";
import { RootState } from "../store";

const initialState: ICartReducer = {
  cartItemInfo: null,
  action: {
    type: null,
    loading: false,
  },
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<ICartItem>) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      if (index < 0) {
        // if item not added, then add to the list
        state.cartItems = [...state.cartItems, action.payload];
      } else {
        const count = state.cartItems[index].quantity + action.payload.quantity;
        // if item available, increment by quantity
        state.cartItems[index].quantity = count;
      }
    },
    removeCartItem: (state, action: PayloadAction<{ productId: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId,
      );
    },
    updateCartItemQty: (
      state,
      action: PayloadAction<{
        productId: string;
        mode: "increment" | "decrement";
      }>,
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      const quantity = state.cartItems[index].quantity;
      // maximum quantity per product to be added to the cart is 6
      if (action.payload.mode === "increment")
        state.cartItems[index].quantity = quantity + 1;
      // minimum quantity per product is 1
      if (action.payload.mode === "decrement" && quantity > 1)
        state.cartItems[index].quantity = quantity - 1;
    },
    resetCart: (state) => {
      state = initialState;
    },
    resetAction(state) {
      state.action = initialState.action;
    },
  },
});
export const {
  setCartItem,
  resetCart,
  resetAction,
  removeCartItem,
  updateCartItemQty,
} = cartSlice.actions;

export default cartSlice.reducer;
export const product = (state: RootState) => state.product;
