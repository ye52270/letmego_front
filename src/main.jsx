import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import Signin from './SignIn'
import SignUp from './SignUp'
import Order from './Order'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignOut from './SignOut'
import OrderList from './OrderList'

import { QueryClient, QueryClientProvider } from "react-query";


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
    path: "/sign-out",
    element: <SignOut />,
  },  
  {
    path: "/myorder/:orderId",
    element: <Order />, 
  },
  {
    path: "/myorder/",
    element: <Order />, 
  },
  {
    path: "/order-list",
    element: <OrderList
    // element: <OrderList 
    // orders={[
    //   {
    //     id: 'f69f88012978187a6c12897f',
    //     ref: 'DEV1049',
    //     amount: 30.5,
    //     customer: {
    //       name: 'Ekaterina Tankova'
    //     },
    //     createdAt: 1555016400000,
    //     status: 'pending'
    //   },
    //   {
    //     id: '9eaa1c7dd4433f413c308ce2',
    //     ref: 'DEV1048',
    //     amount: 25.1,
    //     customer: {
    //       name: 'Cao Yu'
    //     },
    //     createdAt: 1555016400000,
    //     status: 'delivered'
    //   },
    //   {
    //     id: '01a5230c811bd04996ce7c13',
    //     ref: 'DEV1047',
    //     amount: 10.99,
    //     customer: {
    //       name: 'Alexa Richardson'
    //     },
    //     createdAt: 1554930000000,
    //     status: 'refunded'
    //   },
    //   {
    //     id: '1f4e1bd0a87cea23cdb83d18',
    //     ref: 'DEV1046',
    //     amount: 96.43,
    //     customer: {
    //       name: 'Anje Keizer'
    //     },
    //     createdAt: 1554757200000,
    //     status: 'pending'
    //   },
    //   {
    //     id: '9f974f239d29ede969367103',
    //     ref: 'DEV1045',
    //     amount: 32.54,
    //     customer: {
    //       name: 'Clarke Gillebert'
    //     },
    //     createdAt: 1554670800000,
    //     status: 'delivered'
    //   },
    //   {
    //     id: 'ffc83c1560ec2f66a1c05596',
    //     ref: 'DEV1044',
    //     amount: 16.76,
    //     customer: {
    //       name: 'Adam Denisov'
    //     },
    //     createdAt: 1554670800000,
    //     status: 'delivered'
    //   }
    // ]}
    sx={{ height: '100%' }}
    />,
  },
]);

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
 )
