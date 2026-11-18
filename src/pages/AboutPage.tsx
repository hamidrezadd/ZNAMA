import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageContent } from '../data/useContent';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function formatPersianNumber(n: number): string {
  return n
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/\d/g, (x) => PERSIAN_DIGITS[Number(x)]);
}

export function AboutPage() {
  const data = usePageContent('about-us');
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, string>>({});

  useEffect(() => {
    const timers: number[] = [];

    data.hero.stats.forEach((stat) => {
      if (!stat.numericTarget) return;
      let current = 0;
      const target = stat.numericTarget;
      const duration = 1200;
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = window.setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          window.clearInterval(timer);
        }
        setAnimatedCounts((prev) => ({
          ...prev,
          [stat.id]: formatPersianNumber(Math.floor(current)) + (stat.suffix ?? ''),
        }));
      }, stepTime);

      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => window.clearInterval(t));
    };
  }, [data.hero.stats]);

  return (
    <div className="flex flex-col w-full selection:bg-primary-container selection:text-on-primary-container">
      {/* Cinematic Hero Manifesto Section */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest -mt-20 pt-28 pb-space-2xl md:pb-36 px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="absolute top-0 end-1/4 w-96 h-96 rounded-full bg-secondary-container/20 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 start-10 w-80 h-80 rounded-full bg-primary-container/10 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,9,20,0.18),rgba(19,19,19,0))] pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md mb-space-lg shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-sm text-label-sm text-tertiary tracking-widest uppercase">
              {data.hero.badgeEn}
            </span>
            <span className="text-outline-variant font-serif mx-1">/</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              {data.hero.badgeFa}
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg md:font-display-hero md:text-display-hero text-on-surface font-black tracking-tight mb-space-xl max-w-4xl leading-tight">
            {data.hero.headlineLine1}
            <span className="block bg-gradient-to-l from-primary via-on-surface to-on-surface-variant bg-clip-text text-transparent">
              {data.hero.headlineLine2}
            </span>
          </h1>

          <div className="relative w-full max-w-4xl p-space-lg md:p-space-2xl rounded-xl bg-surface-container/60 backdrop-blur-xl shadow-2xl text-start overflow-hidden group">
            <div className="absolute top-0 start-0 w-1.5 h-full bg-primary-container" />
            <div className="absolute top-4 end-6 text-surface-container-highest/30 select-none pointer-events-none font-serif text-8xl md:text-9xl leading-none">
              ”
            </div>
            <div className="relative z-10 flex flex-col gap-space-md">
              <p className="font-headline-sm text-headline-sm md:font-headline-md md:text-headline-md text-on-surface font-bold leading-relaxed">
                {data.hero.quoteParagraph1}
              </p>
              <p className="font-body-md md:font-body-lg md:text-body-lg text-on-surface-variant leading-loose">
                {data.hero.quoteParagraph2}
              </p>
              <div className="pt-space-sm flex items-center justify-between flex-wrap gap-space-md">
                <span className="font-headline-sm text-headline-sm text-primary font-black tracking-tight">
                  {data.hero.quoteClosing}
                </span>
                <div
                  className="flex items-center gap-space-xs text-on-surface-variant/70 font-label-sm text-label-sm"
                  dir="ltr"
                >
                  <span className="material-symbols-outlined text-base text-primary">
                    movie_filter
                  </span>
                  <span>{data.hero.establishedLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter w-full max-w-4xl mt-space-2xl pt-space-md">
            {data.hero.stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center justify-center p-space-md rounded-lg bg-surface-container-low/70"
              >
                <span
                  className={`font-headline-lg text-headline-lg font-black tracking-tight ${stat.colorClass}`}
                >
                  {stat.numericTarget ? animatedCounts[stat.id] ?? stat.value : stat.value}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="w-full py-space-2xl px-margin-mobile md:px-margin-tablet lg:px-margin bg-surface relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-primary-container/20 to-transparent blur-xl opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-surface-container-lowest shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,170,0.15),transparent_60%)] z-10 pointer-events-none" />
                <img
                  alt={data.founder.name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                  src={data.founder.portrait}
                />
                <div className="absolute bottom-4 start-4 z-20 flex items-center gap-space-xs bg-surface-container-highest/90 backdrop-blur-md px-space-md py-1 rounded-full shadow-md">
                  <span className="w-2 h-2 rounded-full bg-primary-container" />
                  <span className="font-label-sm text-label-sm text-on-surface tracking-wider">
                    {data.founder.badgeEn}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-space-lg lg:pe-space-xl">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-tertiary uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  {data.founder.eyebrow}
                </span>
                <h2 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
                  {data.founder.name}
                </h2>
                <p className="font-label-lg text-label-lg text-primary font-medium">
                  {data.founder.role}
                </p>
              </div>

              <div className="space-y-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>{data.founder.paragraph1}</p>
                <p className="p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md shadow-sm">
                  {data.founder.highlightQuote}
                </p>
                <p>{data.founder.paragraph3}</p>
              </div>

              <div className="pt-space-sm flex items-center justify-between flex-wrap gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">stylus_note</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      {data.founder.noteTitle}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      {data.founder.noteDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-serif italic text-outline-variant text-xl tracking-widest"
                    dir="ltr"
                  >
                    {data.founder.signature}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full py-space-2xl bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute -bottom-20 -start-20 w-96 h-96 rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-md text-label-md text-primary font-semibold tracking-wider block mb-2">
                {data.values.eyebrow}
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
                {data.values.title}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              {data.values.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {data.values.pillars.map((pillar) => {
              const iconBg =
                pillar.accentType === 'primary'
                  ? 'bg-primary-container/20 text-primary-container group-hover:bg-primary-container group-hover:text-on-primary-container'
                  : pillar.accentType === 'tertiary'
                  ? 'bg-tertiary-container/30 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary'
                  : pillar.accentType === 'secondary'
                  ? 'bg-secondary-container/30 text-secondary group-hover:bg-secondary group-hover:text-on-secondary'
                  : 'bg-surface-bright text-on-surface group-hover:bg-on-surface group-hover:text-surface';

              const footerColor =
                pillar.accentType === 'primary'
                  ? 'text-primary'
                  : pillar.accentType === 'tertiary'
                  ? 'text-tertiary'
                  : pillar.accentType === 'secondary'
                  ? 'text-secondary'
                  : 'text-on-surface';

              return (
                <div
                  key={pillar.code}
                  className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-container/70 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-surface-container-high group"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-space-md transition-colors ${iconBg}`}
                    >
                      <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline-variant font-mono mb-1 block">
                      {pillar.code}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-sm">
                      {pillar.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div
                    className={`pt-space-md mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm ${footerColor}`}
                  >
                    <span>{pillar.footerLabel}</span>
                    <span className="material-symbols-outlined text-sm">arrow_left_alt</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Visual Curation Showcase */}
      <section className="w-full py-space-2xl px-margin-mobile md:px-margin-tablet lg:px-margin bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden bg-surface-container-low shadow-2xl p-space-lg md:p-space-xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <span className="font-label-md text-label-md text-tertiary font-bold tracking-wider">
                  {data.curationShowcase.eyebrow}
                </span>
                <h3 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
                  {data.curationShowcase.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {data.curationShowcase.description}
                </p>
                <div className="flex items-center gap-space-md flex-wrap pt-space-xs">
                  {data.curationShowcase.badges.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-surface-container-highest px-space-md py-space-xs rounded-lg text-on-surface font-label-sm text-label-sm"
                    >
                      <span
                        className={`material-symbols-outlined text-base ${
                          b.color === 'primary' ? 'text-primary' : 'text-tertiary'
                        }`}
                      >
                        {b.icon}
                      </span>
                      <span>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <Link
                  to="/movies"
                  className="block aspect-video w-full rounded-xl overflow-hidden shadow-2xl relative group bg-surface-container-lowest"
                >
                  <img
                    alt={data.curationShowcase.cardTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={data.curationShowcase.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-on-surface">
                    <div>
                      <div className="font-label-md text-label-md font-bold">
                        {data.curationShowcase.cardTitle}
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        {data.curationShowcase.cardSubtitle}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">play_arrow</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram & Community Banner */}
      <section className="w-full py-space-2xl px-margin-mobile md:px-margin-tablet lg:px-margin bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-space-lg md:p-space-2xl shadow-2xl">
            <div className="absolute top-0 start-0 w-80 h-80 bg-primary-container/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-xl">
              <div className="flex flex-col gap-space-sm text-center md:text-start max-w-xl">
                <div className="inline-flex items-center gap-2 self-center md:self-start text-primary font-label-md text-label-md font-bold">
                  <span className="material-symbols-outlined text-lg">public</span>
                  {data.communityBanner.eyebrow}
                </div>
                <h3 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
                  {data.communityBanner.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {data.communityBanner.description}
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-space-md w-full md:w-auto">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-md px-space-xl py-space-md rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_8px_30px_rgba(229,9,20,0.4)] hover:shadow-[0_8px_40px_rgba(229,9,20,0.6)] transition-all duration-300 group"
                  href={data.communityBanner.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
                    photo_camera
                  </span>
                  <div className="flex flex-col text-start">
                    <span className="font-bold">{data.communityBanner.ctaTitle}</span>
                    <span className="font-label-sm text-label-sm opacity-90" dir="ltr">
                      {data.communityBanner.ctaHandle}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-lg ms-2">arrow_back</span>
                </a>
                <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{data.communityBanner.statusText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
