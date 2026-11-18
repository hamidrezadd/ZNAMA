import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../content/types';

interface PosterCardProps {
  product: ProductItem;
  variant: 'new-release' | 'top-ranked' | 'similar';
}

export function PosterCard({ product, variant }: PosterCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  if (variant === 'similar') {
    return (
      <Link className="group flex flex-col space-y-space-xs" to={`/movies/${product.slug}`}>
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-container-low shadow-md">
          {product.posterImage ? (
            <img
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={product.posterImage}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-surface-container-high/40 via-surface-container-low to-surface-container-lowest flex items-center justify-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant/60 tracking-widest uppercase">
                POSTER SLOT
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </span>
          </div>
          <span className="absolute top-2 start-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 text-tertiary font-label-sm text-label-sm font-bold">
            {product.rating}
          </span>
        </div>
        <h3 className="font-label-lg text-label-lg font-bold text-on-surface group-hover:text-primary transition-colors truncate">
          {product.title}
        </h3>
        <span className="font-body-sm text-body-sm text-on-surface-variant/70 truncate">
          {product.genre} • {product.year}
        </span>
      </Link>
    );
  }

  if (variant === 'top-ranked') {
    const isRankOne = product.rankNumber === 1;
    return (
      <div className="relative flex items-end group">
        <span
          className="absolute -bottom-4 start-0 font-display-hero text-[110px] leading-none font-black text-surface-container-highest/70 select-none pointer-events-none group-hover:text-primary-container/40 transition-colors z-0"
          dir="ltr"
        >
          {product.rankNumber ?? ''}
        </span>
        <Link
          to={`/movies/${product.slug}`}
          className="relative z-10 w-full me-4 bg-surface-container-low rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 block"
        >
          <div className="aspect-[2/3] bg-surface-container flex flex-col justify-between p-3 relative overflow-hidden">
            {product.posterImage ? (
              <img
                src={product.posterImage}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container/60 to-surface-container-high/40" />
            <span
              className={
                isRankOne
                  ? 'relative z-10 self-start px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm'
                  : 'relative z-10 self-start px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm'
              }
            >
              {product.rankTag || product.exclusiveBadge}
            </span>
            <div className="relative z-10 flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface group-hover:bg-primary-container transition-colors">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                CINEMA POSTER
              </span>
            </div>
            <div className="relative z-10 flex justify-between font-label-sm text-label-sm text-tertiary">
              <span>امتیاز {product.rating}</span>
              <span className="text-on-surface-variant">{product.qualityBadge}</span>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-low">
            <h3 className="font-label-lg text-label-lg font-bold text-on-surface truncate group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <span className="font-body-sm text-body-sm text-on-surface-variant/70 block truncate">
              {product.genre} | {product.duration}
            </span>
          </div>
        </Link>
      </div>
    );
  }

  // Default: 'new-release'
  const isExclusiveRed = product.exclusiveBadge === 'انحصاری زد نما';
  const isFestivalGold = product.exclusiveBadge === 'منتخب فستیوال';

  return (
    <div className="group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5">
      <Link
        to={`/movies/${product.slug}`}
        className="relative w-full aspect-[2/3] bg-surface-container-low flex flex-col items-center justify-between p-3 overflow-hidden"
      >
        {product.posterImage ? (
          <img
            src={product.posterImage}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-high/40 via-surface-container-low to-surface-container-lowest opacity-90" />

        <div className="absolute inset-y-0 start-1 w-2 flex flex-col justify-between py-2 opacity-20 pointer-events-none">
          <span className="w-1 h-2 bg-on-surface rounded-xs" />
          <span className="w-1 h-2 bg-on-surface rounded-xs" />
          <span className="w-1 h-2 bg-on-surface rounded-xs" />
          <span className="w-1 h-2 bg-on-surface rounded-xs" />
          <span className="w-1 h-2 bg-on-surface rounded-xs" />
        </div>

        <div className="relative z-10 w-full flex items-center justify-between gap-1">
          <span
            className={
              isExclusiveRed
                ? 'px-2 py-0.5 rounded bg-secondary-container text-on-primary-container font-label-sm text-label-sm font-bold'
                : isFestivalGold
                ? 'px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm font-semibold'
                : 'px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold'
            }
          >
            {product.exclusiveBadge}
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-highest/90 text-tertiary font-label-sm text-label-sm">
            <span
              className="material-symbols-outlined text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            {product.rating}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-all group-hover:scale-110 shadow-lg">
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant/80 tracking-widest uppercase">
            POSTER SLOT
          </span>
        </div>

        <div className="relative z-10 w-full flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span>{product.year}</span>
          <span>{product.qualityBadge}</span>
        </div>
      </Link>

      <div className="p-space-sm flex flex-col gap-1 bg-surface-container-lowest">
        <div className="flex items-center justify-between gap-2">
          <Link to={`/movies/${product.slug}`} className="min-w-0 flex-1">
            <h3 className="font-label-lg text-label-lg font-bold text-on-surface truncate group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
          <button
            type="button"
            onClick={() => setBookmarked((b) => !b)}
            aria-label="نشان کردن"
            className={
              bookmarked
                ? 'text-primary transition-colors'
                : 'text-on-surface-variant hover:text-primary transition-colors'
            }
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant/70 truncate">
          <span>{product.genre}</span>
          <span>•</span>
          <span>{product.duration}</span>
        </div>
      </div>
    </div>
  );
}
