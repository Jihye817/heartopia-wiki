"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const NAV_ITEMS = [
  { label: "원예", href: "/gardening" },
  { label: "요리", href: "/cooking" },
  { label: "낚시", href: "/fishing" },
  { label: "곤충 채집", href: "/bugs" },
  { label: "새 관찰", href: "/birds" },
  { label: "반려동물", href: undefined },
  { label: "기타 수집", href: "/others" },
  { label: "쿠폰", href: "/coupons" },
] as const;

const linkClassName =
  "text-sm font-semibold text-[var(--wiki-text-secondary)] no-underline px-2.5 py-1.5 rounded-lg transition-colors hover:bg-[var(--wiki-border-light)] hover:text-[var(--wiki-text-primary)] whitespace-nowrap";
const spanClassName =
  "cursor-default text-sm font-semibold text-[var(--wiki-text-secondary)] px-2.5 py-1.5 whitespace-nowrap";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    if (!isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const rightOffset = 12;
      setDropdownPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right - rightOffset,
      });
    }
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const rightOffset = 12;
        setDropdownPosition({
          top: rect.bottom + 4,
          right: window.innerWidth - rect.right - rightOffset,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseMenu();
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMenuOpen]);

  const dropdownContent =
    typeof document !== "undefined" &&
    createPortal(
      isMenuOpen ? (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            aria-hidden
            onClick={handleCloseMenu}
          />
          <div
            className="fixed z-[9999] min-w-[150px] rounded-xl border border-[var(--wiki-border)] bg-white py-2 shadow-lg"
            style={{
              top: dropdownPosition.top,
              right: dropdownPosition.right,
            }}
          >
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm font-semibold text-[var(--wiki-text-secondary)] no-underline transition-colors hover:bg-[var(--wiki-border-light)] hover:text-[var(--wiki-text-primary)]"
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  className="block cursor-default px-4 py-2.5 text-sm font-semibold text-[var(--wiki-text-tertiary)]"
                >
                  {item.label}
                </span>
              ),
            )}
          </div>
        </>
      ) : null,
      document.body,
    );

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--wiki-border)] bg-white px-4 md:px-6">
      <div className="mx-auto flex h-[60px] max-w-[1100px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--wiki-text-primary)] no-underline"
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-[7px]"
            style={{
              background: "linear-gradient(135deg, #FAD4DB, #CCDFF4)",
            }}
          >
            <span className="text-sm">🌸</span>
          </div>
          <span className="text-base font-medium tracking-tight" style={{ fontFamily: "var(--font-jua), sans-serif", color: "var(--wiki-text-primary)" }}>
            두근두근타운 위키
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} className={linkClassName}>
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className={spanClassName}>
                {item.label}
              </span>
            ),
          )}
        </nav>

        {/* Mobile hamburger */}
        <div className="relative flex md:hidden">
          <button
            ref={buttonRef}
            type="button"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            onClick={handleToggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--wiki-text-secondary)] transition-colors hover:bg-[var(--wiki-border-light)] hover:text-[var(--wiki-text-primary)]"
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>

          {dropdownContent}
        </div>
      </div>
    </header>
  );
}
