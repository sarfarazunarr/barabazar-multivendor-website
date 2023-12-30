import React from 'react'
import Sidebar2 from '../../layout/Sidebar2'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <>
      <Sidebar2 />
      <Outlet />
    </>
  )
}

export default Dashboard