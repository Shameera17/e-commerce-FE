import { combineReducers } from "redux";

import authReducer from "./reducers/auth.reducer";
import cartReducer from "./reducers/cart.reducer";
import productReducer from "./reducers/product.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
