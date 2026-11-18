import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../data/useContent';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const products = useProducts();

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.englishTitle.toLowerCase().includes(trimmed) ||
          p.genre.toLowerCase().includes(trimmed) ||
          p.director.toLowerCase().includes(trimmed)
      )
    : products.slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-[100] bg-surface-container-lowest/90 backdrop-blur-2xl flex flex-col pt-24 px-margin-mobile md:px-margin-tablet lg:px-margin overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="جستجو در زد نما"
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-space-lg pb-space-2xl">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-tertiary tracking-wider">
            جستجوی آثار مستقل و سینمایی
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جستجو"
            className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-primary-container text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute start-4 top-1/2 -translate-y-1/2 text-primary text-2xl">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام فیلم، سریال، کارگردان یا ژانر را بنویسید..."
            className="w-full ps-14 pe-4 py-4 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 font-body-lg text-body-lg focus:outline-none focus:ring-2 focus:ring-primary-container shadow-xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
          {matches.map((item) => (
            <Link
              key={item.id}
              to={`/movies/${item.slug}`}
              onClick={onClose}
              className="group flex items-center gap-space-md p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors"
            >
              <div className="w-14 aspect-[2/3] rounded-lg bg-surface-container-highest overflow-hidden shrink-0 flex items-center justify-center">
                {item.posterImage ? (
                  <img
                    src={item.posterImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-outline/50">movie</span>
                )}
              </div>
              <div className="min-w-0 flex flex-col gap-0.5">
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface group-hover:text-primary truncate">
                  {item.title}
                </h4>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {item.genre} • {item.year}
                </span>
                <span className="font-label-sm text-label-sm text-tertiary">
                  امتیاز {item.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-space-xl text-on-surface-variant font-body-md">
            اثری با این عبارت یافت نشد.
          </div>
        )}
      </div>
    </div>
  );
}
