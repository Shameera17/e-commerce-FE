import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import store from "./redux/store";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <BrowserRouter>
          <div className="App">
            <Routes />
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
