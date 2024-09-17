// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login"; 
import Home from "./Home";
import Dashboard from "./Dashboard";
import UpdateUser from "./UpdateUser";
import ForgotPass from "./ForgotPass";
import ResetPass from "./ResetPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/UpdateUser" element={<UpdateUser />}></Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/reset_password/:id/:token" element={<ResetPass />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
