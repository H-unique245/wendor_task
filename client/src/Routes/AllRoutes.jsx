import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import LoginPage from '../Pages/Login'

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<h1>Signup</h1>} />
    </Routes>
  )
}

export default AllRoutes
