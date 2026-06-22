import React, { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="page-header">
        <h2>Contact Us</h2>
        <p>Get in touch with the Roy AI team</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24, alignItems: "start" }}>
        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: "✉️", label: "Email",   value: "roy.project@example.com", color: "#f3f0ff" },
            { icon: "📞", label: "Phone",   value: "+44 01341 678623",            color: "#fff7ed" },
            { icon: "📍", label: "Address", value: "MSc CS Department, University",color: "#fff0f0" },
          ].map((c) => (
            <div key={c.label} className="card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, background: c.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Send a Message</h3>
          {sent && (
            <div style={{ background: "#d1fae5", color: "#065f46", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              ✅ Message sent successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows={4} placeholder="How can we help you?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical" }} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 15 }}>
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;