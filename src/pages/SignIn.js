import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SignIn = () => {
  const { user, signIn, signUp } = useContext(AppContext);
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = (mode === "signin" ? "Sign in" : "Create account") + " · JheirTech";
  }, [mode]);

  // already signed in (or just signed in): go back to the home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  const isSignUp = mode === "signup";

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const switchMode = () => {
    setMode(isSignUp ? "signin" : "signup");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    const name = form.name.trim();

    if (isSignUp && name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Your password must have at least 6 characters.");
      return;
    }

    const result = isSignUp ? signUp(name, email, form.password) : signIn(email, form.password);
    if (!result.ok) {
      setError(result.message);
    }
  };

  return (
    <section className="container auth-wrap">
      <div className="auth card">
        <div className="auth-side">
          <span className="pill">🎓 For students</span>
          <h2>
            Your next build starts <span className="grad">here.</span>
          </h2>
          <ul className="auth-points">
            <li>✔ Save your cart between visits</li>
            <li>✔ Check out in one click</li>
            <li>✔ Free pickup on campus</li>
          </ul>
          <div className="auth-art" aria-hidden="true">
            <div className="chip chip-sm">
              <div className="chip-core">
                <span>JT</span>
              </div>
            </div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h1>{isSignUp ? "Create account" : "Welcome back"}</h1>
          <p className="muted">
            {isSignUp ? "Join JheirTech in less than a minute." : "Sign in to continue to your account."}
          </p>

          {isSignUp && (
            <label className="field">
              <span>Full name</span>
              <input type="text" placeholder="Sara Haddad" value={form.name} onChange={update("name")} autoComplete="name" />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@students.university.edu"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={update("password")}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
              <button type="button" className="eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            {isSignUp ? "Create account" : "Sign in"}
          </button>

          <p className="switch muted">
            {isSignUp ? "Already have an account?" : "New to JheirTech?"}{" "}
            <button type="button" className="link-btn" onClick={switchMode}>
              {isSignUp ? "Sign in" : "Create an account"}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
