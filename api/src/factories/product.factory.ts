import { Product } from "@entities/product.entity";

export const createProduct = (data: Partial<Product>): Product => {
  const {...restData } = data;
  
  if (!restData.name || !restData.type || restData.price == null || !restData.rating) {
    throw new Error('Invalid product data');
  }

  return {
    name: restData.name,
    type: restData.type,
    price: restData.price,
    rating: restData.rating,
    warrantyYears: restData.warrantyYears || 1,
    available: restData.available ?? true,
  };
};
