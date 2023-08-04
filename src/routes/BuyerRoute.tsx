import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import NotAuthorized from "../pages/NotAuthorized";
import { RootState } from "../redux/store";

const BuyerRoute: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.userInfo && auth?.userInfo.role === "buyer" ? (
    <Outlet />
  ) : auth?.userInfo?.email ? (
    <NotAuthorized />
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default BuyerRoute;
