export interface NavLinkItem {
  path: string;
  label: string;
}

export interface SiteContent {
  brandEn: string;
  brandFa: string;
  ctaLabel: string;
  ctaPath: string;
  profileAvatar: string;
  navLinks: NavLinkItem[];
  footerDescription: string;
  instagramHandle: string;
  instagramUrl: string;
  footerSectionsTitle: string;
  footerSectionLinks: NavLinkItem[];
  footerSupportTitle: string;
  footerSupportLinks: NavLinkItem[];
  footerHighlightTag: string;
  footerHighlightTitle: string;
  footerHighlightSubtitle: string;
  copyrightText: string;
  serverStatusText: string;
  platformTagEn: string;
}

export interface ContinueWatchingItem {
  id: string;
  title: string;
  subtitle: string;
  episodeLabel: string;
  remainingLabel: string;
  progressPercent: number;
  slug: string;
}

export interface CuratorPickItem {
  id: string;
  badge: string;
  typeLabel: string;
  year: string;
  title: string;
  description: string;
  ctaLabel: string;
  qualityLabel: string;
  slug: string;
}

export interface HomePageContent {
  hero: {
    exclusiveBadge: string;
    ratingText: string;
    ratingSubtext: string;
    qualityBadge: string;
    ageBadge: string;
    title: string;
    englishTitle: string;
    yearLabel: string;
    genresLabel: string;
    durationLabel: string;
    audioLabel: string;
    synopsis: string;
    directorLabel: string;
    directorName: string;
    castLabel: string;
    castNames: string;
    primaryCta: string;
    secondaryCta: string;
    bookmarkAriaLabel: string;
    scopeWatermark: string;
    featuredSlug: string;
  };
  continueWatching: {
    sectionTitle: string;
    countLabel: string;
    items: ContinueWatchingItem[];
  };
  newReleases: {
    sectionTitle: string;
    sectionSubtitle: string;
    productIds: string[];
  };
  topRanked: {
    sectionTitle: string;
    viewAllLabel: string;
    productIds: string[];
  };
  curatorChoice: {
    sectionTitle: string;
    sectionSubtitle: string;
    badgeLabel: string;
    items: CuratorPickItem[];
  };
  promoStrip: {
    badgeLabel: string;
    headline: string;
    description: string;
    features: string[];
    priceHint: string;
    priceValue: string;
    priceUnit: string;
    ctaLabel: string;
  };
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface EpisodeItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
  image: string;
  season: number;
}

export interface GalleryItem {
  id: string;
  caption: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  initials: string;
  author: string;
  badge: string;
  isOfficialCritic: boolean;
  dateLabel: string;
  score: string;
  text: string;
  likesCount: number;
}

export interface ProductItem {
  id: string;
  slug: string;
  type: 'movie' | 'series';
  title: string;
  englishTitle: string;
  year: string;
  genre: string;
  duration: string;
  ageRating: string;
  qualityBadge: string;
  audioBadge: string;
  seasonStatusBadge: string;
  subtitleBadge: string;
  exclusiveBadge: string;
  laurelBadge: string;
  genreBadge: string;
  rating: string;
  ratingNumeric: string;
  votesCountLabel: string;
  synopsis: string;
  director: string;
  producer: string;
  writer: string;
  cinematographer: string;
  backdropImage: string;
  posterImage: string;
  rankNumber?: number;
  rankTag?: string;
  categoryShelf: 'new-release' | 'top-ranked' | 'similar' | 'series';
  cast: CastMember[];
  episodes: EpisodeItem[];
  gallery: GalleryItem[];
  soundtrackTitle: string;
  soundtrackDetails: string;
  reviews: ReviewItem[];
  similarIds: string[];
}

export interface SubscriptionPlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  tag: string;
  tagIcon?: string;
  discountBadge?: string;
  title: string;
  subtitle: string;
  originalPrice?: string;
  monthlyPrice: string;
  annualPrice: string;
  unitLabel: string;
  perMonthHint: string;
  ctaLabel: string;
  featured: boolean;
  featuredTopBadge?: string;
  features: SubscriptionPlanFeature[];
}

export interface ComparisonRow {
  feature: string;
  freeValue: string;
  freeType: 'text' | 'negative-text' | 'close';
  vipValue: string;
  vipType: 'primary-text' | 'tertiary-verified' | 'on-surface-text' | 'check' | 'tertiary-text';
}

export interface TrustCard {
  icon: string;
  iconStyle: 'primary' | 'tertiary' | 'neutral';
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SubscriptionPageContent {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    monthlyToggleLabel: string;
    annualToggleLabel: string;
    annualDiscountBadge: string;
  };
  plans: SubscriptionPlan[];
  immersionBanner: {
    image: string;
    eyebrow: string;
    title: string;
    description: string;
    devices: { icon: string; label: string }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    subtitle: string;
    colFeature: string;
    colFree: string;
    colVip: string;
    rows: ComparisonRow[];
  };
  trustCards: TrustCard[];
  gatewaysLabel: string;
  gateways: string[];
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    contactLabel: string;
    scrollLabel: string;
  };
}

export interface AboutStat {
  id: string;
  value: string;
  numericTarget?: number;
  suffix?: string;
  label: string;
  colorClass: string;
}

export interface AboutPillar {
  code: string;
  icon: string;
  accentType: 'primary' | 'tertiary' | 'secondary' | 'neutral';
  title: string;
  description: string;
  footerLabel: string;
}

export interface AboutPageContent {
  hero: {
    badgeEn: string;
    badgeFa: string;
    headlineLine1: string;
    headlineLine2: string;
    quoteParagraph1: string;
    quoteParagraph2: string;
    quoteClosing: string;
    establishedLabel: string;
    stats: AboutStat[];
  };
  founder: {
    portrait: string;
    badgeEn: string;
    eyebrow: string;
    name: string;
    role: string;
    paragraph1: string;
    highlightQuote: string;
    paragraph3: string;
    noteTitle: string;
    noteDate: string;
    signature: string;
  };
  values: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: AboutPillar[];
  };
  curationShowcase: {
    eyebrow: string;
    title: string;
    description: string;
    badges: { icon: string; label: string; color: 'primary' | 'tertiary' }[];
    image: string;
    cardTitle: string;
    cardSubtitle: string;
  };
  communityBanner: {
    eyebrow: string;
    title: string;
    description: string;
    ctaTitle: string;
    ctaHandle: string;
    instagramUrl: string;
    statusText: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  image: string;
}

export interface StaticPageContent {
  slug: 'terms' | 'privacy' | 'help' | 'contact-us' | 'news' | 'series' | 'profile';
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}

export interface SiteDatabase {
  site: SiteContent;
  home: HomePageContent;
  products: ProductItem[];
  subscription: SubscriptionPageContent;
  aboutUs: AboutPageContent;
  news: NewsItem[];
  staticPages: Record<string, StaticPageContent>;
}
