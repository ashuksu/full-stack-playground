export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
};

export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
