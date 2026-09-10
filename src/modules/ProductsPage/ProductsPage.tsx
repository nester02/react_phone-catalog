import { useEffect, useState, useCallback } from 'react';
import type { Category, Product } from '../../types';
import { getProductsByCategory } from '../../api';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { ErrorBlock } from '../../components/ErrorBlock';
import styles from './ProductsPage.module.scss';

type ProductsPageProps = {
  category: Category;
  title: string;
};

const PAGE_TITLES: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const ProductsPage = ({ category }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = Number(searchParams.get('page') || 1);

  const sortedProducts = [...products];

  const sort =
    sortParam === 'title' || sortParam === 'price' || sortParam === 'age'
      ? sortParam
      : 'age';

  const perPage =
    perPageParam === '4' ||
    perPageParam === '8' ||
    perPageParam === '16' ||
    perPageParam === 'all'
      ? perPageParam
      : 'all';
  const rawPage = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

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
  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);
  const page = Math.min(rawPage, totalPages || 1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);
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

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const pageTitle = PAGE_TITLES[category];

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ title: pageTitle }]} />

      <h1 className={styles.title}>{pageTitle}</h1>

      <p className={styles.count} data-cy="productsCount">
        {`${products.length} ${products.length === 1 ? 'model' : 'models'}`}
      </p>

      {isLoading && <Loader />}
      {!isLoading && isError && <ErrorBlock onRetry={loadProducts} />}
      {!isLoading && !isError && products.length > 0 && (
        <>
          <div className={styles.controls}>
            <Dropdown
              label="Sort by"
              value={sort}
              options={SORT_OPTIONS}
              onChange={handleSortChange}
              className={styles.sortDropdown}
            />

            <Dropdown
              label="Items on page"
              value={perPage}
              options={PER_PAGE_OPTIONS}
              onChange={handlePerPageChange}
              className={styles.perPageDropdown}
            />
          </div>

          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                onPageChange={handlePageChange}
                totalPages={totalPages}
                currentPage={page}
              />
            </div>
          )}
        </>
      )}
      {!isLoading && !isError && products.length === 0 && (
        <p className={styles.empty}>{`There are no ${category} yet`}</p>
      )}
    </div>
  );
};
