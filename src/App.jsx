import React from 'react'
import { Toaster } from 'react-hot-toast'
import ProductCrud from './components/product-crud/ProductCrud'
const App = () => {
  return (
    <>
      <ProductCrud/>
      <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default App