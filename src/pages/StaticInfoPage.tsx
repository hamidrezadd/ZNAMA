import { usePageContent } from '../data/useContent';

interface StaticInfoPageProps {
  slug: 'terms' | 'privacy' | 'help';
}

export function StaticInfoPage({ slug }: StaticInfoPageProps) {
  const page = usePageContent(slug);

  return (
    <div className="flex flex-col w-full text-on-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl pb-space-2xl">
      <div className="max-w-4xl mx-auto w-full space-y-space-lg">
        <div>
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-1.5 h-6 bg-primary-container rounded-full" />
            <h1 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
              {page.title}
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">{page.subtitle}</p>
        </div>

        <div className="space-y-space-md">
          {page.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-space-lg rounded-xl bg-surface-container-low space-y-space-xs shadow-md"
            >
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {sec.heading}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
