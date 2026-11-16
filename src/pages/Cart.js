import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { categoryIcons, money } from "../data/products";

const Cart = () => {
  const { user, cartItems, cartTotal, changeQty, removeFromCart, clearCart } = useContext(AppContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    document.title = "Cart · JheirTech";
  }, []);

  const placeOrder = () => {
    const number = "JT-" + Math.floor(100000 + Math.random() * 900000);
    setOrder({ number, total: cartTotal });
    clearCart();
  };

  if (order) {
    return (
      <section className="container section">
        <div className="card success">
          <span className="success-icon">✅</span>
          <h1>Order placed!</h1>
          <p className="muted">
            Thanks{user ? ", " + user.name.split(" ")[0] : ""}. Your order <strong>{order.number}</strong> for{" "}
            <strong>{money(order.total)}</strong> is being prepared. Pick it up on campus.
          </p>
          <Link to="/shop" className="btn btn-primary" onClick={() => setOrder(null)}>
            Keep shopping
          </Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="container section">
        <div className="card empty">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p className="muted">Add some parts and they will show up here.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse the shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      <div className="page-head">
        <h1>
          Your <span className="grad">Cart</span>
        </h1>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="card cart-row" key={item.id}>
              <div className={"cart-thumb cat-" + item.category.toLowerCase()}>{categoryIcons[item.category]}</div>
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="muted">{item.specs}</p>
                <button className="link-danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
              <div className="qty">
                <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease">
                  −
                </button>
                <span>{item.qty}</span>
                <button onClick={() => changeQty(item.id, 1)} aria-label="Increase" disabled={item.qty >= item.stock}>
                  +
                </button>
              </div>
              <div className="cart-price">{money(item.price * item.qty)}</div>
            </div>
          ))}
        </div>

        <aside className="card summary">
          <h3>Order summary</h3>
          <div className="sum-row">
            <span className="muted">Subtotal</span>
            <span>{money(cartTotal)}</span>
          </div>
          <div className="sum-row">
            <span className="muted">Campus pickup</span>
            <span className="free">Free</span>
          </div>
          <div className="sum-row total">
            <span>Total</span>
            <span>{money(cartTotal)}</span>
          </div>

          {user ? (
            <button className="btn btn-primary btn-block btn-lg" onClick={placeOrder}>
              Place order
            </button>
          ) : (
            <>
              <Link to="/signin" className="btn btn-primary btn-block btn-lg">
                Sign in to checkout
              </Link>
              <p className="muted small center">You need an account to place an order.</p>
            </>
          )}
          <button className="btn btn-ghost btn-block" onClick={clearCart}>
            Empty cart
          </button>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
