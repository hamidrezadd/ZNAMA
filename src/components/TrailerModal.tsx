interface TrailerModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export function TrailerModal({ isOpen, title, subtitle, onClose }: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-margin-mobile"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-4xl rounded-xl bg-surface-container-low overflow-hidden shadow-[0_24px_80px_rgba(229,9,20,0.28)]">
        <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container">
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {title}
            </h3>
            {subtitle && (
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {subtitle}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن پخش‌کننده"
            className="w-9 h-9 rounded-xl bg-surface-container-high hover:bg-primary-container text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="relative aspect-video bg-surface-container-lowest flex flex-col items-center justify-center gap-space-md p-space-xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.18),transparent_70%)] pointer-events-none" />
          <div className="relative w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_40px_rgba(229,9,20,0.6)]">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </div>
          <div className="relative space-y-1 max-w-lg">
            <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
              پیش‌نمایش استریم 4K HDR زد نما
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              پخش آنلاین با صدای فراگیر دالبی دیجیتال و زیرنویس اختصاصی آماده اجرا است.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
