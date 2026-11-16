import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import products, { categories } from "../data/products";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const { category, setCategory } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    document.title = "Shop · JheirTech";
  }, []);

  let list = products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const text = (p.name + " " + p.specs + " " + p.category).toLowerCase();
    return matchesCategory && text.includes(search.trim().toLowerCase());
  });

  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  const reset = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
  };

  return (
    <section className="container section">
      <div className="page-head">
        <h1>
          The <span className="grad">Shop</span>
        </h1>
        <p className="muted">Find the right part for your build.</p>
      </div>

      <div className="toolbar">
        <div className="search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search parts, e.g. Ryzen, DDR5, 1TB..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low to high</option>
          <option value="high">Price: High to low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="pills">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "pill-btn active" : "pill-btn"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="muted result-count">
        {list.length} {list.length === 1 ? "part" : "parts"} found
      </p>

      {list.length > 0 ? (
        <div className="grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="card empty">
          <span className="empty-icon">🛰️</span>
          <h3>Nothing matches your search</h3>
          <p className="muted">Try a different word or clear the filters.</p>
          <button className="btn btn-primary" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Shop;
