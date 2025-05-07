import React, { useState, useEffect } from "react"
import styles from '../styles/components/Shop.module.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { useProducts } from "@/context/ProductContext"

const Shop: React.FC = () => {
  const { products: contextProducts, isLoading } = useProducts();
  
  const categories = ["All Categories", ...Array.from(new Set(contextProducts?.map((product) => product.category) || []))]
  const brands = ["All Brands", ...Array.from(new Set(contextProducts?.map((product) => product.brand) || []))]

  const [minPrice, setMinPrice] = useState<string>("100")
  const [maxPrice, setMaxPrice] = useState<string>("1500")
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [conditions, setConditions] = useState({
    new: false,
    second: false,
    refurbish: false,
  })
  const [sortOption, setSortOption] = useState<string>("recommended")
  const [mainSortOption, setMainSortOption] = useState<string>("recommended")
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  // Initialize filtered products when context products load
  useEffect(() => {
    if (contextProducts) {
      setFilteredProducts(contextProducts);
    }
  }, [contextProducts]);

  useEffect(() => {
    if (!contextProducts) return;
    
    // console.log("Available categories:", Array.from(new Set(contextProducts.map((p) => p.category))))
    // console.log(
    //   "Accessories products:",
    //   contextProducts.filter((p) => p.category === "Accessories"),
    // )

    if (selectedCategory === "Accessories") {
      // console.log("Filtered products for Accessories:", filteredProducts)
      // console.log("Selected conditions:", conditions)
      // console.log("Selected brand:", selectedBrand)
      // console.log("Price range:", minPrice, maxPrice)
    }
  }, [selectedCategory, filteredProducts, conditions, selectedBrand, minPrice, maxPrice, contextProducts])

  const handleConditionChange = (condition: keyof typeof conditions) => {
    setConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }))
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (selectedCategory !== "All Categories") count++
    if (selectedBrand !== "All Brands") count++
    if (conditions.new || conditions.second || conditions.refurbish) count++
    if (minPrice !== "100" || maxPrice !== "1500") count++
    return count
  }

  const clearAllFilters = () => {
    setMinPrice("100")
    setMaxPrice("1500")
    setSelectedBrand("All Brands")
    setSelectedCategory("All Categories")
    setConditions({
      new: false,
      second: false,
      refurbish: false,
    })
    setSortOption("recommended")
    if (contextProducts) {
      setFilteredProducts(contextProducts)
    }
  }

  const applyFilters = () => {
    if (!contextProducts) return;
    
    let filtered = [...contextProducts]

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    const minPriceValue = Number.parseFloat(minPrice) || 0
    const maxPriceValue = Number.parseFloat(maxPrice) || Number.POSITIVE_INFINITY

    filtered = filtered.filter((product) => product.price >= minPriceValue && product.price <= maxPriceValue)

    if (selectedBrand !== "All Brands") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    const selectedConditions: string[] = []
    if (conditions.new) selectedConditions.push("New")
    if (conditions.second) selectedConditions.push("Second")
    if (conditions.refurbish) selectedConditions.push("Refurbished")

    if (selectedConditions.length > 0) {
      filtered = filtered.filter((product) => selectedConditions.includes(product.condition))
    }

    const sortingOption = sortOption === "recommended" ? mainSortOption : sortOption

    switch (sortingOption) {
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredProducts(filtered)
  }

  useEffect(() => {
    if (contextProducts) {
      applyFilters()
    }
  }, [selectedCategory, selectedBrand, minPrice, maxPrice, conditions, sortOption, mainSortOption, contextProducts])

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading products...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.dividerTop} />
        <div className={styles.breadcrumbSort}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItemBold}>yannstechub</span>
            <span className={styles.breadcrumbItem}>
              / Shop {selectedCategory !== "All Categories" && `/ ${selectedCategory}`}
            </span>
          </div>
          <div className={styles.sortContainer}>
            <label className={styles.sortLabel} htmlFor="sortSelect">Sort by</label>
            <select
              id="sortSelect"
              className={styles.sortSelect}
              value={mainSortOption}
              onChange={(e) => setMainSortOption(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="reviews">Best Reviews</option>
              <option value="low">Low Price</option>
              <option value="high">High Price</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        <div className={styles.dividerNormal} />
        <div className={styles.mainGrid}>
          <div className={styles.gridContainer}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <div className={styles.categoriesSection}>
                  <h2 className={styles.categoryTitle}>Categories</h2>
                  <div className={styles.categoryDivider} />
                  <nav className={styles.categoryNav}>
                    <ul>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <button
                            className={selectedCategory === category ? styles.categoryLinkActive : styles.categoryLink}
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className={styles.priceSection}>
                  <h2 className={styles.filterTitle}>
                    Filters
                    {getActiveFilterCount() > 0 && <span className={styles.filterCount}>{getActiveFilterCount()}</span>}
                  </h2>

                  <h3 className={styles.filterTitle}>Price Range</h3>
                  <div className={styles.priceRangeContainer}>
                    <input
                      type="number"
                      className={styles.priceRange}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                    />
                    <span className={styles.priceRangeText}>to</span>
                    <input
                      type="number"
                      className={styles.priceRange}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                    />
                  </div>

                  <h3 className={styles.brandName}>Brand Name</h3>
                  <select
                    className={styles.brandSelect}
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    {brands.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>

                  <h3 className={styles.sortTitle}>Sort by</h3>
                  <select
                    className={styles.sortOptions}
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="reviews">Reviews</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>

                  <h3 className={styles.conditionsTitle}>Conditions</h3>
                  <div className={styles.conditionOption}>
                    <input
                      type="checkbox"
                      id="new"
                      className={styles.checkbox}
                      checked={conditions.new}
                      onChange={() => handleConditionChange("new")}
                    />
                    <label htmlFor="new" className={styles.conditionLabel}>
                      New
                    </label>
                  </div>
                  <div className={styles.conditionOption}>
                    <input
                      type="checkbox"
                      id="second"
                      className={styles.checkbox}
                      checked={conditions.second}
                      onChange={() => handleConditionChange("second")}
                    />
                    <label htmlFor="second" className={styles.conditionLabel}>
                      Second
                    </label>
                  </div>
                  <div className={styles.conditionOption}>
                    <input
                      type="checkbox"
                      id="refurbish"
                      className={styles.checkbox}
                      checked={conditions.refurbish}
                      onChange={() => handleConditionChange("refurbish")}
                    />
                    <label htmlFor="refurbish" className={styles.conditionLabel}>
                      Refurbished
                    </label>
                  </div>

                  <button className={styles.resetFiltersButton} onClick={clearAllFilters}>
                    Reset Filters
                  </button>

                  {getActiveFilterCount() > 0 && (
                    <button className={styles.clearFiltersButton} onClick={clearAllFilters}>
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </aside>
            <div className={styles.productsGrid}>
              {currentProducts.length > 0 ? (
                <>
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      _id={product._id}
                      image={product.image}
                      title={product.title}
                      rating={product.rating}
                      reviews={product.reviews}
                      price={product.price}
                    />
                  ))}

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
                    <label className={styles.itemsPerPageLabel} htmlFor="itemsPerPage">
                      Items per page:
                    </label>
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
              ) : (
                <div className={styles.noProductsMessage}>
                  No products match your filter criteria. Try adjusting your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Shop;

