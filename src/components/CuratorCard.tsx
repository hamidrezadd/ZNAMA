import { Link } from 'react-router-dom';
import { CuratorPickItem } from '../content/types';

interface CuratorCardProps {
  item: CuratorPickItem;
  onPreview?: () => void;
}

export function CuratorCard({ item, onPreview }: CuratorCardProps) {
  return (
    <div className="group relative flex flex-col lg:flex-row bg-surface-container-low rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      <Link
        to={`/movies/${item.slug}`}
        className="relative w-full lg:w-3/5 aspect-video bg-surface-container flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-surface-container-low via-surface-container-low/40 to-transparent z-10" />
        <svg
          className="w-16 h-16 text-outline/25 group-hover:scale-110 group-hover:text-primary-container transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect height="20" rx="2" strokeWidth="1.5" width="20" x="2" y="2" />
          <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-3 start-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/80 text-tertiary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-sm">emoji_events</span>
          <span>{item.badge}</span>
        </div>
      </Link>

      <div className="w-full lg:w-2/5 p-space-lg flex flex-col justify-between">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-outline-variant font-label-sm text-label-sm">
            <span className="text-tertiary font-semibold">{item.typeLabel}</span>
            <span>{item.year}</span>
          </div>
          <Link to={`/movies/${item.slug}`}>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="pt-space-md flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md transition-all"
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            <span>{item.ctaLabel}</span>
          </button>
          <span className="font-label-sm text-label-sm text-on-surface-variant/60">
            {item.qualityLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
