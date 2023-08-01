import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "../redux/store";

const SellerRoute: React.FC = () => {
  const { userInfo, token } = useSelector((state: RootState) => state.auth);
  return userInfo && userInfo?._id && token ? (
    userInfo.role === "seller" ? (
      <Outlet />
    ) : (
      <Navigate to="/NoAccess" />
    )
  ) : (
    <Navigate to="/signin" />
  );
};

export default SellerRoute;
