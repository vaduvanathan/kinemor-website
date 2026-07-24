"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";

const navigationItems = [
  { href: "#what-we-do", label: "What we do" },
  { href: "#system", label: "System" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="page-shell nav-wrap" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={closeMenu}>
          <BrandMark />
          <span>Kinemor</span>
        </a>
        <div className="nav-links nav-desktop">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </div>
        <a className="nav-cta nav-desktop" href="#contact">
          Get in touch
        </a>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-button"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
        {isOpen ? (
          <div className="mobile-menu" id="mobile-navigation">
            {navigationItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a href="#contact" onClick={closeMenu}>Get in touch</a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
