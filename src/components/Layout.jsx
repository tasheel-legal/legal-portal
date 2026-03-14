import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Layout() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-primary text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-xl font-bold ms-2">{t('welcome')}</h1>
                <button
                    onClick={toggleLanguage}
                    className="bg-accent px-4 py-2 rounded font-medium hover:bg-opacity-90 transition-colors"
                >
                    {t('toggleLanguage')}
                </button>
            </header>
            <main className="p-4 md:p-8 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
