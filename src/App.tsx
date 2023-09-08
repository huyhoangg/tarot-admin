import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import EcommerceProductsPage from "./pages/e-commerce/products";
import UserListPage from "./pages/users/list";
import InvoicePage from "./pages/users/invoice";
import VoucherPage from "./pages/e-commerce/voucher";
import RewardPage from "./pages/e-commerce/reward";

import { AuthContext } from "./contexts/AdminAuthContext";
import { useContext } from "react";
import EcommerceCategoryPage from "./pages/e-commerce/category";
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
          <Route path="/users/invoice" element={<InvoicePage />} />
          <Route path="/e-commerce/voucher" element={<VoucherPage />} />
          <Route path="/e-commerce/reward" element={<RewardPage />} />
          <Route
            path="/e-commerce/categories"
            element={<EcommerceCategoryPage />}
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  );
}

export default App;
