import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found · JheirTech";
  }, []);

  return (
    <section className="container section">
      <div className="card empty">
        <span className="empty-icon">🧯</span>
        <h1 className="big-404 grad">404</h1>
        <p className="muted">This page does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
