import React, { Suspense } from "react";

import { Route, Routes as RoutesWrap } from "react-router-dom";

import Loading from "../components/Loading";

const DashboardLayout = React.lazy(
  () => import("../components/DashboardLayout"),
);
const Layout = React.lazy(() => import("../components/Layout"));
const Cart = React.lazy(() => import("../pages/Buyer/Cart"));
const Order = React.lazy(() => import("../pages/Buyer/Orders"));
const HomeScreen = React.lazy(() => import("../pages/HomeScreen"));
const NotAuthorized = React.lazy(() => import("../pages/NotAuthorized"));
const PageNotFound = React.lazy(() => import("../pages/PageNotFound"));
const Profile = React.lazy(() => import("../pages/Profile"));
const CreateProduct = React.lazy(() => import("../pages/Seller/CreateProduct"));
const Products = React.lazy(() => import("../pages/Seller/Products"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const ViewProducts = React.lazy(() => import("../pages/ViewProducts"));
const BuyerRoute = React.lazy(() => import("./BuyerRoute"));
const SellerRoute = React.lazy(() => import("./SellerRoute"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default Routes;
