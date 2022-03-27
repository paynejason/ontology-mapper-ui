import React from "react";
import { Routes, Route } from "react-router-dom";
import AsyncResults from "./components/AsyncResults";
import Home from "./Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<AsyncResults />} />
            </Routes>
        </div>
    );
}

export default App;
