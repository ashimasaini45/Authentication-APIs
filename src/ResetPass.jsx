import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ResetPass() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {id, token} = useParams();
  
  axios.defaults.withCredentials = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");
    axios.post(`http://localhost:3001/reset-password/${id}/${token}`, {password})
      .then(res => {
        if (res.data.status === "Success") {
          navigate('/login');
        }
      }) .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
