import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPass() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");
    axios.post('http://localhost:3001/forgot-password', { email: email})
      .then(res => {
        if (res.data.status === "Success") {
          navigate('/login');
        }
      }) .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="on"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
