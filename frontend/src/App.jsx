import "./App.css";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Employees from "./Components/employees/Employees";
import AddEmployee from "./Components/employees/AddEmployee";
import EditEmployee from "./Components/employees/EditEmployee";
import Product from "./Components/product/Product";
import AddProduct from "./Components/product/AddProduct";
import EditProduct from "./Components/product/EditProduct";
import EditCategory from "./Components/category/EditCategory";
import AddCategory from "./Components/category/AddCategory";
import Categories from "./Components/category/Categories";
import EditWarehouse from "./Components/warehouse/EditWarehouse";
import AddWarehouse from "./Components/warehouse/AddWarehouse";
import Warehouses from "./Components/warehouse/Warehouses";
import EditDealers from "./Components/dealer/EditDealer";
import AddDealers from "./Components/dealer/AddDealer";
import Dealers from "./Components/dealer/Dealers";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/addemployee" element={<AddEmployee />} />
            <Route
              path="/employees/editemployee/:id"
              element={<EditEmployee />}
            />
            <Route path="/products" element={<Product />} />
            <Route path="/products/addproduct" element={<AddProduct />} />
            <Route path="/products/editproduct/:id" element={<EditProduct />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/addcategory" element={<AddCategory />} />
            <Route
              path="/categories/editcategory/:id"
              element={<EditCategory />}
            />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouses/addwarehouse" element={<AddWarehouse />} />
            <Route
              path="/warehouses/editwarehouse/:id"
              element={<EditWarehouse />}
            />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/dealers/adddealer" element={<AddDealers />} />
            <Route path="/dealers/editdealer/:id" element={<EditDealers />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
