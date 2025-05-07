import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/components/ShippingDetails.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {ShippingAddress} from '../types/shippiing';


const ShippingDetails: React.FC = () => {
  const { cart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [address, setAddress] = useState<ShippingAddress>({} as ShippingAddress);
    
  // })

  useEffect (() => {
    const savedAddress = localStorage.getItem("shipping_address")
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress))
      console.log(address)
    }
  }, [])
  const handleCheckout = () => {
    navigate('/payment-mobile');
  }
  
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  }

  return (
    <div className={styles['checkout-container']}>
      <div className={styles['main-content']}>
        <Header />
        <div className={styles['divider-top']} />
        <div className={styles['breadcrumb-sort']}>
          <div className={styles['breadcrumb']}>
            <span className={`${styles['breadcrumb-item']} ${styles['breadcrumb-item-bold']}`}>yannstechub</span>
            <span className={styles['breadcrumb-item']}>/ Daily deals</span>
            <span className={styles['breadcrumb-item']}>/ Cart</span>
            <span className={styles['breadcrumb-item']}>/ Secure Checkout</span>
          </div>
        </div>
        <div className={styles['divider']} />

        <main className={styles['checkout-content']}>
          <div className={styles['content-grid']}>
            <div className={styles['shipping-column']}>
              <section className={styles['shipping-details-section']}>
                <h2 className={styles['section-title']}>Shipping Address</h2>
                <div className={styles['address-card']}>
                  <div className={styles['address-info']}>
                    <p className={styles['info-item']}>Name: {address.firstName} {address.lastName}</p>
                    <p className={styles['info-item']}>Phone: {address.phoneNumber}</p>
                    <p className={styles['info-item']}>Email: {address.email}</p>
                    <p className={styles['info-item']}>Ship to: {address.addressLine1}</p>
                  </div>
                  <button className={styles['edit-button']}>
                    <img className={styles['edit-icon']} src="/imgs/edit.png" alt="Edit" />
                    Edit
                  </button>
                </div>
              </section>

              <div className={styles['method-card']}>
                <h2 className={styles['section-title']}>Shipping Method</h2>
                <p className={styles['method-description']}>Standard Shipping 1-3 business days in Accra, 3-7 business days in other areas.</p>
                <p className={styles['method-description']}>$5.00</p>
              </div>

              <div className={styles['payment-column']}>
                <h2 className={styles['section-title']}>Payment Method</h2>
                
                <div className={styles['payment-option']}>
                  <div className={styles['radio-button']} onClick={() => handlePaymentMethodChange('card')}>
                    {paymentMethod === 'card' && <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0055B6', margin: '3px' }} />}
                  </div>
                  <div className={styles['option-label']}>
                    <p>Pay with Card</p>
                    <p>Pay Now with No E-levy</p>
                  </div>
                </div>

                <h3 className={styles['mobile-money-section']}>Mobile Money</h3>
                
                <div className={styles['mobile-option']}>
                  <div className={styles['radio-button']} onClick={() => handlePaymentMethodChange('mtn')}>
                    {paymentMethod === 'mtn' && <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0055B6', margin: '3px' }} />}
                  </div>
                  <p className={styles['option-label']}>MTN Mobile Money</p>
                </div>
                
                <div className={styles['mobile-option']}>
                  <div className={styles['radio-button']} onClick={() => handlePaymentMethodChange('telecel')}>
                    {paymentMethod === 'telecel' && <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0055B6', margin: '3px' }} />}
                  </div>
                  <p className={styles['option-label']}>Telecel Mobile Money</p>
                </div>
                
                <div className={styles['mobile-option']}>
                  <div className={styles['radio-button']} onClick={() => handlePaymentMethodChange('airtel')}>
                    {paymentMethod === 'airtel' && <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0055B6', margin: '3px' }} />}
                  </div>
                  <p className={styles['option-label']}>AirtelTigo Mobile Money</p>
                </div>
                
                <h3 className={styles['mobile-money-section']}>Pay on Delivery</h3>
                <div className={styles['payment-option']}>
                  <div className={styles['radio-button']} onClick={() => handlePaymentMethodChange('delivery')}>
                    {paymentMethod === 'delivery' && <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0055B6', margin: '3px' }} />}
                  </div>
                  <div className={styles['option-label']}>
                    <p>Pay Mobile Money or in cash on Delivery/Pickup</p>
                    {/* <p>Pay on Delivery</p> */}
                  </div>
                </div>
                
                <button className={styles['checkout-button']} onClick={handleCheckout}>
                  Proceed to checkout
                </button>
              </div>
            </div>

            <section className={styles['order-summary']}>
              <div className={styles['summary-container']}>
                <header className={styles['summary-header']}>
                  <h2>My Order Summary</h2>
                  <span>Edit</span>
                </header>

                <div className={styles['order-items']}>
                  {cart.map((item) => (
                    <React.Fragment key={item.id}>
                      <article className={styles['order-item']}>
                        <img
                          className={styles['remove-icon']}
                          src="/imgs/close.png"
                          alt="Remove"
                          onClick={() => updateQuantity(item, 0)}
                        />
                        <div className={styles['first-item']}>
                          <img
                            className={styles['item-image']}
                            src={item.image}
                            alt={item.title}
                          />
                          <h3 className={styles['item-title']}>{item.title}</h3>
                        </div>
                        <div className={styles['item-details']}>
                          <p className={styles['item-price']}>${item.price.toFixed(2)}</p>
                          <div className={styles['quantity-control']}>
                            <button 
                              className={styles['quantity-button']}
                              onClick={() => updateQuantity(item, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              className={styles['quantity-button']}
                              onClick={() => updateQuantity(item, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <p className={styles['item-total-price']}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </article>
                      <hr className={styles['item-divider']} />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <div className={styles['total-summary']}>
                <div className={styles['summary-grid']}>
                  <div className={styles['summary-labels']}>
                    <p>Cart Summary</p>
                    <p>Shipping</p>
                    <p className={styles['total-label']}>Total</p>
                  </div>
                  <div className={styles['summary-values']}>
                    <p>${subtotal.toFixed(2)}</p>
                    <p>$5.00</p>
                    <p className={styles['total-value']}>${(subtotal + 5).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingDetails;

// import React, { useState, useEffect } from 'react';
// import styles from '../styles/components/ShippingDetails.module.css';
// import { useShipping, ShippingAddress } from '@/hooks/useShipping';
// import { useCheckout } from '@/hooks/useCheckout';

// interface ShippingDetailsProps {
//   onContinue?: () => void;
// }

// const ShippingDetails: React.FC<ShippingDetailsProps> = ({ onContinue }) => {
//   const { addresses, loading, error, fetchAddresses } = useShipping();
//   const { checkoutData, updateCheckoutData } = useCheckout();
//   const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
//   const [sameBillingAddress, setSameBillingAddress] = useState(true);
//   const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   useEffect(() => {
//     // Set default address if available
//     if (addresses.length > 0) {
//       const defaultAddress = addresses.find(addr => addr.isDefault);
//       if (defaultAddress) {
//         setSelectedAddressId(defaultAddress._id);
//         updateCheckoutData({ shippingAddress: defaultAddress });
//       } else {
//         setSelectedAddressId(addresses[0]._id);
//         updateCheckoutData({ shippingAddress: addresses[0] });
//       }
//     }
//   }, [addresses]);

//   const handleAddressSelect = (address: ShippingAddress) => {
//     setSelectedAddressId(address._id);
//     updateCheckoutData({ shippingAddress: address });
//   };

//   const handleBillingAddressSelect = (address: ShippingAddress) => {
//     setSelectedBillingAddressId(address._id);
//     updateCheckoutData({ billingAddress: address });
//   };

//   const handleSameBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const isSame = e.target.checked;
//     setSameBillingAddress(isSame);
//     updateCheckoutData({ sameBillingAddress: isSame });
    
//     if (isSame && selectedAddressId) {
//       const shippingAddress = addresses.find(addr => addr._id === selectedAddressId);
//       if (shippingAddress) {
//         updateCheckoutData({ billingAddress: shippingAddress });
//       }
//     }
//   };

//   const handleContinue = () => {
//     if (!selectedAddressId) {
//       alert('Please select a shipping address');
//       return;
//     }

//     if (!sameBillingAddress && !selectedBillingAddressId) {
//       alert('Please select a billing address');
//       return;
//     }

//     if (onContinue) {
//       onContinue();
//     }
//   };

//   if (loading && addresses.length === 0) {
//     return <div className={styles.loading}>Loading addresses...</div>;
//   }

//   if (error && addresses.length === 0) {
//     return <div className={styles.error}>Error loading addresses: {error}</div>;
//   }

//   return (
//     <div className={styles.shippingDetailsContainer}>
//       <h2 className={styles.title}>Shipping Details</h2>
      
//       <div className={styles.addressSelection}>
//         <h3>Select Shipping Address</h3>
//         {addresses.length > 0 ? (
//           <div className={styles.addressGrid}>
//             {addresses.map(address => (
//               <div 
//                 key={address._id}
//                 className={`${styles.addressCard} ${selectedAddressId === address._id ? styles.selected : ''}`}
//                 onClick={() => handleAddressSelect(address)}
//               >
//                 {address.isDefault && <span className={styles.defaultBadge}>Default</span>}
//                 <h4>{address.fullName}</h4>
//                 <p>{address.addressLine1}</p>
//                 {address.addressLine2 && <p>{address.addressLine2}</p>}
//                 <p>{address.city}, {address.state} {address.zipCode}</p>
//                 <p>{address.country}</p>
//                 <p>{address.phoneNumber}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className={styles.noAddresses}>
//             No shipping addresses found. Please add a new address.
//           </p>
//         )}
//       </div>
      
//       <div className={styles.billingAddressSection}>
//         <div className={styles.sameBillingOption}>
//           <label className={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               checked={sameBillingAddress}
//               onChange={handleSameBillingAddressChange}
//             />
//             Use same address for billing
//           </label>
//         </div>
        
//         {!sameBillingAddress && (
//           <div className={styles.billingAddressSelection}>
//             <h3>Select Billing Address</h3>
//             {addresses.length > 0 ? (
//               <div className={styles.addressGrid}>
//                 {addresses.map(address => (
//                   <div 
//                     key={`billing-${address._id}`}
//                     className={`${styles.addressCard} ${selectedBillingAddressId === address._id ? styles.selected : ''}`}
//                     onClick={() => handleBillingAddressSelect(address)}
//                   >
//                     {address.isDefault && <span className={styles.defaultBadge}>Default</span>}
//                     <h4>{address.fullName}</h4>
//                     <p>{address.addressLine1}</p>
//                     {address.addressLine2 && <p>{address.addressLine2}</p>}
//                     <p>{address.city}, {address.state} {address.zipCode}</p>
//                     <p>{address.country}</p>
//                     <p>{address.phoneNumber}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className={styles.noAddresses}>
//                 No billing addresses found. Please add a new address.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
      
//       <div className={styles.actionButtons}>
//         <button 
//           className={styles.continueButton}
//           onClick={handleContinue}
//           disabled={!selectedAddressId || (!sameBillingAddress && !selectedBillingAddressId)}
//         >
//           Continue to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShippingDetails;
