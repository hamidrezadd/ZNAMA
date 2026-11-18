import { useNews, usePageContent } from '../data/useContent';

export function NewsPage() {
  const page = usePageContent('news');
  const news = useNews();

  return (
    <div className="flex flex-col w-full text-on-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl pb-space-2xl">
      <div className="mb-space-xl">
        <div className="flex items-center gap-space-sm mb-space-xs">
          <span className="w-1.5 h-6 bg-primary-container rounded-full" />
          <h1 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
            {page.title}
          </h1>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">{page.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {news.map((item) => (
          <article
            key={item.id}
            className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-lg hover:bg-surface-container transition-colors"
          >
            <div className="relative aspect-video bg-surface-container-highest overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 start-3 px-2.5 py-0.5 rounded bg-secondary-container text-on-primary-container font-label-sm text-label-sm font-bold">
                {item.category}
              </span>
            </div>
            <div className="p-space-lg flex flex-col gap-space-sm flex-1">
              <span className="font-label-sm text-label-sm text-tertiary">{item.date}</span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {item.title}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {item.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
