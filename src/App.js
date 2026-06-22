import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import './styles/global.css';

const Layout = ({ children }) => {
  const { user, logout, cart, wishlist } = useContext(AppContext);

  return (
    <div className="app-shell">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">R</div>
          <div className="sidebar-logo-text">
            E-Commerce Platform with Hybrid Recommendation System
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            <span className="nav-icon">🛍️</span>
            <span>Products</span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="nav-icon">🛒</span>
            <span>Cart {cart.length > 0 && `(${cart.length})`}</span>
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="nav-icon">❤️</span>
            <span>Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="nav-icon">ℹ️</span>
            <span>About</span>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="nav-icon">✉️</span>
            <span>Contact</span>
          </NavLink>
        </nav>

        <div className="sidebar-upgrade">
          <strong>✨ Upgrade to Pro</strong>
          <p>Unlock advanced AI features and grow your business faster.</p>
          <button className="btn-upgrade">Upgrade Now</button>
        </div>

        <div className="sidebar-logout">
          <button onClick={logout}>
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-search">
            <span className="topbar-search-icon">🔍</span>
            <input type="text" placeholder="Search for products, orders, customers..." />
          </div>

          <div className="topbar-actions">
            <div className="topbar-icon-btn">⚙️</div>
            <div className="topbar-icon-btn">
              🔔
              <span className="topbar-badge">2</span>
            </div>
            <div className="topbar-user">
              <div className="topbar-avatar">
                {user?.name ? user.name[0].toUpperCase() : "A"}
              </div>
              <div className="topbar-user-info">
                <strong>{user?.name || "Admin"}</strong>
                <span>Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const { user } = useContext(AppContext);

  if (!user) return <Login />;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;