import React from 'react';
import  '../styles/components/OrderSummary_module.css';
import { useCart } from '../context/CartContext';

const OrderSummary: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
        <div className="order">
            <div className="summary-container">
              <div className="summary-header">
                <span>Order Summary</span>
                <span>{cart.length} items</span>
              </div>

              <div className="order-items">
                {cart.map((item) => (
                  <React.Fragment key={item.id}>
                    <div className="order-item">
                      <img
                        className="remove-icon"
                        src="/imgs/close.png"
                        alt="Remove"
                        onClick={() => removeFromCart(item.id)}
                      />
                      <div className="first-item">
                        <img
                          className="item-image"
                          src={item.image}
                          alt={item.title}
                        />
                        <div className="item-title">{item.title}</div>
                      </div>
                      <div className="item-details">
                        <div className="item-price">${item.price.toFixed(2)}</div>
                        <div className="quantity-control">
                          <button className="quantity-button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button className="quantity-button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                        <div className="item-total-price">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="item-divider" />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="total-summary">
              <div className="summary-grid">
                <div className="summary-labels">
                  <p>Cart Summary</p>
                  <p>Shipping</p>
                  <p className="total-label">Total</p>
                </div>
                <div className="summary-values">
                  <p>${subtotal.toFixed(2)}</p>
                  <p>${shipping.toFixed(2)}</p>
                  <p className="total-value">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
  );
};

export default OrderSummary;