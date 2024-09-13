// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login"; 
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Home />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
