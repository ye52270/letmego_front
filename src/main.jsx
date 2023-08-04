import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import Signin from './SignIn'
import SignUp from './SignUp'
import Order from './modules/Order'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/order",
    element: <Order />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
