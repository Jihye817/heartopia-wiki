"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const NAV_ITEMS = [
  { label: "원예", href: "/gardening" },
  { label: "요리", href: undefined },
  { label: "낚시", href: undefined },
  { label: "곤충 채집", href: undefined },
  { label: "새 관찰", href: undefined },
  { label: "반려동물", href: undefined },
  { label: "쿠폰", href: "/coupons" },
] as const;

const linkClassName =
  "text-[13px] font-medium text-[#9a7aaa] no-underline transition-colors hover:text-[#e873a8]";
const spanClassName = "cursor-default text-[13px] font-medium text-[#9a7aaa]";

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
            className="fixed z-[9999] min-w-[150px] rounded-lg border border-[rgba(248,164,200,0.3)] py-2 shadow-lg"
            style={{
              top: dropdownPosition.top,
              right: dropdownPosition.right,
              background: "rgba(255, 252, 248, 0.98)",
              backdropFilter: "blur(16px)",
            }}
          >
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-4 py-2.5 ${linkClassName}`}
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  className={`block px-4 py-2.5 ${spanClassName}`}
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
    <nav
      className="sticky top-0 z-[100] border-b border-[rgba(248,164,200,0.2)] px-4 py-0 md:px-6"
      style={{
        background: "rgba(255, 252, 248, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1100px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#6b4a7a] no-underline"
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base"
            style={{
              background: "linear-gradient(135deg, #f8a4c8, #c9a7eb)",
              boxShadow: "0 2px 8px rgba(248,164,200,0.4)",
            }}
          >
            🌸
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "#6b4a7a" }}
          >
            Heartopia Wiki
          </span>
        </Link>

        {/* Desktop: 가로 메뉴 */}
        <div className="hidden items-center gap-7 md:flex">
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
        </div>

        {/* Mobile: 햄버거 버튼 + 드롭다운 (body 포탈) */}
        <div className="relative flex md:hidden">
          <button
            ref={buttonRef}
            type="button"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            onClick={handleToggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#9a7aaa] transition-colors hover:bg-[rgba(248,164,200,0.15)] hover:text-[#e873a8]"
          >
            {isMenuOpen ? (
              <span className="text-xl" aria-hidden>
                ✕
              </span>
            ) : (
              <span className="text-xl" aria-hidden>
                ☰
              </span>
            )}
          </button>

          {dropdownContent}
        </div>
      </div>
    </nav>
  );
}
