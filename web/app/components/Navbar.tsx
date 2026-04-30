"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/app/lib/data";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthenticated = !!user;
  const userInitials = user ? user.name?.substring(0, 2).toUpperCase() : "";

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    router.refresh(); // Refresh to update layout without user
  };

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  if (isAuthPage) return null;

  return (
    <nav className="ep-navbar">
      {/* Logo */}
      <Link href="/" className="ep-logo-link">
        <div className="ep-logo-icon">EP</div>
        <span className="ep-logo-text">
          EventPro <span className="ep-logo-ai">AI</span>
        </span>
      </Link>

      {/* Desktop nav links */}
      <div className="ep-nav-links-desktop">
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href} className="nav-link">
            {l.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="ep-nav-actions">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="nav-link ep-nav-signin">
              Login
            </Link>
            <Link href="/signup" className="btn-primary ep-nav-cta">
              Get Started
            </Link>
          </>
        ) : (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button 
              className="user-avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="User menu"
            >
              {userInitials}
            </button>
            
            {dropdownOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-dropdown-name">{user.name}</div>
                  <div className="user-dropdown-email">{user.email}</div>
                </div>
                <Link href="/my-bookings" className="user-dropdown-item">
                  <span>🎟️</span> My Bookings
                </Link>
                {user.role === "ADMIN" && (
                  <Link href="/admin" className="user-dropdown-item">
                    <span>⚙️</span> Admin Dashboard
                  </Link>
                )}
                <div className="user-dropdown-divider" />
                <button 
                  className="user-dropdown-item danger"
                  onClick={handleLogout}
                >
                  <span>👋</span> Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="ep-mobile-menu-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="ep-mobile-menu">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-link ep-mobile-link"
            >
              {l.label}
            </Link>
          ))}
          <div className="ep-mobile-menu-divider" />
          
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="nav-link ep-mobile-link">Login</Link>
              <Link href="/signup" className="btn-primary ep-mobile-cta">Get Started</Link>
            </>
          ) : (
            <>
              <div style={{ padding: "8px 0" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{user.email}</div>
              </div>
              <Link href="/my-bookings" className="nav-link ep-mobile-link">My Bookings</Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="nav-link ep-mobile-link">Admin Dashboard</Link>
              )}
              <button 
                onClick={handleLogout}
                className="nav-link ep-mobile-link" 
                style={{ textAlign: "left", background: "none", border: "none", color: "#f43f5e" }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
