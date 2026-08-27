import { useEffect, useState, useCallback } from 'react';
import type { Category, Product } from '../../types';
import { getProductsByCategory } from '../../api';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';

type ProductsPageProps = {
  category: Category;
  title: string;
};

export const ProductsPage = ({ category, title }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const sortedProducts = [...products];

  sortedProducts.sort((productA, productB) => {
    switch (sort) {
      case 'title':
        return productA.name.localeCompare(productB.name);
      case 'price':
        return productA.price - productB.price;
      case 'age':
      default:
        return productB.year - productA.year;
    }
  });
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page') || 1);
  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setProducts([]);
    getProductsByCategory(category)
      .then(productsFromApi => setProducts(productsFromApi))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const handlePageChange = (number: number) => {
    const params = new URLSearchParams(searchParams);

    if (number === 1) {
      params.delete('page');
    } else {
      params.set('page', String(number));
    }

    setSearchParams(params);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <h1>{title}</h1>
      <select
        value={sort}
        onChange={event => {
          const params = new URLSearchParams(searchParams);

          params.set('sort', event.target.value);
          setSearchParams(params);
        }}
      >
        <option value="age">Newest</option>
        <option value="title">Alphabetically</option>
        <option value="price">Cheapest</option>
      </select>
      <select
        value={perPage}
        onChange={event => {
          const value = event.target.value;
          const params = new URLSearchParams(searchParams);

          if (value === 'all') {
            params.delete('perPage');
          } else {
            params.set('perPage', value);
          }

          params.delete('page');
          setSearchParams(params);
        }}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">all</option>
      </select>
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <>
          <h2>Something went wrong</h2>

          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </>
      )}
      {!isLoading && !isError && products.length > 0 && (
        <>
          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && totalPages > 1 && (
            <Pagination
              onPageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={page}
            />
          )}
        </>
      )}
      {!isLoading && !isError && products.length === 0 && (
        <p>{`There are no ${category} yet`}</p>
      )}
    </>
  );
};
