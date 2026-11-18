import { FormEvent, useEffect, useState } from 'react';
import { SubscriptionPageContent } from '../content/types';
import { contentRepository } from '../data/ContentRepository';
import { usePageContent } from '../data/useContent';

export function AdminSubscriptionEditor() {
  const current = usePageContent('subscription');
  const [form, setForm] = useState<SubscriptionPageContent>(current);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(current);
  }, [current]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    contentRepository.updatePage('subscription', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-space-xl pb-space-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-md text-headline-md font-black text-on-surface">
            مدیریت پلن‌های اشتراک و پرسش‌های متداول
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            قیمت‌گذاری ماهانه و سالانه، متن معرفی و سؤالات متداول صفحه اشتراک را ویرایش کنید.
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

      {/* Hero Subtitle */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          بخش معرفی صفحه اشتراک
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">نشان بالا</span>
            <input
              type="text"
              value={form.hero.badge}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, badge: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block">
            <span className="font-label-md text-label-md text-on-surface-variant">
              نشان تخفیف سالانه
            </span>
            <input
              type="text"
              value={form.hero.annualDiscountBadge}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: { ...form.hero, annualDiscountBadge: e.target.value },
                })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
          <label className="space-y-1 block md:col-span-2">
            <span className="font-label-md text-label-md text-on-surface-variant">زیرتیتر</span>
            <textarea
              rows={2}
              value={form.hero.subtitle}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, subtitle: e.target.value } })
              }
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
            />
          </label>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {form.plans.map((plan, idx) => (
          <div key={plan.id} className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {plan.title}
              </span>
              {plan.featured && (
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm">
                  طلایی
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <label className="space-y-1 block">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  عنوان پلن
                </span>
                <input
                  type="text"
                  value={plan.title}
                  onChange={(e) => {
                    const plans = [...form.plans];
                    plans[idx] = { ...plan, title: e.target.value };
                    setForm({ ...form, plans });
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  نشان بالای کارت
                </span>
                <input
                  type="text"
                  value={plan.tag}
                  onChange={(e) => {
                    const plans = [...form.plans];
                    plans[idx] = { ...plan, tag: e.target.value };
                    setForm({ ...form, plans });
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  قیمت ماهانه
                </span>
                <input
                  type="text"
                  value={plan.monthlyPrice}
                  onChange={(e) => {
                    const plans = [...form.plans];
                    plans[idx] = { ...plan, monthlyPrice: e.target.value };
                    setForm({ ...form, plans });
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  قیمت سالانه
                </span>
                <input
                  type="text"
                  value={plan.annualPrice}
                  onChange={(e) => {
                    const plans = [...form.plans];
                    plans[idx] = { ...plan, annualPrice: e.target.value };
                    setForm({ ...form, plans });
                  }}
                  className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm"
                />
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                توضیح پلن
              </span>
              <input
                type="text"
                value={plan.subtitle}
                onChange={(e) => {
                  const plans = [...form.plans];
                  plans[idx] = { ...plan, subtitle: e.target.value };
                  setForm({ ...form, plans });
                }}
                className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-body-sm"
              />
            </label>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          پرسش‌های متداول
        </h2>
        <div className="space-y-space-md">
          {form.faq.items.map((item, idx) => (
            <div key={item.id} className="p-space-md rounded-xl bg-surface-container space-y-space-sm">
              <input
                type="text"
                value={item.question}
                onChange={(e) => {
                  const items = [...form.faq.items];
                  items[idx] = { ...item, question: e.target.value };
                  setForm({ ...form, faq: { ...form.faq, items } });
                }}
                className="w-full px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg"
              />
              <textarea
                rows={2}
                value={item.answer}
                onChange={(e) => {
                  const items = [...form.faq.items];
                  items[idx] = { ...item, answer: e.target.value };
                  setForm({ ...form, faq: { ...form.faq, items } });
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
