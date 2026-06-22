import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { fetchProducts } from "../services/api";

// ── Mini SVG line chart ──────────────────────────
const SparkLine = ({ color = "white" }) => (
  <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 28 C10 24, 15 30, 25 22 C35 14, 40 26, 50 18 C60 10, 65 20, 80 8"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
    />
  </svg>
);

// ── Donut Chart (SVG) ────────────────────────────
const DonutChart = () => {
  const segments = [
    { pct: 45, color: "#7c3aed", label: "Electronics" },
    { pct: 25, color: "#f43f5e", label: "Fashion" },
    { pct: 15, color: "#f97316", label: "Accessories" },
    { pct: 10, color: "#3b82f6", label: "Home & Living" },
    { pct: 5,  color: "#10b981", label: "Others" },
  ];

  const r = 60, cx = 70, cy = 70, stroke = 22;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        {segments.map((seg, i) => {
          const dashArray = (seg.pct / 100) * circumference;
          const dashOffset = circumference - cumulative * circumference / 100;
          const el = (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dashArray} ${circumference - dashArray}`}
              strokeDashoffset={dashOffset}
              style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
            />
          );
          cumulative += seg.pct;
          return el;
        })}
        <circle cx={cx} cy={cy} r={r - stroke / 2 - 2} fill="white" />
      </svg>

      <ul className="category-legend">
        {segments.map((seg) => (
          <li key={seg.label}>
            <span className="legend-left">
              <span className="legend-dot" style={{ background: seg.color }} />
              {seg.label}
            </span>
            <span style={{ fontWeight: 600, color: "#1e1b4b" }}>{seg.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ── Sales Area Chart (SVG) ───────────────────────
const SalesChart = () => {
  const points = [
    { x: 0,   y: 60 },
    { x: 60,  y: 80 },
    { x: 120, y: 55 },
    { x: 180, y: 70 },
    { x: 240, y: 40 },
    { x: 300, y: 55 },
    { x: 360, y: 20 },
  ];

  const w = 360, h = 110;
  const pathD = points.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `C ${points[i-1].x + 30} ${points[i-1].y}, ${p.x - 30} ${p.y}, ${p.x} ${p.y}`
  ).join(" ");

  const areaD = pathD + ` L ${w} ${h} L 0 ${h} Z`;
  const labels = ["May 22", "May 23", "May 24", "May 25", "May 26", "May 27", "May 28"];
  const yLabels = ["$8K", "$6K", "$4K", "$2K", "$0"];

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width="100%" viewBox={`0 0 ${w + 40} ${h + 40}`} preserveAspectRatio="xMidYMid meet" style={{ minWidth: 260 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Y-axis labels */}
        {yLabels.map((l, i) => (
          <text key={l} x="0" y={8 + i * (h / 4)} fontSize="9" fill="#9ca3af" dominantBaseline="middle">{l}</text>
        ))}

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="32" y1={8 + i * (h / 4)} x2={w + 40} y2={8 + i * (h / 4)} stroke="#ede9fe" strokeWidth="1" />
        ))}

        {/* Area fill */}
        <path d={`M 32 ${points[0].y} ` + points.slice(1).map((p, i) =>
          `C ${points[i].x + 60 + 32} ${points[i].y}, ${p.x + 32 - 30} ${p.y}, ${p.x + 32} ${p.y}`
        ).join(" ") + ` L ${w + 32} ${h} L 32 ${h} Z`}
          fill="url(#areaGrad)" />

        {/* Line */}
        <path d={`M 32 ${points[0].y} ` + points.slice(1).map((p, i) =>
          `C ${points[i].x + 60 + 32} ${points[i].y}, ${p.x + 32 - 30} ${p.y}, ${p.x + 32} ${p.y}`
        ).join(" ")}
          fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />

        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* X-axis labels */}
        {labels.map((l, i) => (
          <text key={l} x={32 + i * 60} y={h + 30} fontSize="9" fill="#9ca3af" textAnchor="middle">{l}</text>
        ))}
      </svg>
    </div>
  );
};

// ── Dashboard Component ───────────────────────────
const Dashboard = () => {
  const { cart } = useContext(AppContext);
  const products = fetchProducts();

  const topProducts = [
    { rank: 1, icon: "🎧", name: "Wireless Headphones", category: "Electronics", price: "$4,560", change: "+12%" },
    { rank: 2, icon: "⌚", name: "Smart Watch Series 5", category: "Electronics", price: "$3,240", change: "+8%"  },
    { rank: 3, icon: "👟", name: "Running Shoes",        category: "Fashion",     price: "$2,890", change: "+15%" },
    { rank: 4, icon: "👜", name: "Leather Backpack",     category: "Accessories", price: "$2,160", change: "+6%"  },
    { rank: 5, icon: "🔊", name: "Portable Speaker",     category: "Electronics", price: "$1,870", change: "+9%"  },
  ];

  const recentOrders = [
    { id: "#ORD-1025", name: "John Doe",       date: "May 28, 2025", status: "completed",  amount: "$120.00" },
    { id: "#ORD-1024", name: "Jane Smith",     date: "May 28, 2025", status: "processing", amount: "$85.50"  },
    { id: "#ORD-1023", name: "Michael Johnson",date: "May 27, 2025", status: "pending",    amount: "$45.00"  },
    { id: "#ORD-1022", name: "Emily Davis",    date: "May 27, 2025", status: "completed",  amount: "$230.00" },
    { id: "#ORD-1021", name: "David Wilson",   date: "May 26, 2025", status: "cancelled",  amount: "$75.00"  },
  ];

  const features = [
    { icon: "🤖", color: "#f3f0ff", iconColor: "#7c3aed", title: "AI Recommendations", desc: "Personalized product suggestions for your customers." },
    { icon: "⚙️", color: "#fff7ed", iconColor: "#f97316", title: "Smart Automation",   desc: "Automate tasks and save valuable time."             },
    { icon: "📈", color: "#fff0f0", iconColor: "#f43f5e", title: "Advanced Analytics", desc: "Deep insights to make data-driven decisions."       },
    { icon: "🏪", color: "#f0fdf4", iconColor: "#10b981", title: "Multi-Channel Selling", desc: "Sell across multiple platforms seamlessly."      },
  ];

  return (
    <>
      {/* Page header */}
      <div className="page-header-row">
        <div className="page-header">
          <h2>Welcome back, Admin 👋</h2>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className="date-badge">📅 May 22 – May 28, 2025 ▾</div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-cards">
        {[
          { label: "Total Sales",       value: "$24,560.00", change: "↑ 12.5% from last week", cls: "stat-card-sales"       },
          { label: "Total Orders",      value: "1,245",      change: "↑ 8.2% from last week",  cls: "stat-card-orders"      },
          { label: "Total Customers",   value: "3,456",      change: "↑ 15.3% from last week", cls: "stat-card-customers"   },
          { label: "Conversion Rate",   value: "3.24%",      change: "↑ 5.7% from last week",  cls: "stat-card-conversion"  },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-change"><span className="arrow">↑</span>{s.change}</div>
            <div style={{ marginTop: 8 }}><SparkLine /></div>
          </div>
        ))}
      </div>

      {/* ── Sales Overview + Top Products ── */}
      <div className="dashboard-row">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Sales Overview</span>
            <span className="date-badge" style={{ fontSize: 12 }}>This Week ▾</span>
          </div>
          <SalesChart />
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Top Selling Products</span>
            <span className="card-link">View All</span>
          </div>
          <table className="top-products-table">
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.rank}>
                  <td className="prod-num">{p.rank}</td>
                  <td className="prod-img">
                    <div className="prod-img-circle">{p.icon}</div>
                  </td>
                  <td className="prod-info">
                    <strong>{p.name}</strong>
                    <span>{p.category}</span>
                  </td>
                  <td className="prod-price">{p.price}</td>
                  <td className="prod-change">↑ {p.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── AI Banner ── */}
      <div className="ai-banner">
        <div className="ai-banner-content">
          <h3>✨ AI-Powered Insights</h3>
          <p>Get smart recommendations, predict trends, and boost your sales with AI.</p>
          <button className="btn-primary">Explore AI Insights</button>
        </div>
        <div className="ai-banner-robot">🤖</div>
      </div>

      {/* ── Recent Orders + Category Distribution ── */}
      <div className="dashboard-row">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Orders</span>
            <span className="card-link">View All</span>
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="order-id">{o.id}</td>
                  <td>
                    <div className="order-customer">
                      <div className="order-avatar">{o.name[0]}</div>
                      {o.name}
                    </div>
                  </td>
                  <td>{o.date}</td>
                  <td>
                    <span className={`status-badge status-${o.status}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 600 }}>{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Category Distribution</span>
          </div>
          <DonutChart />
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="feature-cards">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-card-icon" style={{ background: f.color }}>
              <span style={{ fontSize: 20 }}>{f.icon}</span>
            </div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
            <a href="#">Learn more →</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;