import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BuyerLayout from "../components/BuyerLayout";
import Layout from "../components/Layout";
import SellerLayout from "../components/SellerLayout";
import Cart from "../pages/Buyer/Cart";
import HomeScreen from "../pages/HomeScreen";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <HomeScreen /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "products", element: <ViewProducts /> },
      ],
    },
    {
      path: "/seller",
      element: (
        <SellerRoute>
          <SellerLayout />
        </SellerRoute>
      ),
      errorElement: <PageNotFound />,
      children: [
        { path: "createProduct", element: <CreateProduct /> },
        { path: "products", element: <Products /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/buyer",
      element: (
        <BuyerRoute>
          <BuyerLayout />
        </BuyerRoute>
      ),
      errorElement: <PageNotFound />,
      children: [
        { path: "cart", element: <Cart /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routes;
