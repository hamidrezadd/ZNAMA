import { STITCH_ASSETS } from '../content/assets';
import { INITIAL_SEED_DATA } from '../content/seed';
import {
  AboutPageContent,
  HomePageContent,
  NewsItem,
  ProductItem,
  SiteContent,
  SiteDatabase,
  StaticPageContent,
  SubscriptionPageContent,
} from '../content/types';

export type PageSlug = 'home' | 'subscription' | 'about-us' | StaticPageContent['slug'];

export type PageDataMap = {
  home: HomePageContent;
  subscription: SubscriptionPageContent;
  'about-us': AboutPageContent;
  series: StaticPageContent;
  news: StaticPageContent;
  'contact-us': StaticPageContent;
  profile: StaticPageContent;
  terms: StaticPageContent;
  privacy: StaticPageContent;
  help: StaticPageContent;
};

export interface ContentRepository {
  getSite(): SiteContent;
  updateSite(data: SiteContent): void;

  getPage<K extends PageSlug>(slug: K): PageDataMap[K];
  updatePage<K extends PageSlug>(slug: K, data: PageDataMap[K]): void;

  listProducts(): ProductItem[];
  getProduct(idOrSlug: string): ProductItem | undefined;
  updateProduct(id: string, data: Partial<ProductItem>): void;
  createProduct(data: ProductItem): void;
  deleteProduct(id: string): void;

  listNews(): NewsItem[];
  updateNews(items: NewsItem[]): void;

  resetAll(): void;
  subscribe(listener: () => void): () => void;
}

const STORAGE_KEY = 'znama_content_repository_v1';

class LocalStorageContentRepository implements ContentRepository {
  private store: SiteDatabase;
  private listeners = new Set<() => void>();

  constructor() {
    this.store = this.load();
  }

  private cloneSeed(): SiteDatabase {
    return JSON.parse(JSON.stringify(INITIAL_SEED_DATA)) as SiteDatabase;
  }

  private load(): SiteDatabase {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seeded = this.cloneSeed();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        return seeded;
      }
      const parsed = JSON.parse(raw) as SiteDatabase;
      if (
        parsed.site?.profileAvatar &&
        parsed.site.profileAvatar.startsWith('https://lh3.googleusercontent.com/aida/ALJJyrAa')
      ) {
        parsed.site.profileAvatar = STITCH_ASSETS.profileAvatar;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return this.cloneSeed();
    }
  }

  private persist(): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.store));
    } catch {
      // Ignore storage quota errors in constrained environments
    }
    this.listeners.forEach((listener) => listener());
  }

  getSite(): SiteContent {
    return this.store.site;
  }

  updateSite(data: SiteContent): void {
    this.store = { ...this.store, site: data };
    this.persist();
  }

  getPage<K extends PageSlug>(slug: K): PageDataMap[K] {
    if (slug === 'home') {
      return this.store.home as PageDataMap[K];
    }
    if (slug === 'subscription') {
      return this.store.subscription as PageDataMap[K];
    }
    if (slug === 'about-us') {
      return this.store.aboutUs as PageDataMap[K];
    }
    return (this.store.staticPages[slug] ?? INITIAL_SEED_DATA.staticPages[slug]) as PageDataMap[K];
  }

  updatePage<K extends PageSlug>(slug: K, data: PageDataMap[K]): void {
    if (slug === 'home') {
      this.store = { ...this.store, home: data as HomePageContent };
    } else if (slug === 'subscription') {
      this.store = { ...this.store, subscription: data as SubscriptionPageContent };
    } else if (slug === 'about-us') {
      this.store = { ...this.store, aboutUs: data as AboutPageContent };
    } else {
      this.store = {
        ...this.store,
        staticPages: {
          ...this.store.staticPages,
          [slug]: data as StaticPageContent,
        },
      };
    }
    this.persist();
  }

  listProducts(): ProductItem[] {
    return this.store.products;
  }

  getProduct(idOrSlug: string): ProductItem | undefined {
    return this.store.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  }

  updateProduct(id: string, data: Partial<ProductItem>): void {
    this.store = {
      ...this.store,
      products: this.store.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    };
    this.persist();
  }

  createProduct(data: ProductItem): void {
    this.store = {
      ...this.store,
      products: [data, ...this.store.products],
    };
    this.persist();
  }

  deleteProduct(id: string): void {
    this.store = {
      ...this.store,
      products: this.store.products.filter((p) => p.id !== id),
    };
    this.persist();
  }

  listNews(): NewsItem[] {
    return this.store.news;
  }

  updateNews(items: NewsItem[]): void {
    this.store = { ...this.store, news: items };
    this.persist();
  }

  resetAll(): void {
    this.store = this.cloneSeed();
    this.persist();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const contentRepository: ContentRepository = new LocalStorageContentRepository();
