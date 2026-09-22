/**
 * PragatiPath — Public Website Navigation Bar (Clienter-inspired Redesign)
 * Warm cream backdrop, rounded floating container, dark text, pill Get Started button.
 * Strictly contains: Home, About, Services, Contact, and Get Started (navigating to /login).
 */
import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdArrowForward } from 'react-icons/md';
import { Logo } from '../shared/Logo';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="sticky top-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none">
      <header className="max-w-6xl mx-auto pointer-events-auto transition-all duration-200">
        <div className="bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E8E1D5] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-xs flex items-center justify-between">
          
          {/* PragatiPath Brand Logo with orange variant */}
          <div className="flex items-center pl-1">
            <Logo size="sm" variant="orange" to="/" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#EAE2D5]/70 text-[#0B1320]'
                      : 'text-[#475569] hover:text-[#0B1320] hover:bg-black/[0.03]'
                  }`}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Primary CTA: Get Started (Pill button with arrow) */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-xs sm:text-sm font-bold tracking-tight transition-all duration-150 group shadow-xs hover:shadow"
            >
              <span>Get Started</span>
              <MdArrowForward size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center pr-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="p-1.5 rounded-full text-[#0B1320] hover:bg-[#EAE2D5]/50 transition-colors"
            >
              {mobileMenuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#FAF8F5]/98 backdrop-blur-lg border border-[#E8E1D5] rounded-2xl p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-[#FF5500]/10 text-[#FF5500]'
                        : 'text-[#0B1320] hover:bg-[#EAE2D5]/40'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-3 mt-2 border-t border-[#E8E1D5]">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0B1320] text-white text-sm font-bold shadow-xs transition-colors"
              >
                <span>Get Started</span>
                <MdArrowForward size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
