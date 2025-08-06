// src/UniversalInfoPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Users, Factory, ChevronRight, Mail, Award, Truck, Shield } from 'lucide-react';
import { translations } from './translations';
import './style.css';

const UniversalInfoPage = () => {
    const { lang, contact } = useParams(); // Extract language from URL (e.g., 'uz', 'ru', 'en')
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(contact);
    const [language, setLanguage] = useState(lang || 'uz'); // Default to 'uz' if no lang in URL

    // Sync language with URL and browser language
    useEffect(() => {
        const supportedLanguages = ['uz', 'ru', 'en'];
        const browserLang = navigator.language.split('-')[0]; // e.g., 'en' from 'en-US'
        let newLang = lang || 'uz';

        // If URL has no language, try to use browser language
        if (!lang && supportedLanguages.includes(browserLang)) {
            newLang = browserLang;
            navigate(`/${newLang}`, { replace: true });
        } else if (!supportedLanguages.includes(lang)) {
            // If URL has invalid language, fallback to 'uz'
            newLang = 'uz';
            navigate(`/${newLang}`, { replace: true });
        }

        setLanguage(newLang);
    }, [lang, navigate]);

    const t = translations[language]; // Get translations for current language

    const renderContent = () => {
        switch (activeSection) {
            case 'about':
                return (
                    <div className="abu-content-section">
                        <div className="abu-hero-banner">
                            <Factory className="abu-hero-icon" size={64} />
                            <h1 className="abu-hero-title">{t.about.title}</h1>
                            <p className="abu-hero-subtitle">{t.about.subtitle}</p>
                        </div>
                        <div className="abu-info-grid">
                            <div className="abu-info-card">
                                <Award className="abu-card-icon" />
                                <h3>{t.about.mission}</h3>
                                <p>{t.about.missionDesc}</p>
                            </div>
                            <div className="abu-info-card">
                                <Shield className="abu-card-icon" />
                                <h3>{t.about.quality}</h3>
                                <p>{t.about.qualityDesc}</p>
                            </div>
                            <div className="abu-info-card">
                                <Truck className="abu-card-icon" />
                                <h3>{t.about.delivery}</h3>
                                <p>{t.about.deliveryDesc}</p>
                            </div>
                        </div>
                        <div className="abu-product-highlight">
                            <h2>{t.about.productTitle}</h2>
                            <div className="abu-product-details">
                                <div className="abu-product-spec">
                                    <h4>{t.about.productTitle}:</h4>
                                    <ul>
                                        {t.about.productSpecs.map((spec, index) => (
                                            <li key={index}>{spec}</li>
                                        ))}
                                    </ul>
                                    <ul>
                                        {t.about.productFeatures}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="abu-content-section">
                        <div className="abu-hero-banner">
                            <Phone className="abu-hero-icon" size={64} />
                            <h1 className="abu-hero-title">{t.contact.title}</h1>
                            <p className="abu-hero-subtitle">{t.contact.subtitle}</p>
                        </div>
                        <div className="abu-contact-grid">
                            <div className="abu-contact-card">
                                <MapPin className="abu-contact-icon" />
                                <h3>{t.contact.address}</h3>
                                <p className="abu-contact-detail">{t.contact.address}</p>
                            </div>
                            <div className="abu-contact-card">
                                <Phone className="abu-contact-icon" />
                                <h3>{t.contact.sales}</h3>
                                <a href={`tel:${t.contact.salesPhone}`} className="abu-phone-link">
                                    {t.contact.salesPhone}
                                </a>
                            </div>
                            <div className="abu-contact-card">
                                <Mail className="abu-contact-icon" />
                                <h3>{t.contact.info}</h3>
                                <a href={`tel:${t.contact.infoPhone}`} className="abu-phone-link">
                                    {t.contact.infoPhone}
                                </a>
                            </div>
                        </div>
                        <div className="abu-contact-form">
                            <h3>{t.contact.title}</h3>
                            <div className="abu-form">
                                <div className="abu-contact-info">
                                    <div className="abu-contact-item">
                                        <Phone className="abu-contact-mini-icon" />
                                        <span>{t.contact.sales}: </span>
                                        <a href={`tel:${t.contact.salesPhone}`} className="abu-phone-link">{t.contact.salesPhone}</a>
                                    </div>
                                    <div className="abu-contact-item">
                                        <Mail className="abu-contact-mini-icon" />
                                        <span>{t.contact.info}: </span>
                                        <a href={`tel:${t.contact.infoPhone}`} className="abu-phone-link">{t.contact.infoPhone}</a>
                                    </div>
                                </div>
                                <div className="abu-working-hours">
                                    <h4>{t.contact.workingHours}:</h4>
                                    {t.contact.hours.map((hour, index) => (
                                        <p key={index}>{hour}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="abu-content-section">
                        <div className="abu-main-hero">
                            <div className="abu-hero-content">
                                <Factory className="abu-main-logo" size={80} />
                                <h1 className="abu-main-title">{t.home.title}</h1>
                                <p className="abu-main-subtitle">{t.home.subtitle}</p>
                                <div className="abu-tagline">
                                    <span className="abu-highlight">{t.home.tagline}</span>
                                </div>
                            </div>
                        </div>
                        <div className="abu-quick-stats">
                            <div className="abu-stat-card">
                                <Award size={32} />
                                <h4>{t.home.stats.quality}</h4>
                                <p>{t.home.stats.qualityDesc}</p>
                            </div>
                            <div className="abu-stat-card">
                                <Truck size={32} />
                                <h4>{t.home.stats.delivery}</h4>
                                <p>{t.home.stats.deliveryDesc}</p>
                            </div>
                            <div className="abu-stat-card">
                                <Shield size={32} />
                                <h4>{t.home.stats.reliability}</h4>
                                <p>{t.home.stats.reliabilityDesc}</p>
                            </div>
                        </div>
                        <div className="abu-cta-section">
                            <h2>{t.home.ctaAbout}</h2>
                            <div className="abu-cta-buttons">
                                <button className="abu-cta-btn abu-primary" onClick={() => setActiveSection('about')}>
                                    <Users size={20} />
                                    {t.home.ctaAbout}
                                </button>
                                <button className="abu-cta-btn abu-secondary" onClick={() => setActiveSection('contact')}>
                                    <Phone size={20} />
                                    {t.home.ctaContact}
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="abu-app">
            <main className="abu-main">{renderContent()}</main>
        </div>
    );
};

export default UniversalInfoPage;