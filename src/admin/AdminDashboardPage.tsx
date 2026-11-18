import { Link } from 'react-router-dom';
import { useNews, usePageContent, useProducts } from '../data/useContent';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function toPersian(n: number): string {
  return n.toString().replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function AdminDashboardPage() {
  const products = useProducts();
  const subscription = usePageContent('subscription');
  const home = usePageContent('home');
  const news = useNews();

  const cards = [
    {
      title: 'ویرایش صفحه خانه',
      desc: `عنوان هیرو فعلی: ${home.hero.title}`,
      to: '/admin/home',
      icon: 'home',
      badge: `${toPersian(home.continueWatching.items.length)} مورد ادامه تماشا`,
    },
    {
      title: 'مدیریت فیلم‌ها و سریال‌ها',
      desc: 'ویرایش مشخصات آثار، پوسترها، عوامل، قسمت‌ها و دیدگاه‌ها',
      to: '/admin/movies',
      icon: 'movie',
      badge: `${toPersian(products.length)} عنوان ثبت‌شده`,
    },
    {
      title: 'مدیریت پلن‌های اشتراک',
      desc: 'ویرایش قیمت‌های ماهانه/سالانه، امکانات و پرسش‌های متداول',
      to: '/admin/subscription',
      icon: 'workspace_premium',
      badge: `${toPersian(subscription.plans.length)} پلن فعال`,
    },
    {
      title: 'ویرایش صفحه درباره ما',
      desc: 'مانیفست زد نما، معرفی بنیان‌گذار و چهار ستون اصلی',
      to: '/admin/about',
      icon: 'info',
      badge: '۴ ستون اصلی',
    },
    {
      title: 'تنظیمات سایت و اخبار',
      desc: 'ویرایش برندینگ هدر، لینک‌های فوتر و فهرست اخبار سینمایی',
      to: '/admin/site',
      icon: 'tune',
      badge: `${toPersian(news.length)} خبر منتشرشده`,
    },
  ];

  return (
    <div className="space-y-space-xl">
      <div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-black text-on-surface">
          داشبورد مدیریت محتوای زد نما
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          تمامی تغییرات به‌صورت آنی در مخزن محتوا ذخیره شده و بلافاصله در صفحات عمومی نمایش داده می‌شوند.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 shadow-lg flex flex-col justify-between gap-space-md"
          >
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm">
                  {card.badge}
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                {card.title}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {card.desc}
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary font-label-md text-label-md">
              <span>ورود به ویرایشگر</span>
              <span className="material-symbols-outlined text-base">arrow_left</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
