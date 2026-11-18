import { Link } from 'react-router-dom';
import { ContinueWatchingCard } from '../components/ContinueWatchingCard';
import { usePageContent, useSiteContent } from '../data/useContent';

export function ProfilePage() {
  const page = usePageContent('profile');
  const home = usePageContent('home');
  const site = useSiteContent();

  return (
    <div className="flex flex-col w-full text-on-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl pb-space-2xl">
      <div className="max-w-6xl mx-auto w-full space-y-space-xl">
        <div className="p-space-xl rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-xl">
          <div className="flex items-center gap-space-md">
            <img
              src={site.profileAvatar}
              alt="پروفایل کاربری"
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />
            <div>
              <h1 className="font-headline-md text-headline-md font-black text-on-surface">
                {page.title}
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {page.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <Link
              to="/subscription"
              className="px-space-lg py-space-sm rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-colors"
            >
              مدیریت اشتراک
            </Link>
            <Link
              to="/admin"
              className="px-space-lg py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md transition-colors"
            >
              ورود به پنل مدیریت محتوا
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-space-sm mb-space-md">
            <span className="w-1.5 h-5 bg-primary-container rounded-full" />
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {home.continueWatching.sectionTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {home.continueWatching.items.map((item) => (
              <ContinueWatchingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
