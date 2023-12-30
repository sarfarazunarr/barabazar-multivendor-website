import React from 'react'
import Sidebar from '../layout/Sidebar'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default Dashboard