import { Route, Routes as RoutesWrap } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import Layout from "../components/Layout";
import Cart from "../pages/Buyer/Cart";
import Order from "../pages/Buyer/Orders";
import HomeScreen from "../pages/HomeScreen";
import NotAuthorized from "../pages/NotAuthorized";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import CreateProduct from "../pages/Seller/CreateProduct";
import Products from "../pages/Seller/Products";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ViewProducts from "../pages/ViewProducts";
import BuyerRoute from "./BuyerRoute";
import SellerRoute from "./SellerRoute";

const Routes = () => {
  return (
    <RoutesWrap>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="products" element={<ViewProducts />} />
        <Route path="NoAccess" element={<NotAuthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="/seller" element={<DashboardLayout />}>
        <Route element={<SellerRoute />}>
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/buyer" element={<DashboardLayout />}>
        <Route element={<BuyerRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Route>
    </RoutesWrap>
  );
};

export default Routes;
