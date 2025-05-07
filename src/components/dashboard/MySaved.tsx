import React from 'react';
import './MySaved.css';

interface Product {
  id: number;
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
}

const MySaved: React.FC = () => {
  const savedProducts: Product[] = [
    {
      id: 1,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 2,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 3,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 4,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    },
    {
      id: 5,
      image: '/imgs/Rectangle 62.png',
      title: 'Lorem ipsum dolor',
      rating: 5.0,
      reviews: 58,
      price: 50.00
    }
  ];

  return (
    <div className="products-grid">
      {savedProducts.map(product => (
        <article className="product-card" key={product.id}>
          <div className="product-image-container">
            <img className="product-img" src={product.image} alt={product.title} />
            <img className="wishlist-icon" src="/imgs/favorie 1.png" alt="Add to wishlist" />
          </div>
          <h2 className="product-title">{product.title}</h2>
          <div className="product-details">
            <div className="rating-price">
              <div className="rating">
                <img className="rating-icon" src="/imgs/star 1.png" />
                <span>{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
              </div>
              <span className="price">${product.price.toFixed(2)}</span>
            </div>
            <button className="cart-button" aria-label="Add to cart">
              <img className="cart-icon" src="/imgs/Buy - 6.png" alt="" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MySaved;
