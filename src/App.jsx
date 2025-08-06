import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './components/Home';
import UniversalInfoPage from './components/about/About';
import Footer from './components/footer/Footer';
import ManzilMapPage from './components/map/MapPage';

function RedirectToLang() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    const validLangs = ['ru', 'en', 'uz'];
    const storedLang = localStorage.getItem('lang');

    if (pathLang === '') {
      const lang = storedLang && validLangs.includes(storedLang) ? storedLang : 'ru';
      localStorage.setItem('lang', lang);
      navigate(`/${lang}`, { replace: true });
    } else if (pathLang === 'oz') {
      localStorage.setItem('lang', 'uz');
      navigate('/uz', { replace: true });
    } else if (!validLangs.includes(pathLang)) {
      localStorage.setItem('lang', 'ru');
      navigate('/ru', { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function App() {
  const location = useLocation();
  const lang = location.pathname.split('/')[1]; // bu yerda lang ni ajratamiz

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RedirectToLang />} />
        <Route path="/:lang/:contact" element={<UniversalInfoPage />} />
        <Route path="/:lang/map" element={<ManzilMapPage lang={lang} />} />
        <Route path="/ru" element={<HomePage lang="ru" />} />
        <Route path="/en" element={<HomePage lang="en" />} />
        <Route path="/uz" element={<HomePage lang="uz" />} />
        <Route path="*" element={<RedirectToLang />} />
      </Routes>
      <Footer lang={lang} />
    </>
  );
}

export default App;
