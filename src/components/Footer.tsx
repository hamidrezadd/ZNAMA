import { Link } from 'react-router-dom';
import { useSiteContent } from '../data/useContent';

export function Footer() {
  const site = useSiteContent();

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant pt-space-2xl pb-space-xl">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter mb-space-2xl">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-md text-headline-md font-black text-primary-container tracking-tight">
                {site.brandEn}
              </span>
              <span className="font-label-lg text-label-lg text-on-surface-variant">
                {site.brandFa}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant/90 max-w-lg leading-relaxed">
              {site.footerDescription}
            </p>
            <div className="flex items-center gap-space-md mt-space-sm">
              <a
                className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors"
                href={site.instagramUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-lg">photo_camera</span>
                <span className="font-label-md text-label-md tracking-wider" dir="ltr">
                  {site.instagramHandle}
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-sm">
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-space-xs">
                {site.footerSectionsTitle}
              </h3>
              {site.footerSectionLinks.map((link) => (
                <Link
                  key={link.path}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  to={link.path}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-space-sm">
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-space-xs">
                {site.footerSupportTitle}
              </h3>
              {site.footerSupportLinks.map((link) => (
                <Link
                  key={link.path}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  to={link.path}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between bg-surface-container-low/50 p-space-lg rounded-xl">
            <div className="space-y-space-sm">
              <div className="font-label-md text-label-md uppercase tracking-wider text-tertiary">
                {site.footerHighlightTag}
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {site.footerHighlightTitle}
              </p>
            </div>
            <div className="pt-space-md text-on-surface-variant/70 font-body-sm text-body-sm">
              {site.footerHighlightSubtitle}
            </div>
          </div>
        </div>

        <div className="w-full pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant/70">
          <span className="font-body-sm text-body-sm">{site.copyrightText}</span>
          <div className="flex items-center gap-space-lg font-label-sm text-label-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              {site.serverStatusText}
            </span>
            <Link
              to="/admin"
              className="text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              پنل مدیریت محتوا
            </Link>
            <span className="tracking-wider text-on-surface-variant/50" dir="ltr">
              {site.platformTagEn}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
