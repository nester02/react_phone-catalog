import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/" className="logo">
          Logo
        </NavLink>

        <nav aria-label="Main navigation">
          <NavLink to="/phones">Phones</NavLink>
          <NavLink to="/tablets">Tablets</NavLink>
          <NavLink to="/accessories">Accessories</NavLink>
        </nav>
      </div>

      <div>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </header>
  );
};
