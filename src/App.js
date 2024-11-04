// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";
import Product from "./pages/Product";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Categories />} />
                <Route path="/category/:id" element={<Product />} />
                {/* Các route khác */}
            </Routes>
        </Router>
    );
};

export default App;
