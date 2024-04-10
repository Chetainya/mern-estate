import React from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateRoute() {
    const userData = useSelector(state => state.user.userDetails)
  return (
    userData ? <Outlet /> : <Navigate to='/signin' />
  )
}

export default PrivateRoute
