import { FormEvent, useEffect, useState } from 'react';
import { HomePageContent } from '../content/types';
import { contentRepository } from '../data/ContentRepository';
import { usePageContent } from '../data/useContent';

export function AdminHomeEditor() {
  const current = usePageContent('home');
  const [form, setForm] = useState<HomePageContent>(current);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(current);
  }, [current]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    contentRepository.updatePage('home', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-space-xl pb-space-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-md text-headline-md font-black text-on-surface">
            ویرایش صفحه خانه
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            متن هیرو، قفسه ادامه تماشا، برگزیده‌های کیوریتورها و بنر اشتراک را ویرایش کنید.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          {saved && (
            <span className="px-3 py-1.5 rounded-lg bg-tertiary/20 text-tertiary font-label-md text-label-md">
              تغییرات ذخیره شد
            </span>
          )}
          <button
            type="submit"
            className="px-space-lg py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md transition-colors"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>

      {/* Hero Section Fields */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          بخش اصلی هیرو (Hero)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              عنوان اصلی فیلم
            </span>
            <input
              type="text"
              value={form.hero.title}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, title: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              عنوان انگلیسی
            </span>
            <input
              type="text"
              dir="ltr"
              value={form.hero.englishTitle}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, englishTitle: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              نشان اختصاصی بالا
            </span>
            <input
              type="text"
              value={form.hero.exclusiveBadge}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, exclusiveBadge: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              امتیاز منتقدان
            </span>
            <input
              type="text"
              value={form.hero.ratingText}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, ratingText: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">کارگردان</span>
            <input
              type="text"
              value={form.hero.directorName}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, directorName: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">بازیگران</span>
            <input
              type="text"
              value={form.hero.castNames}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, castNames: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>
        </div>

        <label className="space-y-1 block">
          <span className="font-label-md text-label-md text-on-surface-variant">
            خلاصه داستان هیرو
          </span>
          <textarea
            rows={3}
            value={form.hero.synopsis}
            onChange={(e) =>
              setForm({ ...form, hero: { ...form.hero, synopsis: e.target.value } })
            }
            className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </label>
      </div>

      {/* Section Headings */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          عناوین قفسه‌های صفحه خانه
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              عنوان قفسه ادامه تماشا
            </span>
            <input
              type="text"
              value={form.continueWatching.sectionTitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  continueWatching: { ...form.continueWatching, sectionTitle: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              عنوان قفسه فیلم‌های تازه
            </span>
            <input
              type="text"
              value={form.newReleases.sectionTitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  newReleases: { ...form.newReleases, sectionTitle: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              عنوان قفسه آثار برتر هفته
            </span>
            <input
              type="text"
              value={form.topRanked.sectionTitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  topRanked: { ...form.topRanked, sectionTitle: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              عنوان قفسه انتخاب کیوریتورها
            </span>
            <input
              type="text"
              value={form.curatorChoice.sectionTitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  curatorChoice: { ...form.curatorChoice, sectionTitle: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </label>
        </div>
      </div>

      {/* Continue Watching Items */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          آیتم‌های ادامه تماشا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {form.continueWatching.items.map((item, idx) => (
            <div key={item.id} className="p-space-md rounded-xl bg-surface-container space-y-space-sm">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const items = [...form.continueWatching.items];
                  items[idx] = { ...item, title: e.target.value };
                  setForm({
                    ...form,
                    continueWatching: { ...form.continueWatching, items },
                  });
                }}
                className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg"
                placeholder="عنوان"
              />
              <input
                type="text"
                value={item.subtitle}
                onChange={(e) => {
                  const items = [...form.continueWatching.items];
                  items[idx] = { ...item, subtitle: e.target.value };
                  setForm({
                    ...form,
                    continueWatching: { ...form.continueWatching, items },
                  });
                }}
                className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant font-body-sm"
                placeholder="توضیح کوتاه"
              />
              <div className="grid grid-cols-2 gap-space-xs">
                <input
                  type="text"
                  value={item.episodeLabel}
                  onChange={(e) => {
                    const items = [...form.continueWatching.items];
                    items[idx] = { ...item, episodeLabel: e.target.value };
                    setForm({
                      ...form,
                      continueWatching: { ...form.continueWatching, items },
                    });
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant font-label-sm"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={item.progressPercent}
                  onChange={(e) => {
                    const items = [...form.continueWatching.items];
                    items[idx] = { ...item, progressPercent: Number(e.target.value) };
                    setForm({
                      ...form,
                      continueWatching: { ...form.continueWatching, items },
                    });
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant font-label-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Strip */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          بنر اشتراک ویژه صفحه خانه
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block md:col-span-2">
            <span className="font-label-md text-label-md text-on-surface-variant">تیتر بنر</span>
            <input
              type="text"
              value={form.promoStrip.headline}
              onChange={(e) =>
                setForm({
                  ...form,
                  promoStrip: { ...form.promoStrip, headline: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">مبلغ</span>
            <input
              type="text"
              value={form.promoStrip.priceValue}
              onChange={(e) =>
                setForm({
                  ...form,
                  promoStrip: { ...form.promoStrip, priceValue: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">متن دکمه</span>
            <input
              type="text"
              value={form.promoStrip.ctaLabel}
              onChange={(e) =>
                setForm({
                  ...form,
                  promoStrip: { ...form.promoStrip, ctaLabel: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
        </div>
      </div>
    </form>
  );
}
