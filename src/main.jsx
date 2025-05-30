import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import ErrorPage from './components/404page.jsx'
import 'app.css'
import { lazy, Suspense } from 'react'


const ProductDetail = lazy(()=> import('./components/ProductDetail.jsx'));
const ProductList = lazy(()=> import('./components/ProductList.jsx'));
const Cart = lazy(()=> import('./components/Cart.jsx'));
const Checkout = lazy(()=> import('./components/Checkout.jsx'))

const appRouter = createBrowserRouter([
  {
    element : <App/>,
    path : "/",
    errorElement : <ErrorPage/>,
    children : [
      {
  element : <Suspense fallback={<div>Loading</div>}><ProductList/></Suspense> ,
    path : "/",
     errorElement : <ErrorPage/>,
      },

  {
    element : <Suspense fallback={<div>Loading</div>}><ProductDetail/></Suspense> ,
    path : "/product/:id",
     errorElement : <ErrorPage/>,
  },
    {
    element :<Suspense fallback={<div>Loading</div>}> <Cart/></Suspense>,
    path : "/cart",
     errorElement : <ErrorPage/>,
  },
    {
    element : <Suspense fallback={<div>Loading</div>}> <Checkout/></Suspense>,
    path : "/checkout",
     errorElement : <ErrorPage/>,
  },
    ]
  }, 


])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={appRouter}>
   <App />
    </RouterProvider>
 

)
