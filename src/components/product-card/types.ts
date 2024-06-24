import { type Product } from '@/common/types';

export interface ProductCardProps {
  product: Product;
  categoryName: string | undefined;
  subcategoryName: string | undefined;
}
