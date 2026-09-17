import styles from './HomePage.module.scss';
import cn from 'classnames';

import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { getDiscountProducts, getNewestProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ErrorBlock } from '../../components/ErrorBlock';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from './components/Categories';

const slides = [
  {
    image: '/img/banner.png',
    alt: 'Main banner',
  },
  {
    image: '/img/banner-phones.png',
    alt: 'Phones banner',
  },
  {
    image: '/img/banner-tablets.png',
    alt: 'Tablets banner',
  },
  {
    image: '/img/banner-accessories.png',
    alt: 'Accessories banner',
  },
];

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => {
      return (prevSlide + 1) % slides.length;
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => {
      return (prevSlide - 1 + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    Promise.all([getNewestProducts(), getDiscountProducts()])
      .then(([newProductsData, discountProductsData]) => {
        setNewProducts(newProductsData);
        setDiscountProducts(discountProductsData);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h2>
        <div className={styles.slider}>
          <div
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map(slide => (
              <div className={styles.slide} key={slide.image}>
                <img
                  className={styles.slideImage}
                  src={slide.image}
                  alt={slide.alt}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.sliderButton} ${styles.prevButton}`}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            type="button"
            className={`${styles.sliderButton} ${styles.nextButton}`}
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div className={styles.dots}>
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={cn(styles.dot, {
                [styles.activeDot]: currentSlide === index,
              })}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {isLoading && <Loader />}

      {!isLoading && isError && <ErrorBlock title="Error loading products" />}

      {!isLoading && !isError && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={newProducts}
            showDiscount={false}
          />

          <Categories />

          <ProductsSlider title="Hot prices" products={discountProducts} />
        </>
      )}
    </div>
  );
};
