"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import DynamicIcon from "../DynamicIcon";

const POPULAR_ICONS = [
  "Zap", "Music", "TrendingUp", "Trophy", "Palette", "Wine", "Brain", "Book", "Theater", "Laugh", 
  "Film", "Gamepad2", "Dumbbell", "Coffee", "Utensils", "Ticket", "Calendar", "Users", "Camera", 
  "Mic", "Heart", "Star", "Globe", "Briefcase", "Laptop", "Smartphone", "Rocket", "Plane", 
  "MapPin", "ShoppingBag", "Gift", "Smile", "Sun", "Moon", "Cloud", "Ghost", "Anchor", "Activity"
];

const EMOJI_GROUPS = [
  {
    label: "Activities",
    emojis: ["🎭", "🎨", "🎸", "🎤", "🎧", "🎬", "🎮", "🎳", "🏀", "⚽", "🎾", "⛳", "🧗", "🏇", "🚣", "🧘", "🕺", "🎪"]
  },
  {
    label: "Events & Places",
    emojis: ["🎟️", "📅", "🎊", "🎆", "✨", "🎈", "🏢", "🏟️", "🏫", "⛪", "🎡", "🎢", "🏝️", "⛰️", "🏨", "🚆", "✈️", "🚀"]
  },
  {
    label: "Food & Drink",
    emojis: ["☕", "🍵", "🍷", "🍸", "🍺", "🍕", "🍔", "🍣", "🍰", "🍩", "🍎", "🥗", "🥘", "🥂", "🍿", "🍳", "🍦", "🍭"]
  },
  {
    label: "Objects & Symbols",
    emojis: ["💎", "🎁", "📱", "💻", "💡", "📖", "🔑", "❤️", "⭐", "🔥", "🌈", "☀️", "🌙", "🌍", "⚡", "⚙️", "🛠️", "📣"]
  }
];

export default function IconPicker({ 
  value, 
  onChange 
}: { 
  value: string, 
  onChange: (val: string) => void 
}) {
  const [activeTab, setActiveTab] = useState<"icons" | "emojis">("icons");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get all lucide icon names (filter for PascalCase components which are icons)
  const allIconNames = Object.keys(LucideIcons).filter(
    (name) => /^[A-Z][a-zA-Z0-9]+$/.test(name) && typeof (LucideIcons as any)[name] === "function" && name !== "createLucideIcon"
  );

  const filteredIcons = search 
    ? allIconNames.filter(name => name.toLowerCase().includes(search.toLowerCase())).slice(0, 50)
    : POPULAR_ICONS;

  return (
    <div style={{ position: "relative" }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="auth-input"
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12, 
          cursor: "pointer",
          background: "rgba(255,255,255,0.04)"
        }}
      >
        <div style={{ 
          width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem"
        }}>
          <DynamicIcon name={value} size={20} />
        </div>
        <span style={{ color: value ? "var(--text-primary)" : "var(--text-ghost)" }}>
          {value || "Select icon/emoji..." }
        </span>
        <span style={{ marginLeft: "auto", opacity: 0.5 }}>{isOpen ? "▴" : "▾"}</span>
      </div>

      {isOpen && (
        <div style={{ 
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
          marginTop: 8, background: "#161922", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: "16px 16px 8px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          width: 320, maxWidth: "90vw"
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "rgba(255,255,255,0.03)", padding: 4, borderRadius: 10 }}>
            <button 
              type="button"
              onClick={() => setActiveTab("icons")}
              style={{ 
                flex: 1, padding: "6px", fontSize: "0.75rem", fontWeight: 600, borderRadius: 8, border: "none",
                background: activeTab === "icons" ? "rgba(255,255,255,0.08)" : "transparent",
                color: activeTab === "icons" ? "var(--text-primary)" : "var(--text-faint)",
                cursor: "pointer"
              }}
            >
              Icons
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("emojis")}
              style={{ 
                flex: 1, padding: "6px", fontSize: "0.75rem", fontWeight: 600, borderRadius: 8, border: "none",
                background: activeTab === "emojis" ? "rgba(255,255,255,0.08)" : "transparent",
                color: activeTab === "emojis" ? "var(--text-primary)" : "var(--text-faint)",
                cursor: "pointer"
              }}
            >
              Emojis
            </button>
          </div>

          {activeTab === "icons" ? (
            <div style={{ display: "flex", flexDirection: "column", maxHeight: 300 }}>
              <input 
                className="auth-input"
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 12, padding: "10px 14px", fontSize: "0.85rem" }}
                autoFocus
              />
              <div style={{ 
                overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))", 
                gap: 8, padding: "2px 2px 8px" 
              }}>
                {filteredIcons.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      onChange(name);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    style={{ 
                      width: 44, height: 44, borderRadius: 10, background: value === name ? "rgba(99,102,241,0.2)" : "transparent",
                      border: value === name ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.05)",
                      color: value === name ? "var(--accent-lighter)" : "var(--text-muted)",
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    title={name}
                  >
                    <DynamicIcon name={name} size={20} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", maxHeight: 300 }}>
              <div style={{ marginBottom: 12 }}>
                <input 
                  className="auth-input"
                  placeholder="Paste any emoji here..."
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    if (val) {
                      onChange(val);
                      setIsOpen(false);
                    }
                  }}
                  style={{ padding: "10px 14px", fontSize: "0.85rem" }}
                />
              </div>
              <div style={{ overflowY: "auto", paddingRight: 4 }}>
                {EMOJI_GROUPS.map((group) => (
                  <div key={group.label} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-faint)", marginBottom: 8, fontWeight: 600 }}>
                      {group.label}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
                      {group.emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            onChange(emoji);
                            setIsOpen(false);
                          }}
                          style={{ 
                            width: 42, height: 42, borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)",
                            background: value === emoji ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.02)",
                            fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

