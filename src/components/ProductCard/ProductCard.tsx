import { Link } from 'react-router-dom';
import type { Product } from '../../types';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article>
      <Link to={`/product/${product.itemId}`}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
      </Link>
      <p>{product.price}$</p>
      <p>{product.fullPrice}$</p>
      <p>{product.screen}</p>
      <p>{product.capacity}</p>
      <p>{product.ram}</p>
      <button type="button">Add to cart</button>
      <button type="button">Add to favorites</button>
    </article>
  );
};
