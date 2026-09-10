import { ProductsList } from '../../components/ProductsList';
import { useShop } from '../../context/ShopContext';

export const FavoritesPage = () => {
  const { favorites } = useShop();

  if (favorites.length === 0) {
    return <h1>No favorites yet</h1>;
  }

  return <ProductsList products={favorites} />;
};
