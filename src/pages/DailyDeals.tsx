import React, { useState, useEffect } from "react"
import styles from '../styles/components/DailyDeals.module.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { useProducts } from "@/context/ProductContext"

const DailyDeals: React.FC = () => {
  const { products: contextProducts, isLoading: isContextLoading, error: contextError } = useProducts();
  const [products, setProducts] = useState<any[]>([])
  const [sortOption, setSortOption] = useState<"recommended" | "bestSellers" | "lowPrice" | "highPrice" | "reviews">("recommended")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use products from context
  useEffect(() => {
    if (contextProducts && contextProducts.length > 0) {
      setProducts(contextProducts)
      setIsLoading(false)
    } else {
      setIsLoading(isContextLoading)
    }
    
    if (contextError) {
      setError(contextError)
    }
  }, [contextProducts, isContextLoading, contextError])

  useEffect(() => {
    if (products.length === 0) return

    const sortProducts = () => {
      const productsCopy = [...products]

      switch (sortOption) {
        case "bestSellers":
          return productsCopy.sort((a, b) => b.reviews - a.reviews)
        case "lowPrice":
          return productsCopy.sort((a, b) => a.price - b.price)
        case "highPrice":
          return productsCopy.sort((a, b) => b.price - a.price)
        case "reviews":
          return productsCopy.sort((a, b) => b.rating - a.rating)
        case "recommended":
        default:
          return productsCopy.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
      }
    }

    setProducts(sortProducts())
    setCurrentPage(1)
  }, [sortOption])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as typeof sortOption)
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.dividerTop} />

        <div className={styles.breadcrumbSort}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItemBold}>yannstechub</span>
            <span className={styles.breadcrumbItem}>/ Daily deals</span>
          </div>
          <div className={styles.sortContainer}>
            <label className={styles.sortLabel} htmlFor="sortSelect">Sort by</label>
            <select
              id="sortSelect"
              className={styles.sortSelect}
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="recommended">Recommended</option>
              <option value="bestSellers">Best Sellers</option>
              <option value="lowPrice">Low Price</option>
              <option value="highPrice">High Price</option>
              <option value="reviews">Top Rated</option>
            </select>
          </div>
        </div>

        <div className={styles.dividerNormal} />

        {isLoading ? (
          <div className={styles.statusMessage}>Loading products...</div>
        ) : error ? (
          <div className={styles.statusMessage}>{error}</div>
        ) : (
          <>
            <div className={styles.resultsInfo}>
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </div>

            <div className={styles.productsGrid}>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  title={product.title}
                  rating={product.rating}
                  reviews={product.reviews}
                  price={product.price}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <button
                  className={styles.pageButton}
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  &laquo;
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    className={currentPage === number ? styles.pageButtonActive : styles.pageButton}
                    onClick={() => paginate(number)}
                    aria-label={`Page ${number}`}
                    aria-current={currentPage === number ? "page" : undefined}
                  >
                    {number}
                  </button>
                ))}

                <button
                  className={styles.pageButton}
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  &raquo;
                </button>
              </div>
            )}

            <div className={styles.itemsPerPageContainer}>
              <label className={styles.itemsPerPageLabel} htmlFor="itemsPerPage">Items per page:</label>
              <select
                id="itemsPerPage"
                className={styles.itemsPerPageSelect}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                aria-label="Number of items per page"
              >
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="35">35</option>
              </select>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default DailyDeals