import React, { useState, useEffect, useRef } from 'react';
import  '../styles/components/SearchOverlay.module.css';
import { useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{id: number; title: string; price: number; image: string}[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock data - replace with actual API call in production
  const mockProducts = [
    { id: 1, title: 'Wireless Earbuds', price: 99.99, image: '/imgs/Rectangle 62.png' },
    { id: 2, title: 'Smart Watch', price: 199.99, image: '/imgs/Rectangle 62 (4).png' },
    { id: 3, title: 'Bluetooth Speaker', price: 79.99, image: '/imgs/asi.png' },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter mock products based on search term
    const filtered = mockProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      onClose();
    }
  };

  const handleResultClick = (productId: string) => {
    // Navigate to product page
    navigate(`/product/${productId}`);
    onClose();
  };

  return (
    <div 
      className={`overlay ${isOpen ? 'open' : ''}`} 
      ref={overlayRef} 
      onClick={handleClickOutside}
    >
      <button className="close-button" onClick={onClose}>&times;</button>
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="search-results">
          {results.map(product => (
            <div 
              className="result-item" 
              key={product.id} 
              onClick={() => handleResultClick(product.id)}
            >
              <img 
                className="result-image" 
                src={product.image} 
                alt={product.title} 
              />
              <div className="result-info">
                <div className="result-title">{product.title}</div>
                <div className="result-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay; 