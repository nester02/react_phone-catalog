import { NavLink } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { favorites, cart } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const navlinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo}>
            <img src="/img/logo.png" alt="Nice Gadgets" />
          </NavLink>

          <nav className={styles.nav} aria-label="Main navigation">
            <NavLink to="/phones" className={navlinkClassName}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={navlinkClassName}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={navlinkClassName}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={navlinkClassName}
            aria-label="Favorites"
          >
            <img src="/icons/heart.svg" alt="Favorites" />
            {favorites.length > 0 && <span>{favorites.length}</span>}
          </NavLink>

          <NavLink to="/cart" className={navlinkClassName} aria-label="Cart">
            <img src="/icons/bag.svg" alt="Cart" />
            {totalQuantity > 0 && <span>{totalQuantity}</span>}
          </NavLink>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <img
              src={isMenuOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              alt=""
            />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              className={navlinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={navlinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={navlinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={navlinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={navlinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/icons/heart.svg" alt="" />
            </NavLink>

            <NavLink
              to="/cart"
              className={navlinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/icons/bag.svg" alt="" />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
