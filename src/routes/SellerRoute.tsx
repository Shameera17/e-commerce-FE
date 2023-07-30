import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import NotAuthorized from "../pages/NotAuthorized";
import { RootState } from "../store/configureStore";

const SellerRoute: any = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, token } = useSelector((state: RootState) => state.auth);
  console.log(userInfo);
  return userInfo && userInfo?._id && token ? (
    userInfo.role === "seller" ? (
      { children }
    ) : (
      <NotAuthorized />
    )
  ) : (
    <Navigate to="/signin" />
  );
};

export default SellerRoute;
