import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import cn from 'classnames';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToCart,
    isInCart,
  } = useShop();

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(product);
    }
  };

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
      <button type="button" onClick={handleAddToCart} disabled={inCart}>
        {inCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        type="button"
        className={cn({ active: favorite })}
        onClick={handleToggleFavorite}
      >
        Add to favorites
      </button>
    </article>
  );
};
