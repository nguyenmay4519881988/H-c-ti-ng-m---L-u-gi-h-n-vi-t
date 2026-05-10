import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { TranslatorPage } from './pages/TranslatorPage';
import { CulturePage } from './pages/CulturePage';
import { HistoryPage } from './pages/HistoryPage';
import { GamesPage } from './pages/GamesPage';
import { ProfilePage } from './pages/ProfilePage';
import { LessonPage } from './pages/LessonPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="culture" element={<CulturePage />} />
          <Route path="translator" element={<TranslatorPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="lesson/:id" element={<LessonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
