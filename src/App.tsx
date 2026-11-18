/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminAboutEditor } from './admin/AdminAboutEditor';
import { AdminDashboardPage } from './admin/AdminDashboardPage';
import { AdminHomeEditor } from './admin/AdminHomeEditor';
import { AdminLayout } from './admin/AdminLayout';
import { AdminMoviesEditor } from './admin/AdminMoviesEditor';
import { AdminSiteEditor } from './admin/AdminSiteEditor';
import { AdminSubscriptionEditor } from './admin/AdminSubscriptionEditor';
import { PublicLayout } from './components/PublicLayout';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { NewsPage } from './pages/NewsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SeriesPage } from './pages/SeriesPage';
import { StaticInfoPage } from './pages/StaticInfoPage';
import { SubscriptionPage } from './pages/SubscriptionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site Route Tree */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/movies" element={<MovieDetailPage />} />
          <Route path="/movies/:slug" element={<MovieDetailPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/terms" element={<StaticInfoPage slug="terms" />} />
          <Route path="/privacy" element={<StaticInfoPage slug="privacy" />} />
          <Route path="/help" element={<StaticInfoPage slug="help" />} />
        </Route>

        {/* Admin Section Route Tree (unprotected for now — see AdminLayout.tsx TODO) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="home" element={<AdminHomeEditor />} />
          <Route path="movies" element={<AdminMoviesEditor />} />
          <Route path="subscription" element={<AdminSubscriptionEditor />} />
          <Route path="about" element={<AdminAboutEditor />} />
          <Route path="site" element={<AdminSiteEditor />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
