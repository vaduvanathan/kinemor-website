import Link from "next/link";

const links = [
  { href: "/glove", label: "DGlove1" },
  { href: "/open-worlds", label: "Open Worlds" },
  { href: "/contact", label: "Contact" },
];

/** Keeps the same simple routes visible at the end of every Kinemor page. */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="page-shell footer-layout">
        <p>Kinemor &copy; {new Date().getFullYear()}</p>
        <div className="footer-links" aria-label="Footer links">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          <a href="mailto:contact@kinemor.com">contact@kinemor.com</a>
        </div>
      </div>
    </footer>
  );
}
