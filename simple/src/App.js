import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../src/pages/Home'
import Student from '../src/pages/Student'
import Admin from '../src/pages/Admin'
export default function App() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <><Home /></>
        },
        {
          path: "/student",
          element: <><Student /></>
        },
        {
          path: "/admin",
          element: <><Admin /></>
        },
       
      ])
  return (
   <>
   <RouterProvider router={router} />
   </>
  )
}
