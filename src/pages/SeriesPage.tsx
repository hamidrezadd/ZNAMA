import { Link } from 'react-router-dom';
import { CuratorCard } from '../components/CuratorCard';
import { PosterCard } from '../components/PosterCard';
import { usePageContent, useProducts } from '../data/useContent';

export function SeriesPage() {
  const page = usePageContent('series');
  const home = usePageContent('home');
  const products = useProducts();

  const seriesAndFeatured = products.filter((p) => p.type === 'series' || p.categoryShelf === 'new-release');

  return (
    <div className="flex flex-col w-full text-on-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
      <div className="mb-space-xl">
        <div className="flex items-center gap-space-sm mb-space-xs">
          <span className="w-1.5 h-6 bg-primary-container rounded-full" />
          <h1 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
            {page.title}
          </h1>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">{page.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-space-2xl">
        {home.curatorChoice.items.map((item) => (
          <CuratorCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-space-md">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
          آرشیو سریال‌ها و آثار شاخص
        </h2>
        <Link
          to="/movies"
          className="font-label-md text-label-md text-primary hover:text-on-surface transition-colors"
        >
          مشاهده اثر ویژه هفته
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter pb-space-xl">
        {seriesAndFeatured.map((item) => (
          <PosterCard
            key={item.id}
            product={item}
            variant={item.posterImage ? 'similar' : 'new-release'}
          />
        ))}
      </div>
    </div>
  );
}
