import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSiteContent } from '../data/useContent';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const site = useSiteContent();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_1px_8px_rgba(0,0,0,0.6)] transition-all duration-300">
        <div className="h-20 w-full px-margin-mobile md:px-margin-tablet lg:px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-md lg:gap-space-xl">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="منوی ناوبری"
              className="lg:hidden w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link
              className="flex items-center gap-space-sm group focus:outline-none"
              to="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-1 rounded-full bg-primary-container/20 blur-sm group-hover:bg-primary-container/40 transition-all" />
                <span className="relative font-headline-md text-headline-md font-black tracking-tight text-primary-container group-hover:text-primary transition-colors">
                  {site.brandEn}
                </span>
              </div>
              <span className="hidden sm:inline-block font-label-md text-label-md text-on-surface-variant/80 tracking-widest">
                {site.brandFa}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-space-sm">
              {site.navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'px-space-md py-space-xs rounded-xl transition-colors bg-surface-container text-primary font-bold font-label-lg text-label-lg'
                      : 'px-space-md py-space-xs rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-space-md">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all focus:outline-none"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>

            <Link
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:shadow-[0_4px_25px_rgba(229,9,20,0.6)] transition-all duration-300"
              to={site.ctaPath}
            >
              {site.ctaLabel}
            </Link>

            <div className="flex items-center gap-space-sm ps-space-sm border-s border-outline-variant/30 ms-space-xs pe-space-xs">
              <Link
                className="relative block group focus:outline-none"
                to="/profile"
                aria-label="پروفایل کاربری"
              >
                <div className="absolute -inset-0.5 rounded-full bg-primary-container/30 opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]" />
                <img
                  alt="Profile"
                  className="relative w-8 h-8 rounded-full object-cover"
                  src={site.profileAvatar}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline-variant/20 px-margin-mobile md:px-margin-tablet py-space-md flex flex-col gap-space-xs">
            {site.navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'px-space-md py-space-sm rounded-xl bg-surface-container text-primary font-bold font-label-lg text-label-lg'
                    : 'px-space-md py-space-sm rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg transition-colors'
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to={site.ctaPath}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-space-xs inline-flex items-center justify-center px-space-md py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg"
            >
              {site.ctaLabel}
            </Link>
          </div>
        )}
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
