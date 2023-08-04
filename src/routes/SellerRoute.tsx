import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import NotAuthorized from "../pages/NotAuthorized";
import { RootState } from "../redux/store";

const SellerRoute: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.userInfo && auth?.userInfo.role === "seller" ? (
    <Outlet />
  ) : auth?.userInfo?.email ? (
    <NotAuthorized />
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default SellerRoute;
