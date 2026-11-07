import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './Navbar'

export default function Layout() {
  return (
    <div>
     <NavbarComponent/>
      <Outlet/>
    </div>
  )
}
