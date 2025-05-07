import React, { useState, useEffect } from 'react';
import styles from '../styles/components/MyAccount.module.css';
import { useProfile, UserProfile } from '@/hooks/useProfile';
import { useAuth } from '../context/AuthContext';

const MyAccount: React.FC = () => {
  const { profile, loading, error, updateProfile, updateAvatar, updatePreferences } = useProfile();
  const { state: user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || 'prefer-not-to-say',
        preferences: {
          marketingEmails: profile.preferences?.marketingEmails || false,
          orderUpdates: profile.preferences?.orderUpdates || true,
          newsletterSubscription: profile.preferences?.newsletterSubscription || false,
        },
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   e.preventDefault;
   alert('Functionality not built yet')
    // const { name, value, type } = e.target as HTMLInputElement;
    // const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    // if (name.startsWith('preferences.')) {
    //   const prefName = name.split('.')[1];
    //   setFormData(prev => ({
    //     ...prev,
    //     preferences: prev.preferences ? {
    //       ...prev.preferences,
    //       [prefName]: checked,
    //     },
    //   }));
    // } else {
    //   setFormData(prev => ({
    //     ...prev,
    //     [name]: type === 'checkbox' ? checked : value,
    //   }));
    // }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update profile data
      await updateProfile(formData);
      
      // Update avatar if changed
      if (avatarFile) {
        await updateAvatar(avatarFile);
      }
      
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page or login page
    window.location.href = '/';
  };

  if (loading && !profile) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (error && !profile) {
    return <div className={styles.error}>Error loading profile: {error}</div>;
  }

  if (!user || !profile) {
    return <div className={styles.notLoggedIn}>Please log in to view your account.</div>;
  }

  return (
    <div className={styles.accountContainer}>
      <h1 className={styles.title}>My Account</h1>
      
      <div className={styles.accountContent}>
        <div className={styles.sidebar}>
          <div className={styles.profileSummary}>
            <div className={styles.avatarContainer}>
              {profile.avatar ? (
                <img src={profile.avatar} alt={`${profile.firstName}'s avatar`} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
              )}
            </div>
            <h2 className={styles.userName}>{profile.firstName} {profile.lastName}</h2>
            <p className={styles.userEmail}>{profile.email}</p>
          </div>
          
          <nav className={styles.accountNav}>
            <ul>
              <li className={styles.navItemActive}>Profile</li>
              <li className={styles.navItem}>Orders</li>
              <li className={styles.navItem}>Addresses</li>
              <li className={styles.navItem}>Payment Methods</li>
              <li className={styles.navItem}>Wishlist</li>
              <li className={styles.navItem}>Reviews</li>
            </ul>
          </nav>
          
          <button className={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.sectionHeader}>
            <h2>Profile Information</h2>
            {!isEditing && (
              <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>
          
          {!isEditing ? (
            <div className={styles.profileInfo}>
              <div className={styles.infoGroup}>
                <h3>Personal Information</h3>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Name:</span>
                  <span className={styles.infoValue}>{profile.firstName} {profile.lastName}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>{profile.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Phone:</span>
                  <span className={styles.infoValue}>{profile.phoneNumber || 'Not provided'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Date of Birth:</span>
                  <span className={styles.infoValue}>{profile.dateOfBirth || 'Not provided'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Gender:</span>
                  <span className={styles.infoValue}>
                    {profile.gender === 'male' ? 'Male' : 
                     profile.gender === 'female' ? 'Female' : 
                     profile.gender === 'other' ? 'Other' : 'Prefer not to say'}
                  </span>
                </div>
              </div>
              
              <div className={styles.infoGroup}>
                <h3>Communication Preferences</h3>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Marketing Emails:</span>
                  <span className={styles.infoValue}>
                    {profile.preferences?.marketingEmails ? 'Subscribed' : 'Not subscribed'}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Order Updates:</span>
                  <span className={styles.infoValue}>
                    {profile.preferences?.orderUpdates ? 'Subscribed' : 'Not subscribed'}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Newsletter:</span>
                  <span className={styles.infoValue}>
                    {profile.preferences?.newsletterSubscription ? 'Subscribed' : 'Not subscribed'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <form className={styles.profileForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <h3>Profile Picture</h3>
                <div className={styles.avatarUpload}>
                  <div className={styles.avatarPreview}>
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className={styles.avatarImage} />
                    ) : profile.avatar ? (
                      <img src={profile.avatar} alt={`${profile.firstName}'s avatar`} className={styles.avatarImage} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={styles.fileInput}
                  />
                  <label htmlFor="avatar" className={styles.fileInputLabel}>
                    Choose Image
                  </label>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required
                  disabled
                />
                <p className={styles.fieldNote}>Email cannot be changed</p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || 'prefer-not-to-say'}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <h3>Communication Preferences</h3>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="preferences.marketingEmails"
                      checked={formData.preferences?.marketingEmails || false}
                      onChange={handleInputChange}
                    />
                    Receive marketing emails
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="preferences.orderUpdates"
                      checked={formData.preferences?.orderUpdates || false}
                      onChange={handleInputChange}
                    />
                    Receive order updates
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="preferences.newsletterSubscription"
                      checked={formData.preferences?.newsletterSubscription || false}
                      onChange={handleInputChange}
                    />
                    Subscribe to newsletter
                  </label>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  Save Changes
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsEditing(false);
                    setAvatarFile(null);
                    setAvatarPreview(null);
                    if (profile) {
                      setFormData({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        email: profile.email,
                        phoneNumber: profile.phoneNumber || '',
                        dateOfBirth: profile.dateOfBirth || '',
                        gender: profile.gender || 'prefer-not-to-say',
                        preferences: profile.preferences,
                      });
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;