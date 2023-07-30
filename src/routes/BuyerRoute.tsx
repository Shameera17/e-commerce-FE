import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import NotAuthorized from "../pages/NotAuthorized";
import { RootState } from "../store/configureStore";

const BuyerRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, token } = useSelector((state: RootState) => state.auth);

  return userInfo && userInfo?._id && token ? (
    userInfo.role === "buyer" ? (
      <Outlet />
    ) : (
      <NotAuthorized />
    )
  ) : (
    <Navigate to="/signin" />
  );
};

export default BuyerRoute;
