import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STITCH_ASSETS } from '../content/assets';
import { ProductItem } from '../content/types';
import { contentRepository } from '../data/ContentRepository';
import { useProducts } from '../data/useContent';

export function AdminMoviesEditor() {
  const products = useProducts();
  const [selectedId, setSelectedId] = useState<string>(products[0]?.id ?? '');
  const selectedProduct = products.find((p) => p.id === selectedId) ?? products[0];
  const [form, setForm] = useState<ProductItem | undefined>(selectedProduct);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    }
  }, [selectedProduct]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    contentRepository.updateProduct(form.id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCreateNew = () => {
    const id = `custom-${Date.now()}`;
    const newItem: ProductItem = {
      id,
      slug: id,
      type: 'movie',
      title: 'اثر سینمایی جدید',
      englishTitle: 'New Independent Title',
      year: '۱۴۰۴',
      genre: 'درام مستقل',
      duration: '۹۵ دقیقه',
      ageRating: '+۱۶',
      qualityBadge: '4K HDR',
      audioBadge: 'دالبی ۵.۱',
      seasonStatusBadge: 'فیلم کامل',
      subtitleBadge: 'زیرنویس فارسی اختصاصی',
      exclusiveBadge: 'انحصاری زد نما',
      laurelBadge: 'اکران جدید زد نما',
      genreBadge: 'درام مستقل',
      rating: '۸.۹',
      ratingNumeric: '۸.۹',
      votesCountLabel: 'بر اساس آرای کاربران زد نما',
      synopsis: 'توضیحات داستان اثر را در این بخش وارد نمایید.',
      director: 'سهراب کیانی',
      producer: 'فریدون رادمهر',
      writer: 'نگار شمس',
      cinematographer: 'پیمان شادمان‌فر',
      backdropImage: STITCH_ASSETS.movieDetail.backdrop,
      posterImage: STITCH_ASSETS.movieDetail.poster,
      categoryShelf: 'new-release',
      cast: [],
      episodes: [],
      gallery: [],
      soundtrackTitle: 'موسیقی متن اصلی',
      soundtrackDetails: 'آهنگسازی اختصاصی',
      reviews: [],
      similarIds: ['sim-1', 'sim-2', 'sim-3', 'sim-4', 'sim-5', 'sim-6'],
    };
    contentRepository.createProduct(newItem);
    setSelectedId(id);
  };

  return (
    <div className="space-y-space-xl pb-space-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-md text-headline-md font-black text-on-surface">
            مدیریت فیلم‌ها و سریال‌ها
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            انتخاب و ویرایش اطلاعات آثار نمایشی در صفحه خانه و صفحه جزئیات فیلم.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-space-md py-space-sm rounded-xl bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-label-lg text-label-lg transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>افزودن اثر جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Product Selector List */}
        <div className="lg:col-span-4 space-y-space-xs bg-surface-container-low p-space-md rounded-xl max-h-[650px] overflow-y-auto">
          {products.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`w-full text-start p-space-sm rounded-xl flex items-center justify-between gap-2 transition-colors ${
                item.id === form?.id
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'bg-surface-container/40 hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <div className="min-w-0">
                <div className="font-label-lg text-label-lg truncate">{item.title}</div>
                <div className="font-label-sm text-label-sm opacity-75 truncate">
                  {item.genre} • {item.year}
                </div>
              </div>
              <span className="font-label-sm text-label-sm shrink-0 px-2 py-0.5 rounded bg-black/25">
                {item.rating}
              </span>
            </button>
          ))}
        </div>

        {/* Product Editor Form */}
        {form && (
          <form
            onSubmit={handleSave}
            className="lg:col-span-8 p-space-lg rounded-xl bg-surface-container-low space-y-space-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/20 pb-space-md">
              <div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  ویرایش: {form.title}
                </h2>
                <Link
                  to={`/movies/${form.slug}`}
                  className="font-label-sm text-label-sm text-primary hover:underline"
                >
                  مشاهده صفحه عمومی اثر
                </Link>
              </div>
              <div className="flex items-center gap-space-sm">
                {saved && (
                  <span className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary font-label-md text-label-md">
                    ذخیره شد
                  </span>
                )}
                {products.length > 1 && form.id !== 'feat-1' && (
                  <button
                    type="button"
                    onClick={() => {
                      contentRepository.deleteProduct(form.id);
                      setSelectedId(products[0].id);
                    }}
                    className="px-space-md py-space-xs rounded-xl bg-error-container text-on-error-container font-label-md text-label-md"
                  >
                    حذف
                  </button>
                )}
                <button
                  type="submit"
                  className="px-space-lg py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  عنوان فارسی
                </span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  عنوان انگلیسی
                </span>
                <input
                  type="text"
                  dir="ltr"
                  value={form.englishTitle}
                  onChange={(e) => setForm({ ...form, englishTitle: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">ژانر</span>
                <input
                  type="text"
                  value={form.genre}
                  onChange={(e) =>
                    setForm({ ...form, genre: e.target.value, genreBadge: e.target.value })
                  }
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  مدت زمان
                </span>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">امتیاز</span>
                <input
                  type="text"
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: e.target.value, ratingNumeric: e.target.value })
                  }
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  سال انتشار
                </span>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  کارگردان
                </span>
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) => setForm({ ...form, director: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  نشان اختصاصی
                </span>
                <input
                  type="text"
                  value={form.exclusiveBadge}
                  onChange={(e) => setForm({ ...form, exclusiveBadge: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>

              <label className="space-y-1 block md:col-span-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  نشانی تصویر پوستر (URL)
                </span>
                <input
                  type="text"
                  dir="ltr"
                  value={form.posterImage}
                  onChange={(e) => setForm({ ...form, posterImage: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-sm"
                />
              </label>

              <label className="space-y-1 block md:col-span-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  چکیده روایت
                </span>
                <textarea
                  rows={4}
                  value={form.synopsis}
                  onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md"
                />
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
