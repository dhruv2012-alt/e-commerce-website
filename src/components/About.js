import React from "react";

const About = () => (
  <>
    <div className="page-header">
      <h2>About</h2>
      <p>E-Commerce Platform with Hybrid Recommendation System</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div className="card">
        <div style={{ width: 48, height: 48, background: "#f3f0ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>🎓</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Project Overview</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          This platform is designed as a final-year MSc Computer Science project. It features AI-powered product
          recommendations, user authentication, cart &amp; wishlist management, and analytics dashboards.
        </p>
      </div>

      <div className="card">
        <div style={{ width: 48, height: 48, background: "#fff7ed", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>🤖</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>AI Capabilities</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          The goal is to demonstrate AI-enhanced frontend capabilities and e-commerce optimization using React and
          Firebase, showcasing intelligent product suggestions and data-driven insights.
        </p>
      </div>

      <div className="card">
        <div style={{ width: 48, height: 48, background: "#fff0f0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>⚛️</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Tech Stack</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Built with React 18, Firebase, React Router, and Chart.js. Features a modern component-based
          architecture with Context API for state management.
        </p>
      </div>

      <div className="card">
        <div style={{ width: 48, height: 48, background: "#f0fdf4", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>📊</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Analytics Dashboard</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Includes a rich admin dashboard with sales charts, order tracking, category distribution,
          and real-time store metrics — all styled with a modern purple gradient theme.
        </p>
      </div>
    </div>
  </>
);

export default About;