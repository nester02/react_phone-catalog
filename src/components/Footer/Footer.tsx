import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <NavLink to="/" className="logo">
        Logo
      </NavLink>

      <nav>
        <a
          href="https://github.com/nester02/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>

        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/rights">Rights</NavLink>
      </nav>

      <button
        type="button"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        Back to top
      </button>
    </footer>
  );
};
