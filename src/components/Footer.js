import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div>
        <div className="brand brand-static">
          <span className="brand-mark">⚡</span>
          <span>
            Jheir<span className="grad">Tech</span>
          </span>
        </div>
        <p className="muted">PC parts for students, picked up right on campus.</p>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/signin">Sign in</Link>
      </div>
    </div>
    <div className="container footer-bottom muted">© 2026 JheirTech · University project</div>
  </footer>
);

export default Footer;
