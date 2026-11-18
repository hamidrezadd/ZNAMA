import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { contentRepository } from '../data/ContentRepository';
import { useSiteContent } from '../data/useContent';

// TODO: Add authentication guard here (e.g., check admin session/role) before protecting /admin routes in production.

const ADMIN_NAV_ITEMS = [
  { path: '/admin', label: 'داشبورد کلی', icon: 'dashboard', end: true },
  { path: '/admin/home', label: 'صفحه خانه', icon: 'home', end: false },
  { path: '/admin/movies', label: 'فیلم‌ها و سریال‌ها', icon: 'movie', end: false },
  { path: '/admin/subscription', label: 'اشتراک و قیمت‌ها', icon: 'workspace_premium', end: false },
  { path: '/admin/about', label: 'صفحه درباره ما', icon: 'info', end: false },
  { path: '/admin/site', label: 'تنظیمات سایت و اخبار', icon: 'tune', end: false },
];

export function AdminLayout() {
  const site = useSiteContent();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  const handleReset = () => {
    contentRepository.resetAll();
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 2500);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col lg:flex-row">
      {/* Sidebar (Desktop) + Drawer (Mobile) */}
      <aside className="lg:w-72 lg:shrink-0 bg-surface-container-low border-b lg:border-b-0 lg:border-e border-outline-variant/25 flex flex-col">
        <div className="h-20 px-space-lg flex items-center justify-between border-b border-outline-variant/20">
          <Link to="/admin" className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md font-black text-primary-container tracking-tight">
              {site.brandEn}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm font-bold">
              مدیریت محتوا
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="منوی مدیریت"
            className="lg:hidden w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined">
              {mobileNavOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        <nav
          className={`${
            mobileNavOpen ? 'flex' : 'hidden'
          } lg:flex flex-col gap-space-xs p-space-md flex-1`}
        >
          {ADMIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md'
                  : 'flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg transition-colors'
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="mt-auto pt-space-lg border-t border-outline-variant/20 flex flex-col gap-space-sm">
            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-surface-container-high hover:bg-error-container hover:text-on-error-container text-on-surface-variant font-label-md text-label-md transition-colors"
            >
              <span className="material-symbols-outlined text-lg">restart_alt</span>
              <span>بازنشانی به نسخه اولیه</span>
            </button>

            <Link
              to="/"
              className="w-full flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-surface-container hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-colors"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              <span>مشاهده سایت عمومی</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-margin-mobile md:px-space-xl bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/20 flex items-center justify-between gap-space-md sticky top-0 z-30">
          <div className="flex items-center gap-space-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              پنل مدیریت محتوای {site.brandFa} ({site.brandEn})
            </span>
          </div>

          <div className="flex items-center gap-space-sm">
            {resetMessage && (
              <span className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary font-label-sm text-label-sm">
                محتوا به مقادیر اولیه بازنشانی شد
              </span>
            )}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-xl bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-label-md text-label-md transition-colors"
            >
              <span>بازگشت به سایت</span>
              <span className="material-symbols-outlined text-base">arrow_back</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-margin-mobile md:p-space-xl max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
