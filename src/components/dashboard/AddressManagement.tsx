import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AddressManagement.css';

interface UserAddress {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const AddressManagement: React.FC = () => {
  const [userAddress, setUserAddress] = useState<UserAddress>({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    // Load address data from local storage
    const savedAddress = localStorage.getItem('userAddress');
    if (savedAddress) {
      setUserAddress(JSON.parse(savedAddress));
    } else {
      // Set default address if no saved data exists
      const defaultAddress = {
        name: 'Clopy Studios',
        email: 'Clopy01@gmail.com',
        phoneNumber: '0540234571',
        address: 'Accra Ghana -Dans bar north kaneshie'
      };
      setUserAddress(defaultAddress);
      localStorage.setItem('userAddress', JSON.stringify(defaultAddress));
    }
  }, []);

  return (
    <section className="address-details">
      <div className="user-info">
        <p>Name: {userAddress.name}</p>
        <p>Email: {userAddress.email}</p>
        <p>Phone Number: {userAddress.phoneNumber}</p>
        <p>Address: {userAddress.address}</p>
      </div>
      <Link to="/shipping-address" className="edit-button">Edit</Link>
    </section>
  );
};

export default AddressManagement;

