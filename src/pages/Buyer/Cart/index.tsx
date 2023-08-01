import React from "react";

import { useSelector } from "react-redux";

import CartItem from "../../../components/CartItem";
import PageHeading from "../../../components/PageHeading";
import { RootState } from "../../../redux/store";

const Cart: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div>
      <PageHeading heading="Cart" />

      {cartItems.length > 0 &&
        cartItems.map((item) => <CartItem cart={item} />)}
    </div>
  );
};

export default Cart;
