"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/glove", label: "DGlove1" },
  { href: "/open-worlds", label: "Open Worlds" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 18);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <nav className="page-shell nav-wrap" aria-label="Primary navigation">
        <Link className="brand" href="/" onClick={closeMenu}>
          <BrandMark />
          <span>Kinemor</span>
        </Link>
        <div className="nav-links nav-desktop">
          {navigationItems.map((item) => (
            <Link aria-current={pathname === item.href ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
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
              <Link aria-current={pathname === item.href ? "page" : undefined} href={item.href} key={item.href} onClick={closeMenu}>{item.label}</Link>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
