import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cart";
import {
  useShipping,
  ShippingAddress as ShippingAddressType,
} from "../hooks/useShipping";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/components/ShippingAddress.css";
// import isEqual from "lodash.isequal";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  stateProvince: string;
  city: string;
  district: string;
  address: string;
  address2: string;
  phoneNumber: string;
  setAsDefault: boolean;
}

const ShippingAddress: React.FC = () => {
  const navigate = useNavigate();
  const { addAddress, fetchAddresses, addresses } = useShipping();
  const {
    state: { user },
  } = useAuth();
  interface FormErrors extends Partial<FormData> {
    submit?: string;
    submitError?: string;
  }

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // if (!user) {
  //   localStorage.removeItem("shipping_address");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("auth_token");
  //   navigate("/login");
  //   return null;
  // }

  useEffect(() => {
    const loadAddress = async () => {
      // First check localStorage for saved address try to load from there
      const savedAddress = localStorage.getItem("shipping_address");
      if (savedAddress) {
        setFormData(JSON.parse(savedAddress));
      } else if (user?.token) {
        // Check if addresses are available in the context
        await fetchAddresses();
        const defaultAddress = addresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          const addressData = {
            firstName: defaultAddress.firstName,
            lastName: defaultAddress.lastName,
            email: defaultAddress.email || "",
            stateProvince: defaultAddress.stateProvince,
            city: defaultAddress.city,
            district: defaultAddress.district,
            address: defaultAddress.addressLine1,
            address2: defaultAddress.addressLine2 || "",
            phoneNumber: defaultAddress.phoneNumber,
            setAsDefault: defaultAddress.isDefault,
          };
          setFormData(addressData);
          localStorage.setItem("shipping_address", JSON.stringify(addressData));
        }
      }
    };

    loadAddress();

    return () => {
      // Cleanup function remains empty as fetchAddresses handles its own cleanup
    };
  }, [user, , navigate, addresses]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    stateProvince: "",
    city: "",
    district: "",
    address: "",
    address2: "",
    phoneNumber: "",
    setAsDefault: false,
  });

  const { removeFromCart, updateQuantity, subtotal } = useCart();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);

    // Save to localStorage
    localStorage.setItem("shipping_address", JSON.stringify(newFormData));

    // Clear the error for the field being edited
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear the error for the field being edited
      if (formErrors[name as keyof FormErrors]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    }
  };

  const shipping = 5.0;
  const total = subtotal + shipping;

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.stateProvince.trim())
      errors.stateProvince = "State/Province is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.district.trim()) errors.district = "District is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[\d\s-+()]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormErrors((prev) => ({
        ...prev,
        submitError: "Please fill in all required fields",
      }));
      return;
    }

    try {
      const shippingAddress: Omit<ShippingAddressType, "_id" | "userId"> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        addressLine1: formData.address,
        addressLine2: formData.address2,
        city: formData.city,
        stateProvince: formData.stateProvince,
        district: formData.district,
        country: "Ghana",
        phoneNumber: formData.phoneNumber,
        isDefault: formData.setAsDefault,
      };

      const result = await addAddress(shippingAddress as ShippingAddressType);
      if (result) {
        // Show success message
        alert("Address saved successfully!");
        // Show success toast message
      } else {
        throw new Error("Failed to save address");
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setFormErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : "Failed to save address. Please try again."
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
        localStorage.setItem("shipping_address", JSON.stringify(formData));
        navigate("/shipping-details");
    } catch (error) {
      setFormErrors((prev) => ({
        ...prev,
        submit: "An error occurred while proceeding to checkout",
      }));
    }
  };

  return (
    <div className="SA-secure-checkout">
      <div className="SA-main-contents">
        <Header />
        <div className="SA-divider-top" />
        <div className="SA-breadcrumb-sort">
          <div className="SA-breadcrumb">
            <span className="SA-breadcrumb-item bold">yannstechub</span>
            <span className="SA-breadcrumb-item">/ Daily deals</span>
          </div>
        </div>
        <div className="SA-divider" />

        <main className="SA-checkout-content">
          <section className="SA-shipping-section">
            <h1 className="SA-section-title">Shipping Address</h1>
            <form className="SA-shipping-form" onSubmit={handleSubmit}>
              <div className="SA-form-row">
                {/* // In the render section, update each form group to include error messages */}
                <div className="SA-form-group">
                  <label>First Name</label>
                  <input
                    className={`SA-form-input ${
                      formErrors.firstName ? "SA-input-error" : ""
                    }`}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.firstName && (
                    <span className="SA-error-message">
                      {formErrors.firstName}
                    </span>
                  )}
                </div>
                <div className="SA-form-group">
                  <label>Last Name</label>
                  <input
                    className={`SA-form-input ${
                      formErrors.lastName ? "SA-input-error" : ""
                    }`}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.lastName && (
                    <span className="SA-error-message">
                      {formErrors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="SA-form-group">
                <label>Email</label>
                <input
                  className={`SA-form-input ${
                    formErrors.email ? "SA-input-error" : ""
                  }`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.email && (
                  <span className="SA-error-message">{formErrors.email}</span>
                )}
              </div>

              <div className="SA-form-checkbox">
                <input
                  type="checkbox"
                  id="default-address"
                  name="setAsDefault"
                  checked={formData.setAsDefault}
                  onChange={handleInputChange}
                />
                <label htmlFor="default-address">Set as default</label>
              </div>

              <div className="SA-form-group">
                <label>State/Province</label>
                <input
                  className={`SA-form-input ${
                    formErrors.stateProvince ? "SA-input-error" : ""
                  }`}
                  type="text"
                  name="stateProvince"
                  value={formData.stateProvince}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.stateProvince && (
                  <span className="SA-error-message">
                    {formErrors.stateProvince}
                  </span>
                )}
              </div>

              <div className="SA-form-row">
                <div className="SA-form-group">
                  <label>City</label>
                  <input
                    className={`SA-form-input ${
                      formErrors.city ? "SA-input-error" : ""
                    }`}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.city && (
                    <span className="SA-error-message">{formErrors.city}</span>
                  )}
                </div>
                <div className="SA-form-group">
                  <label>District</label>
                  <input
                    className={`SA-form-input ${
                      formErrors.district ? "SA-input-error" : ""
                    }`}
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.district && (
                    <span className="SA-error-message">
                      {formErrors.district}
                    </span>
                  )}
                </div>
              </div>

              <div className="SA-form-group">
                <label>Address</label>
                <input
                  className={`SA-form-input ${
                    formErrors.address ? "SA-input-error" : ""
                  }`}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, Apartment, Suite, etc."
                  required
                />
                {formErrors.address && (
                  <span className="SA-error-message">{formErrors.address}</span>
                )}
                <p className="SA-helper-text">
                  Detailed street address can help our rider find you quickly.
                </p>
              </div>

              <div className="SA-form-group">
                <label>Address 2</label>
                <input
                  className="SA-form-input"
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="SA-form-group">
                <label>Phone number</label>
                <input
                  className={`SA-form-input ${
                    formErrors.phoneNumber ? "SA-input-error" : ""
                  }`}
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.phoneNumber && (
                  <span className="SA-error-message">
                    {formErrors.phoneNumber}
                  </span>
                )}
              </div>
              {formErrors.submit && (
                <div className="SA-error-message">{formErrors.submit}</div>
              )}
              {/* Update the Save Address button */}
              <button 
                onClick={handleSaveAddress} 
                className="SA-submit-button"
                type="button"
              >
                Save Address
              </button>
            </form>
          </section>

          <section className="SA-order-summary">
            <div className="SA-summary-container">
              <header className="SA-summary-header">
                <span>Order Summary</span>
                <span>{cart.length} items</span>
              </header>

              <div className="SA-order-items">
                {cart.map((item: CartItem) => (
                  <React.Fragment key={item.id}>
                    <article className="SA-order-item">
                      <img
                        className="SA-remove-icon"
                        src="/imgs/close.png"
                        alt="Remove"
                        onClick={() => removeFromCart(item)}
                      />
                      <div className="SA-first-item">
                        <img
                          className="SA-item-image"
                          src={item.image}
                          alt={item.title}
                        />
                        <h3 className="SA-item-title">{item.title}</h3>
                      </div>
                      <div className="SA-item-details">
                        <p className="SA-item-price">
                          ${item.price}
                        </p>
                        <div className="SA-quantity-control">
                          <button
                            className="SA-quantity-button"
                            onClick={() => updateQuantity(item, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="SA-quantity-button"
                            onClick={() => updateQuantity(item, 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="SA-item-total-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </article>
                    <hr className="SA-item-divider" />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="SA-total-summary">
              <div className="SA-summary-grid">
                <div className="SA-summary-labels">
                  <p>Cart Summary</p>
                  <p>Shipping</p>
                  <p className="SA-total-label">Total</p>
                </div>
                <div className="SA-summary-values">
                  <p>${subtotal.toFixed(2)}</p>
                  <p>${shipping.toFixed(2)}</p>
                  <p className="SA-total-value">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="SA-checkout-button"
            >
              Proceed to checkout
            </button>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingAddress;
