import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, cartCount, signOut } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">⚡</span>
          <span>
            Jheir<span className="grad">Tech</span>
          </span>
        </Link>

        <button
          className={open ? "burger is-open" : "burger"}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>
          <NavLink to="/" end className={linkClass} onClick={close}>
            Home
          </NavLink>
          <NavLink to="/shop" className={linkClass} onClick={close}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={linkClass} onClick={close}>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          <div className="nav-user">
            {user ? (
              <>
                <span className="user-chip">
                  <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
                  {user.name.split(" ")[0]}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    signOut();
                    close();
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/signin" className="btn btn-primary btn-sm" onClick={close}>
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
