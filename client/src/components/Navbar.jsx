import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  function handleLogout() {
    alert("Logged out successfully")
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <nav>
      <Link to="/">Home</Link>
      {
        token ? (
          <>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )
      }
    </nav>
  )
}



<div>


</div>