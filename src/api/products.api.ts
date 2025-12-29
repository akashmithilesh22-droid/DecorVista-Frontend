export type BackendProduct = {
  _id: string;
  name: string;
  roomType: string;
  category: string;
  price: number;
  imageUrl?: string;
};

const BASE_URL = "http://localhost:5000/api/products";

export const fetchProducts = async (params?: {
  roomType?: string;
  category?: string;
  climate?: string;
}): Promise<BackendProduct[]> => {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${BASE_URL}?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
