"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  {
    href: "/shop",
    label: "Shop",
    match: (p: string) => p.startsWith("/shop"),
  },
  {
    href: "/blog",
    label: "Blog",
    match: (p: string) => p.startsWith("/blog"),
  },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
] as const;

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const mastheadRef = useRef<HTMLDivElement>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerTop, setDrawerTop] = useState(108);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchVisible(false);
    }
  };

  const openSearch = () => {
    setIsMobileMenuOpen(false);
    setIsSearchVisible(true);
  };

  const measureMasthead = useCallback(() => {
    const el = mastheadRef.current;
    if (!el || typeof window === "undefined") return;
    const wide = window.matchMedia("(min-width: 992px)").matches;
    if (wide) {
      setDrawerTop(108);
      document.body.style.paddingTop = "";
      return;
    }
    const h = el.offsetHeight;
    setDrawerTop(h);
    document.body.style.paddingTop = `${h}px`;
  }, []);

  useLayoutEffect(() => {
    measureMasthead();
  }, [measureMasthead, isMobileMenuOpen]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measureMasthead());
    const el = mastheadRef.current;
    if (el) ro.observe(el);
    window.addEventListener("resize", measureMasthead);
    return () => {
      window.removeEventListener("resize", measureMasthead);
      if (el) ro.disconnect();
    };
  }, [measureMasthead]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => {
      if (mq.matches) setIsMobileMenuOpen(false);
      measureMasthead();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [measureMasthead]);

  useEffect(() => {
    const lock =
      isMobileMenuOpen || isSearchVisible
        ? "hidden"
        : "";
    document.body.style.overflow = lock;
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchVisible]);

  useEffect(() => {
    return () => {
      document.body.style.paddingTop = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsSearchVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="header-v4">
        <div className="container-menu-desktop">
          <div className="top-bar fixed-top">
            <div className="content-topbar flex-sb-m h-full container">
              <div className="left-top-bar">
                Free shipping for standard order over $100
              </div>

              <div className="right-top-bar flex-w h-full">
                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  Help & FAQs
                </a>
                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  My Account
                </a>
                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  EN
                </a>
                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  USD
                </a>
              </div>
            </div>
          </div>

          <div className="wrap-menu-desktop how-shadow1">
            <nav className="limiter-menu-desktop container">
              <Link href="/" className="logo">
                <img src="/images/icons/logo-01.png" alt="IMG-LOGO" />
              </Link>

              <div className="menu-desktop">
                <ul className="main-menu">
                  {navItems.map((item) => (
                    <li
                      key={item.href}
                      className={item.match(pathname) ? "active-menu" : ""}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wrap-icon-header flex-w flex-r-m h-full">
                <div className="flex-c-m h-full p-r-24">
                  <div
                    className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11"
                    onClick={() => setIsSearchVisible(true)}
                    style={{ cursor: "pointer" }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsSearchVisible(true);
                      }
                    }}
                    aria-label="Open search"
                  >
                    <i className="zmdi zmdi-search"></i>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile & tablet: one-line top bar + toolbar (menu | search only — logo in drawer) */}
        <div ref={mastheadRef} className="coza-mobile-masthead">
          <div className="coza-topbar-compact">
            <div className="container-fluid px-2 px-sm-3">
              <div className="coza-topbar-single-row">
                <p
                  className="coza-topbar-ellipsis-text left-top-bar mb-0"
                  title="Free shipping for standard order over $100"
                >
                  Free shipping for standard order over $100
                </p>
                <div className="coza-topbar-right d-flex align-items-center flex-shrink-0">
                  <a href="#" className="text-decoration-none trans-04">
                    Help &amp; FAQs
                  </a>
                  <a href="#" className="text-decoration-none trans-04">
                    My Account
                  </a>
                  <a href="#" className="text-decoration-none trans-04">
                    EN
                  </a>
                  <a href="#" className="text-decoration-none trans-04">
                    USD
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap-header-mobile coza-mobile-toolbar-row w-100 align-items-center coza-mobile-toolbar-two">
            <button
              type="button"
              className="coza-icon-btn"
              aria-expanded={isMobileMenuOpen}
              aria-controls="coza-mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
            >
              <i
                className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}
                aria-hidden
              />
            </button>

            <button
              type="button"
              className="coza-icon-btn"
              aria-label="Search"
              onClick={openSearch}
            >
              <i className="fa-solid fa-magnifying-glass" aria-hidden />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="coza-mobile-navigation"
            className="coza-mobile-nav-drawer d-lg-none"
            style={{ top: drawerTop }}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="coza-drawer-inner">
              <Link
                href="/"
                className="coza-drawer-logo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img src="/images/icons/logo-01.png" alt="Coza Store" />
              </Link>

              <nav className="coza-drawer-nav" aria-label="Primary">
                <ul className="list-unstyled m-0 p-0">
                  {navItems.map((item) => (
                    <li
                      key={item.href}
                      className={item.match(pathname) ? "active-menu" : ""}
                    >
                      <Link
                        href={item.href}
                        className="coza-drawer-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <div
          className={`modal-search-header flex-c-m trans-04 ${
            isSearchVisible ? "show-modal-search" : "js-hide-modal-search"
          }`}
        >
          <div className="container-search-header">
            <button
              type="button"
              className="flex-c-m btn-hide-modal-search trans-04"
              onClick={() => setIsSearchVisible(false)}
              aria-label="Close search"
            >
              <img src="/images/icons/icon-close2.png" alt="" />
            </button>

            <form
              className="wrap-search-header flex-w p-l-15"
              onSubmit={handleSearchSubmit}
            >
              <button className="flex-c-m trans-04" type="submit" aria-label="Submit search">
                <i className="fa-solid fa-magnifying-glass" aria-hidden />
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchVisible}
              />
            </form>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
