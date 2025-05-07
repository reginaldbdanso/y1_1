"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import '../styles/components/index_module.css';
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { useProducts } from "@/context/ProductContext"

// Types
interface Category {
  id: number
  name: string
  image: string
  link: string
}

interface SimpleProductCardProps {
  image: string
  title: string
  id: string
}

// Update SimpleProductCard to use string IDs
const SimpleProductCard: React.FC<SimpleProductCardProps> = ({ image, title, id }) => {
  return (
    <div className="simple-product-card">
      <Link to={`/product/${id}`} state={{ product: { id, image, title } }}>
        <div className="product-image-wrapper">
          <img 
            className="product-image" 
            src={image || "/placeholder.svg"} 
            alt={title} 
          />
          <div className="product-overlay">
            <h3>{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

// Move getUniqueCategories inside the component to use context products
const Index: React.FC = () => {
  const { products: contextProducts, isLoading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("top-rated")
  const [showAllTabProducts, setShowAllTabProducts] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Define getUniqueCategories function inside component to use contextProducts
  const getUniqueCategories = () => {
    if (!contextProducts || contextProducts.length === 0) return [];
    
    const uniqueCategories: string[] = []
    const categoryIcons: Record<string, string> = {}

    // Collect unique categories and their icons
    contextProducts.forEach((product) => {
      if (product.category && !uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category)

        // If the product has a categoryIcon, store it for this category
        // Since products don't have categoryIcon, we'll use the first product's image as the category icon
        categoryIcons[product.category] = product.image
      }
    })

    // Map to Category objects
    return uniqueCategories.map((category, index) => {
      const categorySlug = category.toLowerCase().replace(/\s+/g, "-")

      // Use the category icon if available, otherwise use the first product image from this category
      let categoryImage = "/imgs/Rectangle 9.png" // Default fallback image

      if (categoryIcons[category]) {
        // If we have a dedicated category icon, use it
        categoryImage = categoryIcons[category]
      } else {
        // Otherwise, find the first product in this category and use its image
        const productInCategory = contextProducts.find((product) => product.category === category)
        if (productInCategory) {
          categoryImage = productInCategory.image
        }
      }

      return {
        id: index + 1,
        name: category,
        image: categoryImage,
        link: `/category/${categorySlug}`,
      }
    })
  }

  // Get categories dynamically from products
  const actualCategories = useMemo(() => getUniqueCategories(), [contextProducts]);
  
  // Create a reference to store the categories with clones for infinite loop
  const categoriesWithClones = useMemo(() => {
    if (actualCategories.length === 0) return []

    // Clone the first few categories and append them to the end
    // This creates the illusion of an infinite loop
    const numClones = Math.min(4, actualCategories.length)
    const clones = actualCategories.slice(0, numClones)
    return [...actualCategories, ...clones]
  }, [actualCategories])

  const totalCategories = actualCategories.length

  const handleNextCategory = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentCategoryIndex((prev) => {
      // If we're at the end of the original items, prepare to loop
      if (prev >= totalCategories - 1) {
        // We'll handle the reset in the transitionend effect
        return prev + 1
      }
      return prev + 1
    })
  }

  const handlePrevCategory = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentCategoryIndex((prev) => {
      if (prev <= 0) {
        // For backward movement, jump to the end
        return totalCategories - 1
      }
      return prev - 1
    })
  }

  // Handle the transition end and reset position if needed
  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false)

      // If we've scrolled past the original items to the clones
      if (currentCategoryIndex >= totalCategories) {
        // Immediately reset to the beginning without transition
        setTimeout(() => {
          const categoriesElement = document.querySelector('.categories-products')
          if (categoriesElement) {
            categoriesElement.classList.add("no-transition")
            setCurrentCategoryIndex(0)

            // Force a reflow before removing the class
            // void categoriesElement.offsetWidth

            setTimeout(() => {
              categoriesElement.classList.remove("no-transition")
            }, 50)
          }
        }, 50)
      }
    }

    const categoriesElement = document.querySelector('.categories-products')
    if (categoriesElement) {
      categoriesElement.addEventListener("transitionend", handleTransitionEnd)
      return () => {
        categoriesElement.removeEventListener("transitionend", handleTransitionEnd)
      }
    }
  }, [currentCategoryIndex, totalCategories])

  // Auto-rotate categories
  useEffect(() => {
    const autoRotateInterval = setInterval(handleNextCategory, 3000)
    return () => clearInterval(autoRotateInterval)
  }, [isTransitioning])

  // Add a global style for the no-transition class
  useEffect(() => {
    // Add a style tag for the no-transition class
    const styleTag = document.createElement("style")
    styleTag.innerHTML = `.no-transition { transition: none !important; }`
    document.head.appendChild(styleTag)

    return () => {
      document.head.removeChild(styleTag)
    }
  }, [])

  const slides = [
    { id: 1, image: "/imgs/Banner 1.png" },
    { id: 2, image: "/imgs/Banner 2.png" },
    { id: 3, image: "/imgs/Banner 3.png" },
    { id: 4, image: "/imgs/Banner 4.png" },
    { id: 5, image: "/imgs/Banner 5.png" },
  ]

  // Filter products based on the active tab - update to use contextProducts
  const getFilteredProducts = () => {
    if (!contextProducts || contextProducts.length === 0) return [];
    
    switch (activeTab) {
      case "top-rated":
        return contextProducts.filter((product) => product.rating >= 4.5).slice(0, showAllTabProducts ? undefined : 8)
      case "latest-arrivals":
        // Sort by most recent using createdAt or updatedAt
        return [...contextProducts]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, showAllTabProducts ? undefined : 8)
      case "best-deals":
        // Assuming we can calculate best deals based on price
        return contextProducts.filter((product) => product.price < 100).slice(0, showAllTabProducts ? undefined : 8)
      default:
        return contextProducts.slice(0, showAllTabProducts ? undefined : 8)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Reset view all state when tab changes
  useEffect(() => {
    setShowAllTabProducts(false)
  }, [activeTab])

  return (
    <div className="landing-container">
      <Header />
      <div className="hero-section">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              position: index === currentSlide ? 'relative' : 'absolute',
              width: '100%'
            }}
          >
            <img 
              src={slide.image || "/placeholder.svg"} 
              alt={`Banner ${slide.id}`}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="categories-section">
          <div className="category-title">
            Browse by Category Shop.
            <span style={{ color: "#bbbbbb" }}>the best way to buy the products you love.</span>
          </div>

          <div className="hero-controls">
            <img 
              className="arrow-button" 
              src="/imgs/Vector (1).png" 
              alt="Previous" 
              onClick={handlePrevCategory} 
            />
            <img 
              className="arrow-button" 
              src="/imgs/Vector (2).png" 
              alt="Next" 
              onClick={handleNextCategory} 
            />
          </div>

          <div className="slider-container">
            {categoriesWithClones.length > 0 ? (
              <div 
                className="categories-products"
                style={{
                  transform: `translateX(-${currentCategoryIndex * 144}px)`,
                }}
              >
                {categoriesWithClones.map((category, index) => (
                  <div key={`${category.id}-${index}`} style={{ cursor: "pointer" }}>
                    <Link
                      to={category.link}
                      style={{ textDecoration: "none", display: "block" }}
                      onClick={() => {
                        console.log(`Clicked category: ${category.name}, navigating to: ${category.link}`)
                      }}
                    >
                      <div className="category-icon-wrapper">
                        <img className="category-icon" src={category.image} alt={category.name} />
                        <div className="category-label">{category.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>No categories found</div>
            )}
          </div>
        </div>

        <div className="items-section">
          <h3>
            Our Latest Items.
            <span style={{ color: "#bbbbbb" }}>Have A Look At What&apos;s New, Now.</span>
          </h3>

          <div className="image-section">
            <div className="card">
              <div className="card-content">
                <img src="/imgs/Rectangle 17.png" alt="Nature Image" />
              </div>
              <a
                href="#top-rated"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("top-rated")
                }}
                className={activeTab === "top-rated" ? "active" : ""}
              >
                Top Rated
              </a>
            </div>

            <div className="card">
              <div className="grid-container">
                <img src="/imgs/Rectangle 51.png" alt="Forest" />
                <img src="/imgs/Rectangle 52.png" alt="Ocean" />
                <img src="/imgs/Rectangle 53.png" alt="Mountain" />
                <img src="/imgs/Rectangle 54.png" alt="City" />
              </div>
              <a
                href="#latest-arrivals"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("latest-arrivals")
                }}
                className={activeTab === "latest-arrivals" ? "active" : ""}
              >
                Latest Arrivals
              </a>
            </div>

            <div className="card">
              <div className="double-image-container">
                <img src="/imgs/Rectangle 49.png" alt="Tech Image" />
                <img src="/imgs/Rectangle 50.png" alt="Business Image" />
              </div>
              <a
                href="#best-deals"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab("best-deals")
                }}
                className={activeTab === "best-deals" ? "active" : ""}
              >
                Best Deals
              </a>
            </div>
          </div>

          <div style={{ marginTop: "30px", width: "100%" }}>
            <div className="product-section-header">
              <div 
                className="view-all-link" 
                onClick={() => setShowAllTabProducts(!showAllTabProducts)}
              >
                {showAllTabProducts ? "Show Less" : "View All"}
              </div>
            </div>

            {showAllTabProducts ? (
              <div className="full-products-grid">
                {getFilteredProducts().map((product) => (
                  <SimpleProductCard key={product._id} id={product._id} image={product.image} title={product.title} />
                ))}
              </div>
            ) : (
              <div className="small-products-grid">
                {getFilteredProducts().map((product) => (
                  <SimpleProductCard key={product._id} id={product._id} image={product.image} title={product.title} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="product-txt">
          On Sale.
          <span style={{ color: "#bbbbbb" }}>Your favorite gadgets, delivered right to your doorstep in no time.</span>
        </div>

        <div className="products-grid">
          <div className="trend-card">
            <p>
              Trend
              <br />
              Products
            </p>
            <div className="highlight-circle">
              <img src="/imgs/Vector.png" alt="Trending" />
            </div>
          </div>

          {contextProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}    
              image={product.image}
              title={product.title}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
              noBorder={true} 
            />
          ))}
        </div>

        <div className="promo-banner">
          <div className="promo-content">
            <div className="promo-row">
              <div className="promo-col">
                <img className="promo-image" src="/imgs/Watch.png" alt="Fast Sales promotion" />
              </div>
              <div className="promo-text-col">
                <div className="promo-title">Fast Sales</div>
                <div className="promo-description">Yanns tech Hub Sales.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="features-grid">
            <div className="feature-col">
              <div className="feature-card">
                <div className="feature-content">
                  <img className="feature-icon" src="/imgs/delivery.png" alt="" />
                  <div className="feature-title">Free Delivery</div>
                  <div className="feature-description">And free returns. See checkout for delivery dates.</div>
                </div>
              </div>
            </div>

            <div className="feature-col">
              <div className="feature-card">
                <div className="feature-content">
                  <img className="feature-icon" src="/imgs/0-percent.png" alt="" />
                  <div className="feature-title">Pay 0% interest for up to 24months</div>
                  <div className="feature-description">Choose any items of your choice without paying any interest.</div>
                </div>
              </div>
            </div>

            <div className="feature-col">
              <div className="feature-card">
                <div className="feature-content">
                  <img className="feature-icon" src="/imgs/support.png" alt="" />
                  <div className="feature-title">Customer Support</div>
                  <div className="feature-description">Helping customers resolve issues with products or services.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-title">Subscribe for Newsletter</div>
          <div className="newsletter-description">Subscribe to get latest updates and information.</div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="email-input" 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
            <button className="newsletter-button" type="submit">Send</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Index
