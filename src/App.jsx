import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Product from './components/Product/Product'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Category from './components/Category/Category'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Signup from './components/Signup/Signup'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import ForgetPassword from './components/Forget/ForgetPassword'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Brands from './components/Brands/Brands'
import CartContextProvider from './Context/CartContextProvider'
import ShippingDetails from './components/ShippingDetails/ShippingDetails'
import WishList from './components/WishList/WishList'
import WishListContextProvider from './Context/WishListContextProvider'
export default function App() {
  let Router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRouting><Home /></ProtectedRouting> },
        { path: "Product", element: <ProtectedRouting><Product /></ProtectedRouting> },
        { path: "Cart", element: <ProtectedRouting><Cart /></ProtectedRouting> },
        { path: "Category", element: <ProtectedRouting><Category /></ProtectedRouting> },
        { path: "brands", element: <ProtectedRouting><Brands /></ProtectedRouting> },
        { path: "wishList", element: <ProtectedRouting><WishList /></ProtectedRouting> },
        { path: "ShippingDetails/:id", element: <ProtectedRouting><ShippingDetails /></ProtectedRouting> },
        { path: "ProductDetails/:id", element: <ProtectedRouting><ProductDetails /></ProtectedRouting> },
        { path: "Login", element: <Login /> },
        { path: "register", element: <Signup /> },
        { path: "updatepassword", element: <UpdatePassword /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  let client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
          <RouterProvider router={Router} />
          </WishListContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
