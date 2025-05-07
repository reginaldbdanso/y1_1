// export interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   rating: number;
//   reviews: number;
//   stock: number;
//   brand: string;
//   features?: string[];
//   specifications?: {
//     [key: string]: string;
//   };
//   relatedProducts?: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }

export interface Product {
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