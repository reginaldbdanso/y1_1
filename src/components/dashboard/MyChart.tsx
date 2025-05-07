import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, CartItem } from '../../context/CartContext';
import './MyChart.css';

const MyChart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <img 
          src="/imgs/cart.png" 
          alt="Empty cart" 
          style={{ 
            width: '40px', 
            marginBottom: '20px' 
          }} 
        />
        <h2 style={{ 
          fontSize: '24px', 
          marginBottom: '10px' 
        }}>
          Your cart is empty
        </h2>
        <p style={{ 
          color: '#666', 
          marginBottom: '20px' 
        }}>
          Looks like you haven&apos;t added anything to your cart yet
        </p>
        <Link 
          to="/" 
          style={{ 
            backgroundColor: '#0055B6',
            color: '#fff',
            padding: '15px 30px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="cart-summary">
        <div>Product</div>
        <div className="cart-summary-column">
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
      </div>

      {cart.map((item: CartItem) => (
        <div className="cart-item-wrapper" key={item.id}>
          <div className="cart-item-content">
            <img className="product-image" src={item.image} alt={item.title} loading="lazy" />
            <div className="product-description">{item.title}</div>
          </div>
          <div className="product-details">
            <div className="product-price">${item.price.toFixed(2)}</div>
            <div className="quantity-selector">
              <button className="quantity-button" onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button className="quantity-button" onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <div className="product-price">${(item.price * item.quantity).toFixed(2)}</div>
          </div>
          <img
            className="remove-icon"
            src="/imgs/close.png"
            alt="Remove item"
            onClick={() => removeFromCart(item.id)}
            loading="lazy"
          />
        </div>
      ))}

      <div className="subtotal">
        <div className="subtotal-section" />
        <div className="subtotal-container">
          <div className="subtotal-label">Subtotal</div>
          <div className="subtotal-amount">${subtotal.toFixed(2)}</div>
        </div>
        <div className="checkout-divider" />
        <div className="tax-shipping-info">
          Tax included and shipping calculated at checkout
        </div>
        <Link className="checkout-button" to="/payment">
          Proceed to checkout
        </Link>
      </div>
    </>
  );
};

export default MyChart;