import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-title">
          Revolutionizing how the <br />
          <span className="hero-gradient-text">world meets.</span>
        </h1>
        <p className="about-subtitle">
          EventPro AI was founded on a simple belief: finding incredible experiences shouldn&apos;t feel like work. We&apos;re building the infrastructure for the next generation of human connection, powered by artificial intelligence.
        </p>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        {[
          { num: "10M+", label: "Tickets Sold" },
          { num: "150+", label: "Countries Active" },
          { num: "4.9/5", label: "Average App Rating" },
        ].map((stat) => (
          <div key={stat.label} className="about-stat-card">
            <div className="about-stat-num">{stat.num}</div>
            <div className="about-stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Content Section 1 */}
      <section className="about-content-section">
        <div>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: "rgba(99,102,241,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: 24
          }}>
            🧠
          </div>
          <h2 className="about-content-title">The AI Difference</h2>
          <p className="about-content-text">
            Traditional event discovery relies on simple filters and broad categories. EventPro AI learns your unique tastes, reading into the nuances of the artists you listen to, the topics you care about, and your past attendance history.
          </p>
          <p className="about-content-text">
            Our proprietary matching engine scores millions of events globally in real-time, surfacing the hidden gems and massive blockbusters that are perfectly tailored to you.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          {/* We'll use a gradient placeholder instead of an image to avoid needing actual assets */}
          <div className="about-content-img" style={{ background: "linear-gradient(135deg, #2d1b54 0%, #0f1120 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <span style={{ fontSize: "5rem", opacity: 0.5 }}>✨</span>
          </div>
          <div style={{ position: "absolute", bottom: -20, right: -20, width: 200, height: 200, background: "var(--accent)", filter: "blur(100px)", opacity: 0.3, zIndex: -1 }} />
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="about-content-section" style={{ direction: "rtl" }}>
        <div style={{ direction: "ltr" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: "rgba(16,185,129,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: 24
          }}>
            🌍
          </div>
          <h2 className="about-content-title">A Global Community</h2>
          <p className="about-content-text">
            Whether you&apos;re looking for a niche developer meetup in Berlin, an underground techno club in Tokyo, or a massive food festival in Austin, our platform connects organizers with their perfect audience everywhere.
          </p>
          <Link href="/events" className="btn-primary" style={{ display: "inline-block", marginTop: 16 }}>
            Explore Global Events
          </Link>
        </div>
        <div style={{ position: "relative", direction: "ltr" }}>
          <div className="about-content-img" style={{ background: "linear-gradient(135deg, #103b40 0%, #0f1120 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <span style={{ fontSize: "5rem", opacity: 0.5 }}>🌍</span>
          </div>
          <div style={{ position: "absolute", top: -20, left: -20, width: 200, height: 200, background: "#10b981", filter: "blur(100px)", opacity: 0.2, zIndex: -1 }} />
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ textAlign: "center", padding: "100px max(24px, 5vw)", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", marginBottom: 24 }}>Ready to join us?</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
          Create an account for free and start discovering the best events around you.
        </p>
        <Link href="/signup" className="btn-primary" style={{ padding: "16px 32px", fontSize: "1.1rem" }}>
          Get Started Today
        </Link>
      </section>
    </main>
  );
}
