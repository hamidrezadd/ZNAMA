import { Link } from 'react-router-dom';
import { ContinueWatchingItem } from '../content/types';

interface ContinueWatchingCardProps {
  item: ContinueWatchingItem;
  onPlay?: () => void;
}

export function ContinueWatchingCard({ item, onPlay }: ContinueWatchingCardProps) {
  return (
    <div className="group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <Link
        to={`/movies/${item.slug}`}
        className="relative aspect-video w-full bg-surface-container-highest/60 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-low to-surface-container-high opacity-80" />
        <svg
          className="w-12 h-12 text-outline/30 group-hover:text-primary-container transition-colors duration-300 relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span className="absolute bottom-2 start-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-on-surface-variant font-label-sm text-label-sm z-10">
          {item.episodeLabel}
        </span>
        <span className="absolute top-2 end-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-on-surface-variant font-label-sm text-label-sm z-10">
          {item.remainingLabel}
        </span>
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-surface-container-highest z-10">
          <div
            className="h-full bg-primary-container shadow-[0_0_8px_rgba(229,9,20,0.8)]"
            style={{ width: `${item.progressPercent}%` }}
          />
        </div>
      </Link>

      <div className="p-space-md flex items-center justify-between gap-space-sm">
        <Link to={`/movies/${item.slug}`} className="min-w-0">
          <h3 className="font-label-lg text-label-lg font-bold text-on-surface group-hover:text-primary transition-colors truncate">
            {item.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant/70 truncate">
            {item.subtitle}
          </p>
        </Link>
        <button
          type="button"
          onClick={onPlay}
          aria-label="پخش"
          className="w-9 h-9 rounded-full bg-surface-container-high group-hover:bg-primary-container text-on-surface group-hover:text-on-primary-container flex items-center justify-center transition-all duration-200 shrink-0"
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </button>
      </div>
    </div>
  );
}
