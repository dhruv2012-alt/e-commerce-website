import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { login } = useContext(AppContext);
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    login({ name: email.split("@")[0], email });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    login({ name, email });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">R</div>
          <h2>E-Commerce Platform with Hybrid Recommendation System</h2>
          <p>MSc Computer Science Final Year Project</p>
        </div>

        <div className="login-tabs">
          <button className={`login-tab${tab === "login" ? " active" : ""}`} onClick={() => setTab("login")}>
            Sign In
          </button>
          <button className={`login-tab${tab === "register" ? " active" : ""}`} onClick={() => setTab("register")}>
            Sign Up
          </button>
        </div>

        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</p>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 15 }}>
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 15 }}>
              Create Account
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 20 }}>
          Protected by E-Commerce © 2025
        </p>
      </div>
    </div>
  );
};

export default Login;