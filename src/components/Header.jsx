import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          JobBoard
        </Link>

        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Otvori izbornik"
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav-open" : ""}>
          <NavLink
  to="/"
  onClick={closeMenu}
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  Poslovi
</NavLink>

<NavLink
  to="/favorites"
  onClick={closeMenu}
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  Favoriti
</NavLink>

<NavLink
  to="/jobs/add"
  onClick={closeMenu}
  className={({ isActive }) =>
    isActive ? "add-job-link active-add-link" : "add-job-link"
  }
>
  + Dodaj posao
</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;