"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Discover Events", href: "/events" },
      { label: "AI Matching", href: "/events" },
      { label: "For Organizers", href: "/events" },
      { label: "Pricing", href: "/events" },
      { label: "API", href: "/events" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press Kit", href: "/" },
      { label: "Partners", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Contact Us", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Status", href: "/" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";
  if (isAuthPage) return null;

  return (
    <footer className="ep-footer">
      <div className="ep-footer-inner">
        <div className="ep-footer-grid">
          {/* Brand column */}
          <div className="ep-footer-brand">
            <div className="ep-footer-logo">
              <div className="ep-logo-icon">EP</div>
              <span className="ep-logo-text" style={{ fontSize: "1.05rem" }}>
                EventPro AI
              </span>
            </div>
            <p className="ep-footer-tagline">
              The world&apos;s most intelligent event discovery platform, powered
              by AI that actually understands you.
            </p>
            <div className="ep-footer-socials">
              {[
                { label: "𝕏", href: "#" },
                { label: "in", href: "#" },
                { label: "ig", href: "#" },
                { label: "yt", href: "#" },
              ].map((s) => (
                <a key={s.label} href={s.href} className="ep-social-icon">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="ep-footer-col">
              <h4 className="ep-footer-col-title">{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="ep-footer-bottom">
          <span className="ep-footer-copy">
            © {new Date().getFullYear()} EventPro AI. All rights reserved.
          </span>
          <div className="ep-footer-status">
            <div className="ep-status-dot" />
            <span className="ep-status-text">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
