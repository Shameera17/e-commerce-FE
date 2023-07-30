import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

import "./App.css";
import Routes from "./routes";
import store from "./store/configureStore";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <div className="App">
          <Routes />
        </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
