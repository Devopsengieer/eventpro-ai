import Link from "next/link";

const PRICING_TIERS = [
  {
    name: "Attendee Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to discover and attend the best events around the world.",
    features: [
      "AI-powered event matching",
      "Unlimited event bookmarks",
      "Standard customer support",
      "Basic public profile",
    ],
    btnText: "Start Exploring",
    btnClass: "btn-outline",
    href: "/signup",
    isPro: false,
  },
  {
    name: "Pro Organizer",
    price: "$49",
    period: "per month",
    desc: "For serious creators looking to scale their events and maximize attendance.",
    features: [
      "Everything in Free",
      "Create unlimited events",
      "Advanced analytics dashboard",
      "Priority AI ranking for events",
      "Custom branded event pages",
      "24/7 priority support",
    ],
    btnText: "Start 14-Day Free Trial",
    btnClass: "btn-primary",
    href: "/signup?plan=pro",
    isPro: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual billing",
    desc: "Dedicated solutions for massive festivals, venues, and global event companies.",
    features: [
      "Everything in Pro",
      "Dedicated success manager",
      "White-label ticketing API",
      "Custom seat mapping",
      "Advanced fraud protection",
      "SLA guarantee",
    ],
    btnText: "Contact Sales",
    btnClass: "btn-outline",
    href: "#contact",
    isPro: false,
  },
];

const FAQS = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Absolutely. You can change your plan from your billing settings. Upgrades take effect immediately, while downgrades will be applied at the end of your current billing cycle.",
  },
  {
    q: "Do you take a cut of ticket sales?",
    a: "On the Free and Pro plans, we charge a standard 2.5% + $0.99 processing fee per paid ticket. Free events are completely free to host. Enterprise plans feature custom negotiated rates.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex) via Stripe, as well as PayPal and Apple/Google Pay.",
  },
];

export default function PricingPage() {
  return (
    <main className="pricing-page">
      <div className="pricing-header">
        <h1 className="hero-title" style={{ fontSize: "4rem", marginBottom: 24 }}>
          Simple, transparent <span className="hero-gradient-text">pricing</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: 700, margin: "0 auto" }}>
          Whether you&apos;re an attendee looking for weekend plans or an organizer throwing a massive festival, we have a plan for you.
        </p>
      </div>

      <div className="pricing-grid">
        {PRICING_TIERS.map((tier) => (
          <div key={tier.name} className={`pricing-card ${tier.isPro ? "pro" : ""}`}>
            {tier.isPro && <div className="pricing-badge">Most Popular</div>}
            
            <h3 className="pricing-name">{tier.name}</h3>
            <div className="pricing-price">{tier.price}</div>
            <div className="pricing-period">{tier.period}</div>
            
            <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "24px 0" }} />
            
            <p className="pricing-desc">{tier.desc}</p>
            
            <ul className="pricing-features">
              {tier.features.map((f, i) => (
                <li key={i} className="pricing-feature">
                  <span className="pricing-check">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            
            <Link href={tier.href} className={`${tier.btnClass}`} style={{ textAlign: "center", display: "block" }}>
              {tier.btnText}
            </Link>
          </div>
        ))}
      </div>

      <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <h4 className="faq-q">{faq.q}</h4>
              <p className="faq-a">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
