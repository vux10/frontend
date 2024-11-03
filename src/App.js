// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Categories />} />
                {/* Các route khác */}
            </Routes>
        </Router>
    );
};

export default App;
