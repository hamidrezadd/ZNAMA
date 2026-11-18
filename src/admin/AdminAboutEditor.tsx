import { FormEvent, useEffect, useState } from 'react';
import { AboutPageContent } from '../content/types';
import { contentRepository } from '../data/ContentRepository';
import { usePageContent } from '../data/useContent';

export function AdminAboutEditor() {
  const current = usePageContent('about-us');
  const [form, setForm] = useState<AboutPageContent>(current);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(current);
  }, [current]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    contentRepository.updatePage('about-us', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-space-xl pb-space-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-md text-headline-md font-black text-on-surface">
            ویرایش صفحه درباره ما
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            مانیفست، معرفی بنیان‌گذار و چهار ستون اصلی زد نما را ویرایش کنید.
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
            className="px-space-lg py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>

      {/* Manifesto */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          بخش مانیفست و تیتر اصلی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">خط اول تیتر</span>
            <input
              type="text"
              value={form.hero.headlineLine1}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, headlineLine1: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">خط دوم تیتر</span>
            <input
              type="text"
              value={form.hero.headlineLine2}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, headlineLine2: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block md:col-span-2">
            <span className="font-label-md text-label-md text-on-surface-variant">نقل‌قول مانیفست</span>
            <textarea
              rows={2}
              value={form.hero.quoteParagraph1}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, quoteParagraph1: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
        </div>
      </div>

      {/* Founder */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          معرفی بنیان‌گذار
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">نام</span>
            <input
              type="text"
              value={form.founder.name}
              onChange={(e) =>
                setForm({ ...form, founder: { ...form.founder, name: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">سمت</span>
            <input
              type="text"
              value={form.founder.role}
              onChange={(e) =>
                setForm({ ...form, founder: { ...form.founder, role: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block md:col-span-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              سخن برجسته بنیان‌گذار
            </span>
            <textarea
              rows={3}
              value={form.founder.highlightQuote}
              onChange={(e) =>
                setForm({
                  ...form,
                  founder: { ...form.founder, highlightQuote: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          چهار ستون ماندگار
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {form.values.pillars.map((pillar, idx) => (
            <div key={pillar.code} className="p-space-md rounded-xl bg-surface-container space-y-space-sm">
              <input
                type="text"
                value={pillar.title}
                onChange={(e) => {
                  const pillars = [...form.values.pillars];
                  pillars[idx] = { ...pillar, title: e.target.value };
                  setForm({ ...form, values: { ...form.values, pillars } });
                }}
                className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg"
              />
              <textarea
                rows={3}
                value={pillar.description}
                onChange={(e) => {
                  const pillars = [...form.values.pillars];
                  pillars[idx] = { ...pillar, description: e.target.value };
                  setForm({ ...form, values: { ...form.values, pillars } });
                }}
                className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant font-body-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
