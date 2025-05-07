import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  _id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  isFavorite: boolean;
  reviews: number;
  badge?: string;
  brand: string;
  condition: 'new' | 'used' | 'refurbished';
  category: string;
  descriptions: Array<any>;
  features: string[];
  specs: string[];
  stock: number;
  thumbnails: string[];
  createdAt: string;
  updatedAt: string;
}

interface Filters {
  priceRange: { min: string; max: string };
  brand: string;
  conditions: {
    new: boolean;
    used: boolean;
    refurbished: boolean;
  };
  sortBy: string;
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  updateProductRating: (productId: string, rating: number) => void;
  toggleFavorite: (productId: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Move useProducts after the Provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: '', max: '' },
    brand: 'all',
    conditions: {
      new: false,
      used: false,
      refurbished: false
    },
    sortBy: 'featured'
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let result = [...products];

    // Apply price filter
    if (filters.priceRange.min || filters.priceRange.max) {
      result = result.filter(product => {
        const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    // Apply brand filter
    if (filters.brand !== 'all') {
      result = result.filter(product => product.brand === filters.brand);
    }

    // Apply condition filters
    const activeConditions = Object.entries(filters.conditions)
      .filter(([, isActive]) => isActive)
      .map(([condition]) => condition);

    if (activeConditions.length > 0) {
      result = result.filter(product => 
        activeConditions.includes(product.condition)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no sorting needed
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const updateProductRating = (productId: string, rating: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === productId
          ? { ...product, rating: (product.rating + rating) / 2, reviews: product.reviews + 1 }
          : product
      )
    );
  };

  const toggleFavorite = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // console.log(data.products); // Log the fetched products for debugging reaso
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        filters,
        setFilters,
        updateProductRating,
        toggleFavorite,
        isLoading,
        error
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Export the hook after the Provider
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};