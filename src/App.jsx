
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout'
import Home from './component/Home'
import About from './component/About'
import Login from './component/login'
import Register from './component/register'
import { ToastContainer } from 'react-toastify'
import { HeroUIProvider } from "@heroui/react";
import CountContextprovider from './component/createContext/counterContext'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from './component/createContext/AuthContext'
import AuthContextProvider from './component/createContext/AuthContext'
import ProtectedRoute from './component/protectedRoute'
import Profile from './component/profile'
import ProtectedAuth from './component/ProtectedAuth'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './component/PostDetails'
import Saved from './component/Saved'
// import {useNetworkState} from 'react-use'
// import { h2 } from 'framer-motion/client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: (<ProtectedRoute><Home/></ProtectedRoute>) },
      { path: 'home', element: (<ProtectedRoute><Home/></ProtectedRoute>)},
      { path: 'profile', element: (<ProtectedRoute><Profile/></ProtectedRoute>)},
      { path: 'saved', element: (<ProtectedRoute><Saved/></ProtectedRoute>)},
      { path: 'postdetails/:id', element: (<ProtectedRoute><PostDetails/></ProtectedRoute>)},
      { path: 'about', element: (<ProtectedRoute><About /></ProtectedRoute>) },
      { path: 'login', element: (<ProtectedAuth><Login /> </ProtectedAuth>)},
      { path: 'Register', element: (<ProtectedAuth><Register /></ProtectedAuth>) }
    ]
  }
])



const queryClient = new QueryClient()

export default function App() {

  // const {online} =useNetworkState()

  return (
  
 <>
   <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
         <CountContextprovider>
        <HeroUIProvider>
          <ToastContainer />
          <RouterProvider router={router}>
          </RouterProvider>
        </HeroUIProvider>
      </CountContextprovider>
    </AuthContextProvider>
  </QueryClientProvider>
 </>
  )
}
