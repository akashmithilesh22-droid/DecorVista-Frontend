import { FurnitureItem } from '../types';
import { BackendProduct } from '../api/products.api';

export const mapBackendProductToFurnitureItem = (
  product: BackendProduct
): FurnitureItem => {
  return {
    id: product._id,
    name: product.name,

    // ✅ Backend does not provide description → generate one
    description: `High-quality ${product.name.toLowerCase()} suitable for your space.`,

    price: product.price,
    image: product.imageUrl || '',

    roomTypes: [product.roomType],
    climateCompatible: [],

    minArea: 0,
    maxArea: undefined,

    category: product.category,
    whyThis: 'Recommended based on your preferences and budget',
  };
};
