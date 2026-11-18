import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageContent } from '../data/useContent';

export function SubscriptionPage() {
  const data = usePageContent('subscription');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-surface-container-lowest text-on-surface">
      {/* Ambient Cinematic Glows */}
      <div className="pointer-events-none absolute -top-40 end-1/4 w-[600px] h-[600px] bg-primary-container/15 rounded-full blur-[140px] z-0" />
      <div className="pointer-events-none absolute top-[900px] -start-32 w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none absolute bottom-96 end-10 w-[450px] h-[450px] bg-primary-container/10 rounded-full blur-[150px] z-0" />

      {/* SECTION 1: HERO & BILLING TOGGLE */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-2xl pb-space-xl flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-md mb-space-lg">
          <span
            className="material-symbols-outlined text-tertiary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
          <span className="font-label-md text-label-md text-tertiary tracking-wider font-semibold">
            {data.hero.badge}
          </span>
        </div>

        <h1 className="font-display-hero text-headline-lg md:text-display-hero font-black tracking-tight text-on-surface max-w-4xl leading-tight">
          {data.hero.titlePrefix}
          <span className="text-primary-container drop-shadow-[0_0_25px_rgba(229,9,20,0.55)]">
            {data.hero.titleHighlight}
          </span>
          {data.hero.titleSuffix}
        </h1>

        <p className="font-body-md md:font-body-lg md:text-body-lg text-on-surface-variant max-w-2xl mt-space-md mb-space-xl leading-relaxed">
          {data.hero.subtitle}
        </p>

        <div className="flex items-center gap-2 mb-space-xl opacity-60">
          <span className="w-2.5 h-1 bg-primary-container rounded-full" />
          <span className="w-8 h-1 bg-outline-variant rounded-full" />
          <span className="w-2.5 h-1 bg-outline-variant rounded-full" />
        </div>

        <div className="relative flex items-center p-1.5 bg-surface-container-low rounded-xl shadow-inner max-w-md w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`flex-1 py-2.5 px-space-lg rounded-lg font-label-lg text-label-lg transition-all duration-300 ${
              billing === 'monthly'
                ? 'bg-surface-container-highest text-on-surface shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {data.hero.monthlyToggleLabel}
          </button>
          <button
            type="button"
            onClick={() => setBilling('annual')}
            className={`flex-1 py-2.5 px-space-lg rounded-lg font-label-lg text-label-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              billing === 'annual'
                ? 'bg-surface-container-highest text-on-surface shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>{data.hero.annualToggleLabel}</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold shadow-[0_0_12px_rgba(229,9,20,0.6)]">
              {data.hero.annualDiscountBadge}
            </span>
          </button>
        </div>
      </section>

      {/* SECTION 2: SUBSCRIPTION PRICING GRID */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin pb-space-2xl">
        {selectedPlanTitle && (
          <div className="mb-space-lg p-space-md rounded-xl bg-surface-container-high border border-primary-container/40 flex items-center justify-between gap-space-md shadow-lg">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary-container">check_circle</span>
              <span className="font-label-lg text-label-lg text-on-surface">
                پلن «{selectedPlanTitle}» انتخاب شد. آماده اتصال به درگاه امن پرداخت شاپرک.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPlanTitle(null)}
              className="text-on-surface-variant hover:text-on-surface"
              aria-label="بستن"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter items-stretch">
          {data.plans.map((plan) => {
            const activePrice = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            if (plan.featured) {
              return (
                <div
                  key={plan.id}
                  className="relative flex flex-col justify-between bg-gradient-to-b from-surface-container to-surface-container-low rounded-xl p-space-lg shadow-[0_20px_60px_rgba(229,9,20,0.35)] transform lg:-translate-y-4 hover:scale-[1.02] transition-all duration-300"
                >
                  {plan.featuredTopBadge && (
                    <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit px-space-md py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-extrabold shadow-[0_0_15px_rgba(229,9,20,0.8)] tracking-wider flex items-center gap-1.5">
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{plan.featuredTopBadge}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-space-md mt-2">
                      <span className="font-label-md text-label-md text-tertiary font-bold flex items-center gap-1">
                        {plan.tagIcon && (
                          <span className="material-symbols-outlined text-sm">{plan.tagIcon}</span>
                        )}
                        {plan.tag}
                      </span>
                      {plan.discountBadge && (
                        <span className="font-label-sm text-label-sm bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-bold shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                          {plan.discountBadge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-md text-headline-md font-black text-on-surface mb-space-xs">
                      {plan.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                      {plan.subtitle}
                    </p>

                    <div className="mb-space-xl p-space-md rounded-lg bg-surface-container-highest/60 backdrop-blur-md">
                      {plan.originalPrice && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="line-through text-on-surface-variant/60 font-label-sm text-label-sm">
                            {plan.originalPrice}
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-hero-mobile text-headline-lg font-black text-primary-container">
                          {activePrice}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface font-bold">
                          {plan.unitLabel}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-medium block mt-1">
                        {plan.perMonthHint}
                      </span>
                    </div>

                    <ul className="space-y-space-md mb-space-xl">
                      {plan.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-space-sm font-body-sm text-body-sm ${
                            feat.highlight
                              ? 'text-tertiary font-semibold'
                              : 'text-on-surface font-medium'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-lg mt-0.5 ${
                              feat.highlight ? 'text-tertiary' : 'text-primary-container'
                            }`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {feat.highlight ? 'verified_user' : 'check_circle'}
                          </span>
                          <span>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPlanTitle(plan.title)}
                    className="w-full py-4 rounded-lg bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-[0_6px_30px_rgba(229,9,20,0.5)] hover:shadow-[0_8px_40px_rgba(229,9,20,0.8)] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span className="material-symbols-outlined text-xl group-hover/btn:translate-x-1 transition-transform">
                      bolt
                    </span>
                    <span>{plan.ctaLabel}</span>
                  </button>
                </div>
              );
            }

            return (
              <div
                key={plan.id}
                className="flex flex-col justify-between bg-surface-container-low rounded-xl p-space-lg hover:bg-surface-container transition-all duration-300 shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <span
                      className={`font-label-md text-label-md px-2.5 py-1 rounded-full ${
                        plan.id === 'plan-3m'
                          ? 'text-tertiary bg-tertiary-container/30'
                          : 'text-on-surface-variant bg-surface-container-high'
                      }`}
                    >
                      {plan.tag}
                    </span>
                    {plan.tagIcon ? (
                      <span className="material-symbols-outlined text-outline">
                        {plan.tagIcon}
                      </span>
                    ) : plan.discountBadge ? (
                      <span className="font-label-sm text-label-sm bg-primary-container/20 text-primary px-2 py-0.5 rounded-full font-bold">
                        {plan.discountBadge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-xs">
                    {plan.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                    {plan.subtitle}
                  </p>

                  <div className="mb-space-xl">
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="line-through text-on-surface-variant/50 font-label-sm text-label-sm">
                          {plan.originalPrice}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                        {activePrice}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {plan.unitLabel}
                      </span>
                    </div>
                    <span
                      className={`font-label-sm text-label-sm block mt-1 ${
                        plan.originalPrice ? 'text-outline' : 'text-outline-variant'
                      }`}
                    >
                      {plan.perMonthHint}
                    </span>
                  </div>

                  <ul className="space-y-space-md mb-space-xl">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-space-sm font-body-sm text-body-sm ${
                          feat.included ? 'text-on-surface' : 'text-on-surface-variant/50'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-base mt-0.5 ${
                            feat.included ? 'text-primary' : 'text-surface-container-highest'
                          }`}
                        >
                          {feat.included ? 'check_circle' : 'block'}
                        </span>
                        <span className={feat.included ? '' : 'line-through'}>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlanTitle(plan.title)}
                  className="w-full py-3 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{plan.ctaLabel}</span>
                  <span className="material-symbols-outlined text-base">arrow_left</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: EDITORIAL BACKDROP & CINEMATIC IMMERSION BANNER */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ backgroundImage: `url('${data.immersionBanner.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />
          <div className="relative z-10 p-space-xl lg:p-space-2xl max-w-2xl">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider mb-2 block">
              {data.immersionBanner.eyebrow}
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg font-black text-on-surface mb-space-md">
              {data.immersionBanner.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
              {data.immersionBanner.description}
            </p>
            <div className="flex flex-wrap items-center gap-space-md">
              {data.immersionBanner.devices.map((dev, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-surface-container-highest/80 backdrop-blur-md px-space-md py-2 rounded-lg"
                >
                  <span className="material-symbols-outlined text-primary">{dev.icon}</span>
                  <span className="font-label-md text-label-md text-on-surface">{dev.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DETAILED FEATURE COMPARISON TABLE */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-md text-label-md text-tertiary font-bold tracking-widest block mb-2">
            {data.comparison.eyebrow}
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
            {data.comparison.title}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            {data.comparison.subtitle}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl bg-surface-container-low shadow-xl">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="bg-surface-container-high/60 text-on-surface font-label-lg text-label-lg">
                <th className="p-space-lg text-start">{data.comparison.colFeature}</th>
                <th className="p-space-lg text-center text-on-surface-variant/80">
                  {data.comparison.colFree}
                </th>
                <th className="p-space-lg text-center text-primary-container font-extrabold bg-primary-container/10">
                  {data.comparison.colVip}
                </th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              {data.comparison.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 1 ? 'bg-surface-container/30 ' : ''
                  }hover:bg-surface-container transition-colors`}
                >
                  <td className="p-space-lg font-medium">{row.feature}</td>
                  <td className="p-space-lg text-center text-on-surface-variant">
                    {row.freeType === 'close' ? (
                      <span className="material-symbols-outlined text-base text-error">close</span>
                    ) : row.freeType === 'negative-text' ? (
                      <span className="text-error inline-flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm">close</span>
                        <span>{row.freeValue}</span>
                      </span>
                    ) : (
                      <span className="text-on-surface-variant/80">{row.freeValue}</span>
                    )}
                  </td>
                  <td className="p-space-lg text-center font-bold bg-primary-container/5">
                    {row.vipType === 'check' ? (
                      <span className="material-symbols-outlined text-base text-primary">
                        check
                      </span>
                    ) : row.vipType === 'tertiary-verified' ? (
                      <div className="flex items-center justify-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        <span>{row.vipValue}</span>
                      </div>
                    ) : row.vipType === 'primary-text' ? (
                      <span className="text-primary">{row.vipValue}</span>
                    ) : row.vipType === 'tertiary-text' ? (
                      <span className="text-tertiary">{row.vipValue}</span>
                    ) : (
                      <span className="text-on-surface">{row.vipValue}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: TRUST, SECURITY & PAYMENT GATEWAYS */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {data.trustCards.map((card, idx) => (
            <div
              key={idx}
              className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex items-start gap-space-md"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  card.iconStyle === 'primary'
                    ? 'bg-primary-container/15 text-primary'
                    : card.iconStyle === 'tertiary'
                    ? 'bg-tertiary-container/20 text-tertiary'
                    : 'bg-surface-container-highest text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">{card.icon}</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
                  {card.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-space-lg p-space-md rounded-xl bg-surface-container flex flex-wrap items-center justify-between gap-space-md text-on-surface-variant">
          <div className="flex items-center gap-space-sm font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-xl">credit_card</span>
            <span>{data.gatewaysLabel}</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-md font-label-sm text-label-sm">
            {data.gateways.map((gw, idx) => (
              <span key={idx} className="px-space-md py-1 rounded bg-surface-container-high text-on-surface">
                {gw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-2xl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-space-xl">
            <span className="font-label-md text-label-md text-primary font-bold tracking-widest block mb-2">
              {data.faq.eyebrow}
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
              {data.faq.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              {data.faq.subtitle}
            </p>
          </div>

          <div className="space-y-space-md">
            {data.faq.items.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-surface-container-low overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-space-lg flex items-center justify-between text-start font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition-colors focus:outline-none gap-space-md"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`material-symbols-outlined text-outline transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-space-lg bg-surface-container/50">
                      <p className="font-body-md text-body-md text-on-surface-variant pb-space-lg pt-1 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION BAR */}
      <section className="relative z-10 w-full px-margin-mobile md:px-margin-tablet lg:px-margin pb-space-2xl">
        <div className="rounded-xl bg-gradient-to-r from-secondary-container via-surface-container-high to-surface-container-low p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-2xl">
          <div className="space-y-space-xs text-center md:text-start">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              {data.finalCta.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {data.finalCta.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <Link
              to="/contact-us"
              className="px-space-lg py-3 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-colors shadow-sm"
            >
              {data.finalCta.contactLabel}
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}
              className="px-space-lg py-3 rounded-lg bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-[0_4px_20px_rgba(229,9,20,0.5)] transition-all"
            >
              {data.finalCta.scrollLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
