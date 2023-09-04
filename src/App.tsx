import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import EcommerceProductsPage from "./pages/e-commerce/products";
import UserListPage from "./pages/users/list";
import { AuthContext } from "./contexts/AdminAuthContext";
import { useContext } from "react";

function App() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("context may be null");
  }

  const { userInfo } = auth;

  return (
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/sign-in" element={<SignInPage />} /> */}
          <Route
            path="/login"
            element={!userInfo ? <SignInPage /> : <Navigate to="/dashboard" />}
          />
          {/* <Route path="/authentication/sign-up" element={<SignUpPage />} /> */}
          <Route
            path="/e-commerce/products"
            element={userInfo ? <EcommerceProductsPage /> : <SignInPage />}
          />
          <Route path="/users/list" element={<UserListPage />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  );
}

export default App;
