import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { ReviewProvider } from './context/ReviewContext'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <ProductProvider>
      <ReviewProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </ReviewProvider>
    </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
)