import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div>
      {products.map(product => (
        <ProductCard product={product} key={product.itemId} />
      ))}
    </div>
  );
};
