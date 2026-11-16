import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { categoryIcons, money } from "../data/products";

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useContext(AppContext);

  const inCart = cart.find((item) => item.id === product.id);
  const qtyInCart = inCart ? inCart.qty : 0;
  const soldOut = product.stock === 0;
  const maxed = qtyInCart >= product.stock;

  let stockText = product.stock + " in stock";
  let stockClass = "stock";
  if (soldOut) {
    stockText = "Sold out";
    stockClass = "stock out";
  } else if (product.stock <= 6) {
    stockText = "Only " + product.stock + " left";
    stockClass = "stock low";
  }

  return (
    <article className="card product">
      <div className={"product-visual cat-" + product.category.toLowerCase()}>
        <span className="product-icon">{categoryIcons[product.category]}</span>
        <span className="tag">{product.category}</span>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="muted specs">{product.specs}</p>
        <div className="product-meta">
          <span className="price">{money(product.price)}</span>
          <span className={stockClass}>{stockText}</span>
        </div>
        <button
          className="btn btn-primary btn-block"
          disabled={soldOut || maxed}
          onClick={() => addToCart(product)}
        >
          {soldOut ? "Sold out" : maxed ? "Max in cart" : qtyInCart > 0 ? "Add another (" + qtyInCart + ")" : "Add to cart"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
