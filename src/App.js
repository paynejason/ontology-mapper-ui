import React from "react";
import { Routes, Route } from "react-router-dom";
import AsyncResults from "./components/AsyncResults";
import UploadResults from "./UploadResults";
import Input from "./Input";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Input />} />
                <Route path="/upload-results" element={<UploadResults />} />
                <Route path="/results" element={<AsyncResults />} />
            </Routes>
        </div>
    );
}

export default App;
