import React, { useState } from 'react';
import styles from '../styles/components/SecureCheckout.module.css';
import ShippingDetails from '../pages/ShippingDetails';
import PaymentMobile from './PaymentMobile';
import { useCheckout } from '@/hooks/useCheckout';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

const SecureCheckout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const { checkoutData, updateCheckoutData, placeOrder, loading, error, orderSummary } = useCheckout();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleContinueFromShipping = () => {
    setCurrentStep('payment');
  };

  const handleContinueFromPayment = () => {
    setCurrentStep('review');
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
  };

  const handleBackToPayment = () => {
    setCurrentStep('payment');
  };

  const handleOrderNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCheckoutData({ orderNotes: e.target.value });
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCheckoutData({ agreeToTerms: e.target.checked });
  };

  const handlePlaceOrder = async () => {
    if (!checkoutData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    const order = await placeOrder();
    if (order) {
      navigate(`/order-confirmation/${order.orderId}`);
    }
  };

  const renderStepIndicator = () => (
    <div className={styles.stepIndicator}>
      <div className={`${styles.step} ${currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'review' ? styles.active : ''}`}>
        <div className={styles.stepNumber}>1</div>
        <div className={styles.stepLabel}>Shipping</div>
      </div>
      <div className={styles.stepConnector} />
      <div className={`${styles.step} ${currentStep === 'payment' || currentStep === 'review' ? styles.active : ''}`}>
        <div className={styles.stepNumber}>2</div>
        <div className={styles.stepLabel}>Payment</div>
      </div>
      <div className={styles.stepConnector} />
      <div className={`${styles.step} ${currentStep === 'review' ? styles.active : ''}`}>
        <div className={styles.stepNumber}>3</div>
        <div className={styles.stepLabel}>Review</div>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className={styles.orderSummary}>
      <h3 className={styles.summaryTitle}>Order Summary</h3>
      <div className={styles.summaryItems}>
        {cart?.items.map(item => (
          <div key={item.product._id} className={styles.summaryItem}>
            <div className={styles.itemImage}>
              <img src={item.product.image} alt={item.product.title} />
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.itemTitle}>{item.product.title}</div>
              <div className={styles.itemQuantity}>Qty: {item.quantity}</div>
            </div>
            <div className={styles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className={styles.summaryTotals}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${cart?.subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span>${(checkoutData.shippingMethod?.price || 0).toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Tax</span>
          <span>${cart?.tax.toFixed(2)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
          <span>Total</span>
          <span>${((cart?.total || 0) + (checkoutData.shippingMethod?.price || 0)).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Secure Checkout</h1>
      
      {renderStepIndicator()}
      
      <div className={styles.checkoutContent}>
        <div className={styles.checkoutMain}>
          {currentStep === 'shipping' && (
            <ShippingDetails onContinue={handleContinueFromShipping} />
          )}
          
          {currentStep === 'payment' && (
            <>
              <button className={styles.backButton} onClick={handleBackToShipping}>
                Back to Shipping
              </button>
              <PaymentMobile onContinue={handleContinueFromPayment} />
            </>
          )}
          
          {currentStep === 'review' && (
            <div className={styles.reviewSection}>
              <button className={styles.backButton} onClick={handleBackToPayment}>
                Back to Payment
              </button>
              
              <h2 className={styles.sectionTitle}>Review Your Order</h2>
              
              <div className={styles.reviewDetails}>
                <div className={styles.reviewBlock}>
                  <h3>Shipping Address</h3>
                  {checkoutData.shippingAddress && (
                    <div className={styles.addressDetails}>
                      <p>{checkoutData.shippingAddress.fullName}</p>
                      <p>{checkoutData.shippingAddress.addressLine1}</p>
                      {checkoutData.shippingAddress.addressLine2 && (
                        <p>{checkoutData.shippingAddress.addressLine2}</p>
                      )}
                      <p>
                        {checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state} {checkoutData.shippingAddress.zipCode}
                      </p>
                      <p>{checkoutData.shippingAddress.country}</p>
                      <p>{checkoutData.shippingAddress.phoneNumber}</p>
                    </div>
                  )}
                </div>
                
                {!checkoutData.sameBillingAddress && checkoutData.billingAddress && (
                  <div className={styles.reviewBlock}>
                    <h3>Billing Address</h3>
                    <div className={styles.addressDetails}>
                      <p>{checkoutData.billingAddress.fullName}</p>
                      <p>{checkoutData.billingAddress.addressLine1}</p>
                      {checkoutData.billingAddress.addressLine2 && (
                        <p>{checkoutData.billingAddress.addressLine2}</p>
                      )}
                      <p>
                        {checkoutData.billingAddress.city}, {checkoutData.billingAddress.state} {checkoutData.billingAddress.zipCode}
                      </p>
                      <p>{checkoutData.billingAddress.country}</p>
                      <p>{checkoutData.billingAddress.phoneNumber}</p>
                    </div>
                  </div>
                )}
                
                <div className={styles.reviewBlock}>
                  <h3>Payment Method</h3>
                  {checkoutData.paymentMethod && (
                    <div className={styles.paymentDetails}>
                      {checkoutData.paymentMethod.type === 'credit_card' && (
                        <>
                          <p>Credit Card</p>
                          <p>**** **** **** {checkoutData.paymentMethod.details.cardNumber?.slice(-4)}</p>
                          <p>{checkoutData.paymentMethod.details.cardHolder}</p>
                          <p>Expires: {checkoutData.paymentMethod.details.expiryDate}</p>
                        </>
                      )}
                      
                      {checkoutData.paymentMethod.type === 'paypal' && (
                        <>
                          <p>PayPal</p>
                          <p>{checkoutData.paymentMethod.details.email}</p>
                        </>
                      )}
                      
                      {checkoutData.paymentMethod.type === 'apple_pay' && (
                        <p>Apple Pay</p>
                      )}
                      
                      {checkoutData.paymentMethod.type === 'google_pay' && (
                        <p>Google Pay</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className={styles.reviewBlock}>
                  <h3>Shipping Method</h3>
                  {checkoutData.shippingMethod && (
                    <div className={styles.shippingDetails}>
                      <p>{checkoutData.shippingMethod.name}</p>
                      <p>Estimated delivery: {checkoutData.shippingMethod.estimatedDelivery}</p>
                      <p>${checkoutData.shippingMethod.price.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.orderNotes}>
                <h3>Order Notes (Optional)</h3>
                <textarea
                  placeholder="Add any special instructions or notes for your order"
                  value={checkoutData.orderNotes || ''}
                  onChange={handleOrderNotesChange}
                />
              </div>
              
              <div className={styles.termsAgreement}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkoutData.agreeToTerms || false}
                    onChange={handleTermsChange}
                  />
                  I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                </label>
              </div>
              
              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <button
                className={styles.placeOrderButton}
                onClick={handlePlaceOrder}
                disabled={loading || !checkoutData.agreeToTerms}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.checkoutSidebar}>
          {renderOrderSummary()}
        </div>
      </div>
    </div>
  );
};

export default SecureCheckout;