import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import Alert from "./component/Alert/Alert";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from "./context/ThemeContext";


function App() {
  const { store, persistor } = createStore();

  return (
    <SnackbarProvider>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Alert />
            <Routes>
              <Route path="/*" element={<UserRoute />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin/*" element={<AdminRoute />} />
              </Route>
            </Routes>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
