import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import LoginPage from '../Pages/Login'
import PasswordLogin from '../Pages/PasswordLogin'
import SignupForm from '../Pages/Signup'

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/passLogin" element={<PasswordLogin />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  )
}

export default AllRoutes
