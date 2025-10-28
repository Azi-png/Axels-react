import {
  ProductCollection,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productVolume: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;

  // Yangi qo‘shimcha maydonlar
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  brand?: string;
  size?: string;
}

export interface ProductListResponse {
  products: Product[];
  minPrice: number;
  maxPrice: number;
  totalCount: number;
}
