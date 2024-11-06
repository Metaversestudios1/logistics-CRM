
import "./App.css";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Employees from "./Components/employees/Employees"
import AddEmployee from "./Components/employees/AddEmployee";
import EditEmployee from "./Components/employees/EditEmployee";
import Product from "./Components/product/Product";
import AddProduct from "./Components/product/AddProduct";
import EditProduct from "./Components/product/EditProduct";

function App() {

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/employees" element={<Employees/>} />
            <Route path="/employees/addemployee" element={<AddEmployee/>} />
            <Route path="/employees/editemployee/:id" element={<EditEmployee/>} />
            <Route path="/products" element={<Product/>} />
            <Route path="/products/addproduct" element={<AddProduct/>} />
            <Route path="/products/editproduct/:id" element={<EditProduct/>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
