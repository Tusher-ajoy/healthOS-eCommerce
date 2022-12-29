import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import Customers from "./components/Admin/Customers/Customers";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Layout from "./components/Admin/Layout/Layout";
import Orders from "./components/Admin/Orders/Orders";
import ProductList from "./components/Admin/Products/Products";
import Checkout from "./components/Checkout/Checkout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sign-in" element={<Login />} />
            {/* All private router */}
            <Route element={<PrivateRoute />}>
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="dashboard" element={<Layout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="customer-list" element={<Customers />} />
                <Route path="order-list" element={<Orders />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="add-product" element={<AddProduct />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
