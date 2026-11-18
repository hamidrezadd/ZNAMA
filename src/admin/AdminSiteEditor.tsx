import { FormEvent, useEffect, useState } from 'react';
import { NewsItem, SiteContent } from '../content/types';
import { contentRepository } from '../data/ContentRepository';
import { useNews, useSiteContent } from '../data/useContent';

export function AdminSiteEditor() {
  const currentSite = useSiteContent();
  const currentNews = useNews();
  const [siteForm, setSiteForm] = useState<SiteContent>(currentSite);
  const [newsForm, setNewsForm] = useState<NewsItem[]>(currentNews);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSiteForm(currentSite);
  }, [currentSite]);

  useEffect(() => {
    setNewsForm(currentNews);
  }, [currentNews]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    contentRepository.updateSite(siteForm);
    contentRepository.updateNews(newsForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-space-xl pb-space-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-md text-headline-md font-black text-on-surface">
            تنظیمات هدر، فوتر و اخبار
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            اطلاعات برندینگ، متون فوتر و اخبار سینمایی را ویرایش کنید.
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

      {/* Header & Footer */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          تنظیمات سراسری هدر و فوتر
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              دکمه فراخوان هدر
            </span>
            <input
              type="text"
              value={siteForm.ctaLabel}
              onChange={(e) => setSiteForm({ ...siteForm, ctaLabel: e.target.value })}
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              شناسه اینستاگرام
            </span>
            <input
              type="text"
              dir="ltr"
              value={siteForm.instagramHandle}
              onChange={(e) => setSiteForm({ ...siteForm, instagramHandle: e.target.value })}
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block md:col-span-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              توضیحات فوتر
            </span>
            <textarea
              rows={2}
              value={siteForm.footerDescription}
              onChange={(e) => setSiteForm({ ...siteForm, footerDescription: e.target.value })}
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block md:col-span-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              شعار کارت ویژه فوتر
            </span>
            <input
              type="text"
              value={siteForm.footerHighlightTitle}
              onChange={(e) =>
                setSiteForm({ ...siteForm, footerHighlightTitle: e.target.value })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
        </div>
      </div>

      {/* News Items */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          مدیریت اخبار سینمایی
        </h2>
        <div className="space-y-space-md">
          {newsForm.map((item, idx) => (
            <div key={item.id} className="p-space-md rounded-xl bg-surface-container space-y-space-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...newsForm];
                    updated[idx] = { ...item, title: e.target.value };
                    setNewsForm(updated);
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg"
                />
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => {
                    const updated = [...newsForm];
                    updated[idx] = { ...item, date: e.target.value };
                    setNewsForm(updated);
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-tertiary font-label-sm"
                />
              </div>
              <textarea
                rows={2}
                value={item.summary}
                onChange={(e) => {
                  const updated = [...newsForm];
                  updated[idx] = { ...item, summary: e.target.value };
                  setNewsForm(updated);
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
