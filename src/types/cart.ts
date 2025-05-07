export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ApiCartItem {
  produtId: string;
  quantity: number;
}

export interface ApiCart {
  _id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
// export interface CartItem {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   quantity: number;
// }
