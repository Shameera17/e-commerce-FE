import { useEffect } from "react";

import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { refreshAuthToken } from "./redux/reducers/auth.reducer";
import { RootState } from "./redux/store";
import Routes from "./routes";

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.userInfo && !auth.token) {
      dispatch(refreshAuthToken());
    }
  }, [auth.userInfo, auth.token]);
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SnackbarProvider>
  );
}
export default App;
