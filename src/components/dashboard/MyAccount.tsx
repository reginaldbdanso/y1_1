import React, { useState, useEffect } from 'react';
import './MyAccount.css';
import { useAuth } from '../../context/AuthContext';

const MyAccount: React.FC = () => {
  const { state: { user }, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    dateOfBirth: user.dateOfBirth || ''
  });

  useEffect(() => {
    // Load data from local storage first
    const savedData = localStorage.getItem('user');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else if (user) {
      const newData = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth || ''
      };
      setFormData(newData);
      localStorage.setItem('user', JSON.stringify(newData));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth
      });
      if (success) {
        setIsEditing(false);
        // Update local storage after successful profile update
        localStorage.setItem('userData', JSON.stringify(formData));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isEditing) {
    return (
      <article className="profile-info">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone number</label>
              <input
                className="form-input"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                className="form-input"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="save-button" type="submit">Save</button>
        </form>
      </article>
    );
  }

  if (isChangingPassword) {
    return (
      <article className="profile-info">
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          setIsChangingPassword(false);
        }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={formData.email} readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Current password</label>
            <input className="form-input" type="password" />
          </div>

          <div className="form-group">
            <label className="form-label">New password</label>
            <input className="form-input" type="password" />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm password</label>
            <input className="form-input" type="password" />
          </div>

          <button className="save-button" type="submit">Save</button>
        </form>
      </article>
    );
  }

  return (
    <article className="profile-info">
      <h1 className="welcome-heading">Welcome, {formData.firstName}</h1>
      <h2 className="section-heading">Personal information</h2>
      <div className="user-details">
        Name: {formData.firstName} {formData.lastName}<br />
        Email: {formData.email}<br />
        Phone Number: {formData.phoneNumber}<br />
        Date of Birth: {formData.dateOfBirth}
      </div>
      <div className="action-buttons">
        <button className="button button-primary" onClick={() => setIsChangingPassword(true)}>
          Change Password
        </button>
        <button className="button button-secondary" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    </article>
  );
};

export default MyAccount;
