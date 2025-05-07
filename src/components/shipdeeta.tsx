import React from "react";
import {
  PencilIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import "./ShippingDetails.css";

export const ShippingDetails = (): JSX.Element => {
  const mobileMoneyOptions = [
    { id: "mtn", label: "MTN Mobile Money" },
    { id: "telecel", label: "Telecel Mobile Money" },
    { id: "airtel", label: "AirtelTigo Mobile Money" },
  ];

  const prePayOptions = [
    {
      id: "card",
      label: "Pay with Card",
      description: "Pay Now with No E-levy",
    },
  ];

  const navItems = [
    { label: "Daily deals", href: "#" },
    { label: "Shop", href: "#" },
    { label: "Bundle Deals", href: "#" },
    { label: "Support", href: "#" },
  ];

  const customerData = {
    name: "Adusah Poku Kofi Nkansah",
    email: "adusahpoku@gmail.com",
    phone: "05989812365",
    address: "GA-021-6548 Spintex Shell Signboard",
  };

  const cartData = [
    { label: "Cart Summmary", amount: "$50.00", isBold: false },
    { label: "Shipping", amount: "$5.00", isBold: false },
    { label: "Total", amount: "$55.00", isBold: true },
  ];

  const socialIcons = [
    { alt: "Solid brands", src: "/solid-brands-facebook.svg" },
    { alt: "Solid brands", src: "/solid-brands-instagram.svg" },
    {
      alt: "Layer",
      src: "/layer-x0020-1.png",
      isContainer: true,
      className: "icon-container",
    },
    { alt: "Solid brands", src: "/solid-brands-linkedin.svg" },
    { alt: "Solid brands youtube", src: "/solid-brands-youtube.svg" },
    { alt: "Solid brands youtube", src: "/solid-brands-youtube-1.svg" },
  ];

  const companyLinks = [
    { title: "About Us", href: "#" },
    { title: "Careers", href: "#" },
  ];

  const helpLinks = [
    { title: "Legal", href: "#" },
    { title: "FAQs", href: "#" },
    { title: "Contact", href: "#" },
  ];

  return (
    <div className="shipping-details">
      <div className="shipping-details__container">
        <div className="shipping-details__content">
          {/* Navigation */}
          <nav className="nav">
            <div className="nav__logo">
              <div className="logo-container">
                <div className="logo-main">
                  <img
                    className="vector-dot"
                    alt="Vector"
                    src="/vector-3.svg"
                  />
                  <img
                    className="vector-dot"
                    alt="Vector"
                    src="/vector-2.svg"
                  />
                  <img className="group-image" alt="Group" src="/group-2.png" />
                  <div className="logo-text">
                    <img
                      className="group-text"
                      alt="Group"
                      src="/group-3.png"
                    />
                    <img
                      className="vector-main"
                      alt="Vector"
                      src="/vector.svg"
                    />
                  </div>
                </div>
                <div className="logo-suffix">
                  <img className="tech-image" alt="Tech" src="/tech-1.png" />
                  <img className="hub-image" alt="Hub" src="/hub--1.png" />
                </div>
              </div>
            </div>

            <div className="nav__links">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="nav__link">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="nav__actions">
              <button className="action-button">
                <SearchIcon className="action-icon" />
              </button>
              <button className="action-button">
                <UserIcon className="action-icon" />
              </button>
              <button className="action-button cart-button">
                <ShoppingCartIcon className="action-icon" />
                <span className="cart-badge">5</span>
              </button>
            </div>
          </nav>

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <div className="breadcrumb__list">
              <a href="#" className="breadcrumb__item breadcrumb__item--active">
                yannstechub
              </a>
              <a href="#" className="breadcrumb__item">
                Daily deals
              </a>
              <a href="#" className="breadcrumb__item">
                Cart
              </a>
              <a href="#" className="breadcrumb__item">
                Secure Checkout
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="main-content__left">
              {/* Shipping Method */}
              <section className="shipping-method">
                <h2 className="section-title">Shipping Method</h2>
                <div className="shipping-method__card">
                  <div className="shipping-method__details">
                    <div>
                      <span className="text-bold">Standard Shipping </span>
                      <span className="text-medium">
                        1-3 business days in Accra, 3-7 business days in other
                        areas.
                      </span>
                    </div>
                    <div className="text-bold">$5.00</div>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <div className="shipping-address">
                <h2 className="section-title">Shipping Address</h2>
                <div className="shipping-address__card">
                  <div className="shipping-address__content">
                    <div className="shipping-address__details">
                      <div className="address-line">
                        <span className="text-bold">Name:</span>
                        <span className="text-medium">
                          {" "}
                          {customerData.name}
                        </span>
                      </div>
                      <div className="address-line">
                        <span className="text-bold">Email:</span>
                        <span className="text-medium">
                          {" "}
                          {customerData.email}
                        </span>
                      </div>
                      <div className="address-line">
                        <span className="text-bold">Phone:</span>
                        <span className="text-medium">
                          {" "}
                          {customerData.phone}
                        </span>
                      </div>
                      <div className="address-line">
                        <span className="text-bold">Ship to:</span>
                        <span className="text-medium">
                          {" "}
                          {customerData.address}
                        </span>
                      </div>
                    </div>
                    <div className="edit-button">
                      <PencilIcon className="edit-icon" />
                      <button className="text-button">Edit</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="payment-method">
                <h2 className="section-title">Payment Method</h2>
                <div className="payment-method__card">
                  <div className="payment-method__content">
                    <div className="payment-option">
                      <p className="text-bold">Pay on Delivery</p>
                      <p className="text-medium">
                        Pay Mobile Money or in cash on Delivery/Pickup
                      </p>
                    </div>

                    <div className="mobile-money">
                      <h3 className="subsection-title">Mobile Money</h3>
                      {mobileMoneyOptions.map((option) => (
                        <div key={option.id} className="radio-option">
                          <input
                            type="radio"
                            name="payment"
                            id={option.id}
                            className="radio-input"
                          />
                          <label htmlFor={option.id} className="radio-label">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="prepay">
                      <h3 className="subsection-title">Pre-pay Now</h3>
                      {prePayOptions.map((option) => (
                        <div key={option.id} className="radio-option">
                          <input
                            type="radio"
                            name="payment"
                            id={option.id}
                            className="radio-input"
                          />
                          <div>
                            <label htmlFor={option.id} className="radio-label">
                              {option.label}
                            </label>
                            <span className="text-medium">
                              {option.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content__right">
              {/* Order Summary */}
              <div className="order-summary">
                <div className="order-summary__card">
                  <div className="order-summary__header">
                    <h3 className="text-bold">My Order Summary</h3>
                    <span className="text-bold">Edit</span>
                  </div>

                  <div className="order-summary__product">
                    <img
                      className="product-image"
                      alt="Product"
                      src="/rectangle-62.png"
                    />
                    <div className="product-details">
                      <h4 className="text-bold">Lorem ipsum dolor</h4>
                      <p className="text-medium">Qty: 1</p>
                      <p className="text-medium">$50.00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="cart-summary__card">
                  <div className="cart-summary__content">
                    {cartData.map((item, index) => (
                      <div key={index} className="cart-summary__row">
                        <div
                          className={`cart-label ${
                            item.isBold ? "total-label" : ""
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-bold">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-button-container">
            <button className="checkout-button">Proceed to checkout</button>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__main">
              <div className="footer__logo">
                <div className="logo-container">
                  {/* Logo content similar to nav */}
                </div>
                <div className="social-icons">
                  {socialIcons.map((icon, index) =>
                    icon.isContainer ? (
                      <div key={index} className={icon.className}>
                        <img alt={icon.alt} src={icon.src} />
                      </div>
                    ) : (
                      <img
                        key={index}
                        className="social-icon"
                        alt={icon.alt}
                        src={icon.src}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="footer__links">
                <div className="footer__column">
                  <h3 className="footer__heading">Company</h3>
                  <ul className="footer__list">
                    {companyLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="footer__link">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="footer__column">
                  <h3 className="footer__heading">Help</h3>
                  <ul className="footer__list">
                    {helpLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="footer__link">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__copyright">
            <p>@yannstechhub2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
