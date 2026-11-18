import { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PosterCard } from '../components/PosterCard';
import { TrailerModal } from '../components/TrailerModal';
import { contentRepository } from '../data/ContentRepository';
import { useProducts } from '../data/useContent';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function toPersianDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function MovieDetailPage() {
  const { slug } = useParams<{ slug?: string }>();
  const products = useProducts();

  const featuredFallback =
    products.find((p) => p.slug === 'requiem-for-butterflies') ?? products[0];
  const product = (slug ? products.find((p) => p.slug === slug) : undefined) ?? featuredFallback;

  const [userStars, setUserStars] = useState(0);
  const [activeTab, setActiveTab] = useState<'episodes' | 'gallery' | 'soundtrack'>('episodes');
  const [season, setSeason] = useState('1');
  const [bookmarked, setBookmarked] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  // Review form state
  const [formStars, setFormStars] = useState(4);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [hasSpoiler, setHasSpoiler] = useState(false);
  const [sortBy, setSortBy] = useState<'helpful' | 'latest'>('helpful');

  if (!product) {
    return null;
  }

  const castList = product.cast.length > 0 ? product.cast : featuredFallback?.cast ?? [];
  const episodesList =
    product.episodes.length > 0 ? product.episodes : featuredFallback?.episodes ?? [];
  const galleryList =
    product.gallery.length > 0 ? product.gallery : featuredFallback?.gallery ?? [];
  const reviewsList =
    product.reviews.length > 0 ? product.reviews : featuredFallback?.reviews ?? [];

  const sortedReviews =
    sortBy === 'helpful'
      ? [...reviewsList].sort((a, b) => b.likesCount - a.likesCount)
      : [...reviewsList].reverse();

  const similarProducts = product.similarIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewBody.trim() && !reviewTitle.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      initials: 'ک‌ز',
      author: 'کاربر زد نما',
      badge: hasSpoiler ? 'حاوی اسپویلر' : 'کاربر ویژه',
      isOfficialCritic: false,
      dateLabel: 'هم‌اکنون',
      score: `${toPersianDigits(formStars * 2)}/۱۰`,
      text: reviewTitle.trim() ? `${reviewTitle.trim()} — ${reviewBody.trim()}` : reviewBody.trim(),
      likesCount: 0,
    };

    const currentReviews =
      product.reviews.length > 0 ? product.reviews : [...(featuredFallback?.reviews ?? [])];

    contentRepository.updateProduct(product.id, {
      reviews: [newReview, ...currentReviews],
    });

    setReviewTitle('');
    setReviewBody('');
    setHasSpoiler(false);
  };

  const handleLikeReview = (reviewId: string) => {
    const baseReviews =
      product.reviews.length > 0 ? product.reviews : [...(featuredFallback?.reviews ?? [])];
    const updated = baseReviews.map((r) =>
      r.id === reviewId ? { ...r, likesCount: r.likesCount + 1 } : r
    );
    contentRepository.updateProduct(product.id, { reviews: updated });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* ۱. بخش هیرو و مشخصات اصلی */}
      <section className="relative w-full overflow-hidden -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-25"
          style={{ backgroundImage: `url('${product.backdropImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface/90" />

        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-primary-container/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 end-1/3 w-80 h-80 bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-36 pb-space-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* ستون پوستر عمودی و بج‌ها */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center lg:items-start group">
              <div className="relative w-64 sm:w-72 lg:w-full aspect-[2/3] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-surface-container-low">
                {product.posterImage ? (
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={product.posterImage}
                  />
                ) : (
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={featuredFallback?.posterImage}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-black/30" />

                <div className="absolute top-space-sm inset-x-space-sm flex items-center justify-between">
                  <span className="px-space-sm py-0.5 rounded-lg bg-secondary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider font-black shadow-lg">
                    {product.exclusiveBadge}
                  </span>
                  <span className="px-space-sm py-0.5 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-sm text-label-sm font-bold shadow-md">
                    {product.qualityBadge}
                  </span>
                </div>

                <div className="absolute bottom-space-sm inset-x-space-sm flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 bg-surface-container-highest/80 backdrop-blur-sm px-2 py-0.5 rounded">
                    <span className="material-symbols-outlined text-sm text-primary">
                      surround_sound
                    </span>
                    دالبی اتموس
                  </span>
                  <span className="bg-surface-container-highest/80 backdrop-blur-sm px-2 py-0.5 rounded">
                    {product.seasonStatusBadge}
                  </span>
                </div>
              </div>

              <div className="w-64 sm:w-72 lg:w-full mt-space-md grid grid-cols-2 gap-space-sm">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('gallery');
                    document
                      .getElementById('detail-tabs')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-1.5 py-space-sm rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors font-label-md text-label-md"
                >
                  <span className="material-symbols-outlined text-lg">image</span>
                  گالری پوسترها
                </button>
                <button
                  type="button"
                  onClick={() => setModalTitle(`پیش‌نمایش: ${product.title}`)}
                  className="flex items-center justify-center gap-1.5 py-space-sm rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors font-label-md text-label-md"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  دانلود تریلر
                </button>
              </div>
            </div>

            {/* ستون مشخصات اصلی */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-space-md pt-space-xs">
              <div className="flex items-center gap-space-sm flex-wrap">
                <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-tertiary-container/30 text-tertiary shadow-sm">
                  <span className="material-symbols-outlined text-base">military_tech</span>
                  <span className="font-label-md text-label-md font-bold">
                    {product.laurelBadge}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  {product.genreBadge}
                </div>
              </div>

              <div className="space-y-space-xs">
                <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface font-black tracking-tight leading-none">
                  {product.title}
                </h1>
                <p
                  className="font-label-lg text-label-lg text-on-surface-variant/80 tracking-wide font-medium"
                  dir="ltr"
                >
                  {product.englishTitle}
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-y-space-xs gap-x-space-md text-on-surface-variant font-label-md text-label-md pt-space-xs">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-primary">schedule</span>
                  <span>{product.duration}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                  <span>{product.ageRating}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-tertiary">hd</span>
                  <span>{product.qualityBadge}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">volume_up</span>
                  <span>{product.audioBadge}</span>
                </div>
                <span className="text-outline-variant">•</span>
                <span>سال انتشار: {product.year}</span>
                <span className="text-outline-variant">•</span>
                <span className="text-primary-fixed-dim">{product.subtitleBadge}</span>
              </div>

              {/* کادر امتیازدهی */}
              <div className="flex flex-wrap items-center gap-space-lg p-space-md rounded-xl bg-surface-container-low/70 backdrop-blur-xl shadow-inner mt-space-xs">
                <div className="flex items-center gap-space-md">
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-tertiary/15 text-tertiary shadow-sm">
                    <span className="font-headline-md text-headline-md font-black leading-none">
                      {product.ratingNumeric}
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold opacity-80">
                      از ۱۰
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-tertiary">
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star_half
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {product.votesCountLabel}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-outline-variant/30" />

                <div className="flex items-center gap-space-sm">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    امتیاز شما:
                  </span>
                  <div className="flex items-center gap-1 text-outline">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const active = starValue <= userStars;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setUserStars(starValue)}
                          aria-label={`${starValue} star`}
                          className={`focus:outline-none transition-transform hover:scale-125 ${
                            active ? 'text-tertiary' : 'hover:text-tertiary'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-xl"
                            style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            star
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* دکمه‌های کنشی اصلی */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <button
                  type="button"
                  onClick={() => setModalTitle(product.title)}
                  className="relative flex items-center justify-center gap-space-sm px-space-xl py-space-md rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-headline-sm text-headline-sm font-bold shadow-[0_8px_30px_rgba(229,9,20,0.45)] hover:shadow-[0_8px_40px_rgba(229,9,20,0.7)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                  <span>تماشای آنلاین اثر</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTitle(`پیش‌نمایش رسمی: ${product.title}`)}
                  className="flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-lg text-label-lg backdrop-blur-md shadow-md transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-xl text-primary">play_circle</span>
                  <span>پیش‌نمایش رسمی (Trailer)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookmarked((b) => !b)}
                  aria-label="افزودن به لیست تماشا"
                  className={`w-12 h-12 rounded-xl bg-surface-container-high hover:bg-surface-bright flex items-center justify-center transition-colors shadow-md ${
                    bookmarked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {bookmarked ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="اشتراک گذاری"
                  className="w-12 h-12 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors shadow-md"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {shareCopied ? 'check' : 'share'}
                  </span>
                </button>
              </div>

              {/* چکیده روایت */}
              <div className="space-y-space-xs pt-space-sm">
                <h2 className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-container rounded-full" />
                  چکیده روایت
                </h2>
                <p className="font-body-md md:font-body-lg md:text-body-lg text-on-surface-variant/90 leading-relaxed text-justify max-w-4xl">
                  {product.synopsis}
                </p>
              </div>

              {/* مشخصات عوامل پشت دوربین */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md pt-space-sm">
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">
                    کارگردان
                  </span>
                  <p className="font-label-lg text-label-lg font-bold text-on-surface">
                    {product.director}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">
                    تهیه‌کننده
                  </span>
                  <p className="font-label-lg text-label-lg font-bold text-on-surface">
                    {product.producer}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">
                    فیلمنامه‌نویس
                  </span>
                  <p className="font-label-lg text-label-lg font-bold text-on-surface">
                    {product.writer}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">
                    مدیر فیلمبرداری
                  </span>
                  <p className="font-label-lg text-label-lg font-bold text-on-surface">
                    {product.cinematographer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ۲. بازیگران و عوامل اصلی */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="space-y-1">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
              <span className="w-1.5 h-5 bg-primary-container rounded-full" />
              بازیگران و شخصیت‌ها
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              ستارگان و نقش‌آفرینان محوری این شاهکار سینمایی
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="قبلی"
              className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
            <button
              type="button"
              aria-label="بعدی"
              className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
          {castList.map((actor) => (
            <div
              key={actor.id}
              className="group flex flex-col items-center text-center p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-space-sm shadow-lg ring-2 ring-transparent group-hover:ring-primary-container/40 transition-all">
                <img
                  alt={actor.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  src={actor.image}
                />
              </div>
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                {actor.name}
              </h3>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {actor.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ۳. تب‌های تعاملی اطلاعات و قسمت‌ها */}
      <section
        id="detail-tabs"
        className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl"
      >
        <div className="flex items-center gap-space-sm border-b border-surface-container-high/40 pb-space-sm mb-space-xl overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('episodes')}
            className={`px-space-lg py-space-sm rounded-xl font-label-lg text-label-lg font-bold transition-all shrink-0 ${
              activeTab === 'episodes'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            قسمت‌ها و فصل‌ها
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-space-lg py-space-sm rounded-xl font-label-lg text-label-lg font-bold transition-all shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            گالری و پشت‌صحنه
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('soundtrack')}
            className={`px-space-lg py-space-sm rounded-xl font-label-lg text-label-lg font-bold transition-all shrink-0 ${
              activeTab === 'soundtrack'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            موسیقی متن و عوامل
          </button>
        </div>

        {/* تب ۱: فهرست قسمت‌ها */}
        {activeTab === 'episodes' && (
          <div className="space-y-space-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-space-md">
                <label
                  className="font-label-lg text-label-lg font-bold text-on-surface"
                  htmlFor="season-select"
                >
                  انتخاب فصل:
                </label>
                <div className="relative inline-block">
                  <select
                    id="season-select"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="appearance-none bg-surface-container-high text-on-surface font-label-lg text-label-lg px-space-lg py-space-xs pe-space-xl rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    <option value="1">فصل ۱ (۸ قسمت کامل)</option>
                    <option value="2">فصل ۲ (در حال پخش - قسمت ۴)</option>
                  </select>
                  <span className="material-symbols-outlined absolute end-2 top-2.5 text-on-surface-variant pointer-events-none text-base">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="text-on-surface-variant font-body-sm text-body-sm">
                نمایش تمام قسمت‌های منتشر شده با کیفیت 4K HDR و صدای فراگیر
              </div>
            </div>

            <div className="space-y-space-md">
              {episodesList.map((ep) => (
                <div
                  key={ep.id}
                  className="group flex flex-col md:flex-row items-start md:items-center gap-space-md p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300"
                >
                  <div className="relative w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-surface-container-high shrink-0">
                    <img
                      alt={ep.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={ep.image}
                    />
                    <button
                      type="button"
                      onClick={() => setModalTitle(ep.title)}
                      aria-label={ep.title}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg">
                        <span
                          className="material-symbols-outlined text-2xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </span>
                    </button>
                    <span className="absolute bottom-2 end-2 px-2 py-0.5 rounded bg-black/75 text-on-surface font-label-sm text-label-sm">
                      {ep.duration}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-headline-sm text-headline-sm font-black text-primary">
                        {ep.number}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                        {ep.title}
                      </h3>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      {ep.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-space-sm w-full md:w-auto justify-end pt-space-xs md:pt-0">
                    <button
                      type="button"
                      onClick={() => setModalTitle(ep.title)}
                      className="px-space-md py-space-sm rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">play_circle</span>
                      پخش
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalTitle(`دانلود: ${ep.title}`)}
                      aria-label={`دانلود ${ep.title}`}
                      className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تب ۲: گالری */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {galleryList.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-video rounded-xl overflow-hidden bg-surface-container-low shadow-lg"
              >
                <img
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-space-sm">
                  <span className="font-label-md text-label-md text-on-surface">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* تب ۳: موسیقی متن */}
        {activeTab === 'soundtrack' && (
          <div className="space-y-space-md">
            <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-20 h-20 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-4xl">album</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {product.soundtrackTitle}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {product.soundtrackDetails}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalTitle(product.soundtrackTitle)}
                className="px-space-lg py-space-sm rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">headphones</span>
                شنیدن آلبوم کامل
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ۴. بخش نقد و دیدگاه‌های تماشاگران */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* فرم ارسال دیدگاه */}
          <div className="lg:col-span-5 p-space-lg rounded-xl bg-surface-container-low space-y-space-md shadow-lg">
            <div className="space-y-1">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary-container rounded-full" />
                ثبت دیدگاه و نقد سینمایی
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                نظر و تحلیل شما به جامعه سینمادوستان زد نما کمک می‌کند.
              </p>
            </div>

            <form className="space-y-space-md" onSubmit={handleSubmitReview}>
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  امتیاز کلی شما به اثر:
                </label>
                <div className="flex items-center gap-2 text-tertiary">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormStars(s)}
                      aria-label={`امتیاز ${s}`}
                      className="focus:outline-none"
                    >
                      <span
                        className="material-symbols-outlined text-2xl cursor-pointer"
                        style={{
                          fontVariationSettings: s <= formStars ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="font-label-lg text-label-lg font-bold text-on-surface ms-2">
                    {toPersianDigits(formStars * 2)} از ۱۰
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="font-label-md text-label-md text-on-surface-variant"
                  htmlFor="review-title"
                >
                  تیتر یا خلاصه نقد:
                </label>
                <input
                  id="review-title"
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="مثال: شاهکاری در فضاسازی صوتی و بصری..."
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
                />
              </div>

              <div className="space-y-1">
                <label
                  className="font-label-md text-label-md text-on-surface-variant"
                  htmlFor="review-body"
                >
                  متن کامل دیدگاه:
                </label>
                <textarea
                  id="review-body"
                  rows={4}
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  placeholder="دیدگاه خود را با احترام و بدون لو دادن داستان (Spoiler) بنویسید..."
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-label-sm text-label-sm text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={hasSpoiler}
                    onChange={(e) => setHasSpoiler(e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-container-high text-primary-container focus:ring-0 cursor-pointer"
                  />
                  <span>حاوی اسپویلر (لو رفتن قصه)</span>
                </label>
                <button
                  type="submit"
                  className="px-space-lg py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md transition-all"
                >
                  ارسال نقد
                </button>
              </div>
            </form>
          </div>

          {/* فهرست دیدگاه‌ها */}
          <div className="lg:col-span-7 space-y-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                دیدگاه‌های منتخب (۲۴۸ نظر)
              </h3>
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                <span>مرتب‌سازی:</span>
                <button
                  type="button"
                  onClick={() => setSortBy('helpful')}
                  className={
                    sortBy === 'helpful'
                      ? 'text-primary font-bold'
                      : 'hover:text-on-surface transition-colors'
                  }
                >
                  مفیدترین
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setSortBy('latest')}
                  className={
                    sortBy === 'latest'
                      ? 'text-primary font-bold'
                      : 'hover:text-on-surface transition-colors'
                  }
                >
                  تازه‌ترین‌ها
                </button>
              </div>
            </div>

            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold ${
                        review.isOfficialCritic ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">
                          {review.author}
                        </span>
                        <span
                          className={
                            review.isOfficialCritic
                              ? 'px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-label-sm text-label-sm font-semibold'
                              : 'px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm'
                          }
                        >
                          {review.badge}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant/70">
                        {review.dateLabel}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-tertiary">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-md text-label-md font-bold">{review.score}</span>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {review.text}
                </p>

                <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
                  <button
                    type="button"
                    onClick={() => handleLikeReview(review.id)}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">thumb_up</span>
                    <span>{toPersianDigits(review.likesCount)} موافق</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">reply</span>
                    <span>پاسخ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ۵. اسلایدر آثار مشابه و پیشنهادی */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-md pb-space-2xl">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="space-y-1">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
              <span className="w-1.5 h-5 bg-primary-container rounded-full" />
              عناوین مشابه و پیشنهادهای منتخب
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              اگر این اثر را دوست داشتید، تماشای این شاهکارهای روانشناختی را از دست ندهید
            </p>
          </div>
          <Link
            className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
            to="/series"
          >
            <span>مشاهده همه</span>
            <span className="material-symbols-outlined text-base">arrow_left</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
          {similarProducts.map((item) => (
            <PosterCard key={item.id} product={item} variant="similar" />
          ))}
        </div>
      </section>

      <TrailerModal
        isOpen={Boolean(modalTitle)}
        title={modalTitle ?? ''}
        subtitle={product.englishTitle}
        onClose={() => setModalTitle(null)}
      />
    </div>
  );
}
