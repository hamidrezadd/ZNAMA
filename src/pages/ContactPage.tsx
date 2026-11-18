import { FormEvent, useState } from 'react';
import { usePageContent, useSiteContent } from '../data/useContent';

export function ContactPage() {
  const page = usePageContent('contact-us');
  const site = useSiteContent();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col w-full text-on-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl pb-space-2xl">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-space-xl">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-1.5 h-6 bg-primary-container rounded-full" />
            <h1 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
              {page.title}
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">{page.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7 p-space-lg rounded-xl bg-surface-container-low shadow-xl">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-md">
              ارسال پیام مستقیم
            </h2>

            {sent && (
              <div className="mb-space-md p-space-md rounded-xl bg-surface-container-high border border-primary-container/40 flex items-center gap-space-sm text-on-surface">
                <span className="material-symbols-outlined text-primary-container">
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm">
                  پیام شما با موفقیت ثبت شد. همکاران ما در اسرع وقت پاسخ خواهند داد.
                </span>
              </div>
            )}

            <form className="space-y-space-md" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="contact-name">
                  نام و نام خانوادگی
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="contact-email">
                  ایمیل یا شماره تماس
                </label>
                <input
                  id="contact-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="contact-msg">
                  متن پیام
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-space-xl py-space-sm rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-md transition-all"
              >
                ارسال پیام
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-space-md">
            {page.sections.map((sec, idx) => (
              <div key={idx} className="p-space-lg rounded-xl bg-surface-container-low space-y-space-xs">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {sec.heading}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}

            <div className="p-space-lg rounded-xl bg-surface-container-low flex items-center justify-between">
              <span className="font-label-lg text-label-lg text-on-surface">اینستاگرام رسمی</span>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-label-lg text-label-lg text-primary hover:underline"
              >
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
