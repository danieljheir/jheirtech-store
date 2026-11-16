import { createContext, useState, useEffect } from "react";
import products from "../data/products";

export const AppContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage("jheirtech_user", null));
  const [cart, setCart] = useState(() => readStorage("jheirtech_cart", []));
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");

  // keep the cart and the signed in user saved in the browser
  useEffect(() => {
    localStorage.setItem("jheirtech_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("jheirtech_user", JSON.stringify(user));
  }, [user]);

  // hide the toast message after a short time
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing && existing.qty >= product.stock) {
      setToast("That's all we have in stock");
      return;
    }
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { id: product.id, qty: 1 }]);
    }
    setToast(product.name + " added to cart");
  };

  const changeQty = (id, amount) => {
    const product = products.find((p) => p.id === id);
    setCart(
      cart
        .map((item) => {
          if (item.id !== id) return item;
          const next = Math.min(item.qty + amount, product ? product.stock : item.qty);
          return { ...item, qty: next };
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  // Demo only: users are saved in this browser. A real site needs a backend.
  const signUp = (name, email, password) => {
    const users = readStorage("jheirtech_users", []);
    if (users.some((u) => u.email === email)) {
      return { ok: false, message: "An account with this email already exists." };
    }
    localStorage.setItem("jheirtech_users", JSON.stringify([...users, { name, email, password }]));
    setUser({ name, email });
    setToast("Welcome to JheirTech, " + name.split(" ")[0] + "!");
    return { ok: true };
  };

  const signIn = (email, password) => {
    const users = readStorage("jheirtech_users", []);
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { ok: false, message: "Wrong email or password." };
    }
    setUser({ name: found.name, email: found.email });
    setToast("Welcome back, " + found.name.split(" ")[0] + "!");
    return { ok: true };
  };

  const signOut = () => {
    setUser(null);
    setToast("You signed out");
  };

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter((item) => item !== null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = {
    user,
    cart,
    cartItems,
    cartCount,
    cartTotal,
    category,
    setCategory,
    addToCart,
    changeQty,
    removeFromCart,
    clearCart,
    signUp,
    signIn,
    signOut,
    setToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </AppContext.Provider>
  );
};
