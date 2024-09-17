import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        if(res.data.status === "Success") {
          navigate('/dashboard');
          if (res.data.role === "admin") {
            navigate('/home');
          } else {
            navigate('/');
          }
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
             type="password"
             placeholder="Enter Password"
             name="password"
             className="form-control rounded-0"
             onChange={(e) => setPassword(e.target.value)}
             required
             autoComplete="current-password"  // Added this attribute
           />
          </div>
          <button onClick={handleSubmit} type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Don't have an account? 
          <br />
          <Link to="/register">Sign up</Link>
      
        </p>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </div>
  );
}

export default Login;
