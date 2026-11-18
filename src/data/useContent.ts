import { useEffect, useState } from 'react';
import { contentRepository, PageDataMap, PageSlug } from './ContentRepository';
import { NewsItem, ProductItem, SiteContent } from '../content/types';

export function useRepositoryVersion(): number {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    return contentRepository.subscribe(() => {
      setVersion((v) => v + 1);
    });
  }, []);

  return version;
}

export function useSiteContent(): SiteContent {
  useRepositoryVersion();
  return contentRepository.getSite();
}

export function usePageContent<K extends PageSlug>(slug: K): PageDataMap[K] {
  useRepositoryVersion();
  return contentRepository.getPage(slug);
}

export function useProducts(): ProductItem[] {
  useRepositoryVersion();
  return contentRepository.listProducts();
}

export function useProduct(idOrSlug: string): ProductItem | undefined {
  useRepositoryVersion();
  return contentRepository.getProduct(idOrSlug);
}

export function useNews(): NewsItem[] {
  useRepositoryVersion();
  return contentRepository.listNews();
}
