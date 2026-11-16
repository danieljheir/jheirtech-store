import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import products, { categories, categoryIcons } from "../data/products";
import ProductCard from "../components/ProductCard";

const features = [
  { icon: "🎓", title: "Student prices", text: "Fair prices from students, for students. No hidden fees." },
  { icon: "📍", title: "Campus pickup", text: "Order online and collect your parts on campus. Zero shipping." },
  { icon: "🛡️", title: "Tested parts", text: "Every part is checked before it gets listed on the store." },
  { icon: "💬", title: "Build advice", text: "Not sure what fits? Ask us and we will help you pick." },
];

const Home = () => {
  const { setCategory } = useContext(AppContext);

  useEffect(() => {
    document.title = "JheirTech · PC parts for students";
  }, []);

  const featured = products.filter((p) => p.badge && p.stock > 0).slice(0, 4);

  return (
    <>
      <section className="hero container">
        <div className="hero-text">
          <span className="pill">🔥 New parts just landed</span>
          <h1>
            Build your dream PC <span className="grad">without the pain.</span>
          </h1>
          <p className="lead">
            CPUs, GPUs, RAM and more at student friendly prices. Pick your parts, order online and
            pick them up on campus.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-lg">
              Shop parts
            </Link>
            <Link to="/signin" className="btn btn-ghost btn-lg">
              Create account
            </Link>
          </div>
          <div className="stats">
            <div>
              <strong>16+</strong>
              <span>Parts in stock</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>$0</strong>
              <span>Campus pickup</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="ring" />
          <div className="ring ring-2" />
          <div className="chip">
            <div className="chip-core">
              <span>CPU</span>
            </div>
          </div>
          <span className="float f1">🎮 GPU</span>
          <span className="float f2">⚡ DDR5</span>
          <span className="float f3">💾 NVMe</span>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Shop by category</h2>
          <Link to="/shop" className="link-more">
            View all →
          </Link>
        </div>
        <div className="cat-grid">
          {categories
            .filter((c) => c !== "All")
            .map((c) => (
              <Link to="/shop" key={c} className="card cat-tile" onClick={() => setCategory(c)}>
                <span className="cat-icon">{categoryIcons[c]}</span>
                <span>{c}</span>
              </Link>
            ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Featured picks</h2>
          <Link to="/shop" className="link-more">
            See everything →
          </Link>
        </div>
        <div className="grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Why JheirTech?</h2>
        </div>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="card feature" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p className="muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
