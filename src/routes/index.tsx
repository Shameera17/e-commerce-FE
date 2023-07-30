import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomeScreen from "../components/HomeScreen";
import Layout from "../components/Layout";
import PageNotFound from "../components/PageNotFound";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

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
