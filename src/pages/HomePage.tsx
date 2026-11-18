import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContinueWatchingCard } from '../components/ContinueWatchingCard';
import { CuratorCard } from '../components/CuratorCard';
import { PosterCard } from '../components/PosterCard';
import { TrailerModal } from '../components/TrailerModal';
import { usePageContent, useProducts } from '../data/useContent';

export function HomePage() {
  const home = usePageContent('home');
  const products = useProducts();

  const [bookmarkedHero, setBookmarkedHero] = useState(false);
  const [releaseOffset, setReleaseOffset] = useState(0);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const newReleasesList = home.newReleases.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const rotatedReleases =
    newReleasesList.length > 0
      ? newReleasesList.map(
          (_, idx) => newReleasesList[(idx + releaseOffset) % newReleasesList.length]
        )
      : [];

  const topRankedList = home.topRanked.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="flex flex-col w-full text-on-surface overflow-hidden">
      {/* SECTION 1: HERO CINEMATIC BACKDROP */}
      <section className="relative w-full -mt-20 pt-20 pb-space-2xl min-h-[720px] lg:min-h-[942px] flex items-end">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 end-1/4 w-[620px] h-[620px] rounded-full bg-secondary-container/25 blur-[140px] -z-10 mix-blend-screen" />
          <div className="absolute top-1/3 -start-[10%] w-[500px] h-[500px] rounded-full bg-primary-container/15 blur-[160px] -z-10" />
          <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-surface via-surface/90 to-transparent z-10" />
        </div>

        {/* Hero Visual Canvas / Editorial Poster Atmosphere */}
        <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-l from-surface-container-lowest via-surface-container-low to-surface-container-lowest opacity-95 relative">
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  height="120"
                  id="hero-film-grain"
                  patternUnits="userSpaceOnUse"
                  width="120"
                >
                  <path
                    className="text-outline/40"
                    d="M0 20 L120 20 M0 60 L120 60 M0 100 L120 100"
                    stroke="currentColor"
                    strokeDasharray="3 7"
                    strokeWidth="0.5"
                  />
                  <circle className="text-tertiary" cx="20" cy="40" fill="currentColor" r="1.5" />
                  <circle className="text-primary" cx="90" cy="80" fill="currentColor" r="1" />
                  <rect
                    className="text-on-surface-variant/30"
                    fill="currentColor"
                    height="4"
                    width="6"
                    x="10"
                    y="8"
                  />
                  <rect
                    className="text-on-surface-variant/30"
                    fill="currentColor"
                    height="4"
                    width="6"
                    x="50"
                    y="8"
                  />
                  <rect
                    className="text-on-surface-variant/30"
                    fill="currentColor"
                    height="4"
                    width="6"
                    x="90"
                    y="8"
                  />
                </pattern>
              </defs>
              <rect fill="url(#hero-film-grain)" height="100%" width="100%" />
            </svg>

            {/* Dynamic Silhouette Visual Mockup */}
            <div className="absolute inset-0 flex items-center justify-end pe-margin-mobile md:pe-margin opacity-35 pointer-events-none">
              <div className="relative w-full max-w-2xl h-[80%] flex items-center justify-center">
                <div className="absolute w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-primary-container/20 to-tertiary/10 blur-3xl" />
                <svg
                  className="w-80 h-80 text-outline-variant/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 200 200"
                >
                  <circle cx="100" cy="100" r="88" strokeDasharray="6 4" strokeWidth="1.5" />
                  <circle cx="100" cy="100" r="64" strokeWidth="1" />
                  <path d="M40 100 L160 100 M100 40 L100 160" strokeOpacity="0.4" strokeWidth="1" />
                  <polygon
                    fill="currentColor"
                    fillOpacity="0.25"
                    points="90,75 125,100 90,125"
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute bottom-8 start-12 font-headline-lg text-headline-lg text-outline-variant/20 font-black tracking-widest uppercase select-none pointer-events-none">
                  {home.hero.scopeWatermark}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface-container-lowest/70" />
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-20 w-full px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="max-w-3xl flex flex-col items-start gap-space-md">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-primary-container font-label-md text-label-md shadow-[0_0_20px_rgba(229,9,20,0.5)]">
                <span className="w-2 h-2 rounded-full bg-on-primary-container animate-pulse" />
                {home.hero.exclusiveBadge}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high/80 text-tertiary font-label-md text-label-md">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span>{home.hero.ratingText}</span>
                <span className="text-on-surface-variant font-normal ms-1">
                  {home.hero.ratingSubtext}
                </span>
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest/60 text-on-surface-variant font-label-sm text-label-sm tracking-wider uppercase">
                {home.hero.qualityBadge}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest/60 text-on-surface-variant font-label-sm text-label-sm">
                {home.hero.ageBadge}
              </span>
            </div>

            {/* Grand Cinema Title */}
            <div className="flex flex-col gap-1">
              <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                {home.hero.title}
              </h1>
              <span
                className="font-label-lg text-label-lg text-outline font-normal tracking-wide"
                dir="ltr"
              >
                {home.hero.englishTitle}
              </span>
            </div>

            {/* Meta Specification Info Strip */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-space-md font-body-sm text-body-sm text-on-surface-variant/90">
              <span className="text-on-surface font-semibold">{home.hero.yearLabel}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant" />
              <span>{home.hero.genresLabel}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant" />
              <span>{home.hero.durationLabel}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant" />
              <span className="text-tertiary">{home.hero.audioLabel}</span>
            </div>

            {/* Synopsis */}
            <p className="font-body-md md:font-body-lg md:text-body-lg text-on-surface/90 max-w-2xl leading-relaxed">
              {home.hero.synopsis}
            </p>

            {/* Director and Cast Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-space-lg font-body-sm text-body-sm text-on-surface-variant/80 pt-space-xs">
              <div>
                <span className="text-on-surface font-medium">{home.hero.directorLabel}</span>
                <span className="text-on-surface-variant ms-1">{home.hero.directorName}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-outline-variant" />
              <div>
                <span className="text-on-surface font-medium">{home.hero.castLabel}</span>
                <span className="text-on-surface-variant ms-1">{home.hero.castNames}</span>
              </div>
            </div>

            {/* Action CTAs Bar */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-md">
              <button
                type="button"
                onClick={() => setModalTitle(home.hero.title)}
                className="inline-flex items-center gap-space-sm px-space-xl py-3.5 rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_8px_30px_rgba(229,9,20,0.45)] hover:shadow-[0_10px_35px_rgba(229,9,20,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                <span>{home.hero.primaryCta}</span>
              </button>

              <Link
                to={`/movies/${home.hero.featuredSlug}`}
                className="inline-flex items-center gap-space-sm px-space-lg py-3.5 rounded-xl bg-surface-bright/20 hover:bg-surface-bright/40 text-on-surface backdrop-blur-md font-label-lg text-label-lg transition-all duration-200"
              >
                <span className="material-symbols-outlined text-xl">info</span>
                <span>{home.hero.secondaryCta}</span>
              </Link>

              <button
                type="button"
                onClick={() => setBookmarkedHero((b) => !b)}
                aria-label={home.hero.bookmarkAriaLabel}
                className="w-12 h-12 rounded-full bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface flex items-center justify-center backdrop-blur-sm shadow-md hover:scale-105 active:scale-90 transition-all duration-200 group"
              >
                <span
                  className={`material-symbols-outlined text-xl transition-colors ${
                    bookmarkedHero ? 'text-primary' : 'group-hover:text-primary'
                  }`}
                  style={{ fontVariationSettings: bookmarkedHero ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {bookmarkedHero ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTINUE WATCHING */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-lg">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="w-1.5 h-5 bg-primary-container rounded-full" />
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {home.continueWatching.sectionTitle}
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant/60">
            {home.continueWatching.countLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {home.continueWatching.items.map((item) => (
            <ContinueWatchingCard
              key={item.id}
              item={item}
              onPlay={() => setModalTitle(item.title)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: NEW RELEASES SHELF */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <div className="flex items-center gap-space-sm">
              <span className="w-1.5 h-5 bg-primary-container rounded-full" />
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                {home.newReleases.sectionTitle}
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant/70 mt-1">
              {home.newReleases.sectionSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() =>
                setReleaseOffset((o) =>
                  newReleasesList.length > 0
                    ? (o - 1 + newReleasesList.length) % newReleasesList.length
                    : 0
                )
              }
              aria-label="قبلی"
              className="w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setReleaseOffset((o) =>
                  newReleasesList.length > 0 ? (o + 1) % newReleasesList.length : 0
                )
              }
              aria-label="بعدی"
              className="w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-gutter">
          {rotatedReleases.map((product) => (
            <PosterCard key={product.id} product={product} variant="new-release" />
          ))}
        </div>
      </section>

      {/* SECTION 4: TOP 5 RANKED / TRENDING */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="w-1.5 h-5 bg-tertiary rounded-full" />
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              {home.topRanked.sectionTitle}
            </h2>
          </div>
          <Link
            className="font-label-md text-label-md text-primary hover:text-on-surface transition-colors flex items-center gap-1"
            to="/movies"
          >
            <span>{home.topRanked.viewAllLabel}</span>
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter">
          {topRankedList.map((product) => (
            <PosterCard key={product.id} product={product} variant="top-ranked" />
          ))}
        </div>
      </section>

      {/* SECTION 5: CURATOR'S CHOICE */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
          <div>
            <div className="flex items-center gap-space-sm">
              <span className="w-1.5 h-5 bg-tertiary rounded-full" />
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                {home.curatorChoice.sectionTitle}
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant/70 mt-1">
              {home.curatorChoice.sectionSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-tertiary px-3 py-1 rounded-full bg-tertiary/10">
              {home.curatorChoice.badgeLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {home.curatorChoice.items.map((item) => (
            <CuratorCard
              key={item.id}
              item={item}
              onPreview={() => setModalTitle(item.title)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 6: LUXURY SUBSCRIPTION PROMO STRIP */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-2xl">
        <div className="relative w-full rounded-2xl bg-gradient-to-r from-surface-container-lowest via-surface-container to-surface-container-low p-space-xl md:p-space-2xl overflow-hidden shadow-2xl">
          <div className="absolute -start-20 -top-20 w-80 h-80 rounded-full bg-primary-container/20 blur-[100px] pointer-events-none" />
          <div className="absolute end-10 bottom-0 w-64 h-64 rounded-full bg-tertiary/10 blur-[80px] pointer-events-none" />

          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="40" id="sub-grid" patternUnits="userSpaceOnUse" width="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="url(#sub-grid)" height="100%" width="100%" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
            <div className="flex flex-col items-start gap-space-sm max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">stars</span>
                <span>{home.promoStrip.badgeLabel}</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
                {home.promoStrip.headline}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant/90 leading-relaxed">
                {home.promoStrip.description}
              </p>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-space-lg font-label-md text-label-md text-on-surface-variant/80 pt-space-xs">
                {home.promoStrip.features.map((feat, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">
                      check_circle
                    </span>
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-space-md shrink-0 w-full sm:w-auto">
              <div className="text-start">
                <span className="font-label-sm text-label-sm text-on-surface-variant/70 block">
                  {home.promoStrip.priceHint}
                </span>
                <div className="flex items-baseline gap-1.5 mt-1" dir="rtl">
                  <span className="font-headline-lg text-headline-lg font-black text-on-surface">
                    {home.promoStrip.priceValue}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {home.promoStrip.priceUnit}
                  </span>
                </div>
              </div>
              <Link
                to="/subscription"
                className="w-full sm:w-auto text-center px-space-2xl py-4 rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-[0_8px_30px_rgba(229,9,20,0.5)] hover:shadow-[0_12px_40px_rgba(229,9,20,0.7)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                {home.promoStrip.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrailerModal
        isOpen={Boolean(modalTitle)}
        title={modalTitle ?? ''}
        subtitle={home.hero.englishTitle}
        onClose={() => setModalTitle(null)}
      />
    </div>
  );
}
