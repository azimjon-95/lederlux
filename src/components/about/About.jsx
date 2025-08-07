// src/UniversalInfoPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Users, Factory, Instagram, MessageCircle, Mail, Award, Truck, Shield, ShoppingCart } from 'lucide-react';
import { translations } from './translations';
import './style.css';

const UniversalInfoPage = () => {
    const { lang, contact } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(contact || 'home');
    const [language, setLanguage] = useState(lang || 'uz');
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state

    const mockContactData = {
        main: '+998 (73) 242-66-42',
        sales: '+998 (73) 242-66-39',
        procurement: '+998 (73) 242-66-46',
        accounting: '+998 (73) 242-62-62',
        spareParts: '+998 (73) 242-60-63',
        personnel: '+998 (73) 242-59-95',
        infoPhone: "+998 99 997 44 40",
        instagram: 'https://www.instagram.com/liderlux.uz', // Example Instagram link
        telegram: 'https://t.me/liderlux_uz', // Example Telegram link
    };
    // Fallback translations to avoid undefined errors
    const t = translations[language] || translations['uz'];

    const contactItems = [
        {
            key: 'main',
            icon: Phone,
            label: t.contact?.main || 'Main Office',
            value: mockContactData.main,
        },
        {
            key: 'sales',
            icon: ShoppingCart,
            label: t.contact?.sales || 'Sales Department',
            value: mockContactData.sales,
        },
        {
            key: 'procurement',
            icon: Factory, // Changed to Factory for consistency
            label: t.contact?.procurement || 'Procurement Department',
            value: mockContactData.procurement,
        },
        {
            key: 'accounting',
            icon: Users, // Changed to Users for consistency
            label: t.contact?.accounting || 'Accounting Department',
            value: mockContactData.accounting,
        },
        {
            key: 'spareParts',
            icon: Truck, // Changed to Truck for consistency
            label: t.contact?.spareParts || 'Spare Parts',
            value: mockContactData.spareParts,
        },
        {
            key: 'personnel',
            icon: Users,
            label: t.contact?.personnel || 'Personnel Department',
            value: mockContactData.personnel,
        },
        {
            key: 'personnel',
            icon: Users,
            label: t.contact?.info || 'Personnel Department',
            value: mockContactData.infoPhone,
        },
    ];

    // Sync language with URL and browser language, persist in localStorage
    useEffect(() => {
        const supportedLanguages = ['uz', 'ru', 'en'];
        const browserLang = navigator.language.split('-')[0];
        let newLang = lang || localStorage.getItem('language') || 'uz';

        if (!lang && supportedLanguages.includes(browserLang)) {
            newLang = browserLang;
        } else if (!supportedLanguages.includes(lang)) {
            newLang = 'uz';
        }

        setLanguage(newLang);
        localStorage.setItem('language', newLang);
        if (lang !== newLang) {
            navigate(`/${newLang}/${activeSection || ''}`, { replace: true });
        }
    }, [lang, activeSection, navigate]);

    const renderContent = () => {
        switch (activeSection) {
            case 'about':
                return (
                    <div className="abu-content-section">
                        <div className="abu-hero-banner">
                            <Factory className="abu-hero-icon" size={64} aria-hidden="true" />
                            <h1 className="abu-hero-title">{t.about?.title || 'About Us'}</h1>
                            <p className="abu-hero-subtitle">{t.about?.subtitle || 'Learn more about our company'}</p>
                        </div>
                        <div className="abu-info-grid">
                            <div className="abu-info-card">
                                <Award className="abu-card-icon" aria-hidden="true" />
                                <h3>{t.about?.mission || 'Our Mission'}</h3>
                                <p>{t.about?.missionDesc || 'To deliver high-quality products.'}</p>
                            </div>
                            <div className="abu-info-card">
                                <Shield className="abu-card-icon" aria-hidden="true" />
                                <h3>{t.about?.quality || 'Quality Assurance'}</h3>
                                <p>{t.about?.qualityDesc || 'We ensure top-notch quality.'}</p>
                            </div>
                            <div className="abu-info-card">
                                <Truck className="abu-card-icon" aria-hidden="true" />
                                <h3>{t.about?.delivery || 'Fast Delivery'}</h3>
                                <p>{t.about?.deliveryDesc || 'Reliable and timely delivery.'}</p>
                            </div>
                        </div>
                        <div className="abu-product-highlight">
                            <h2>{t.about?.productTitle || 'Our Products'}</h2>
                            <div className="abu-product-details">
                                <div className="abu-product-spec">
                                    <h4>{t.about?.productTitle || 'Product Specifications'}:</h4>
                                    <ul>
                                        {t.about?.productSpecs?.map((spec, index) => (
                                            <li key={index}>{spec}</li>
                                        ))}
                                    </ul>
                                    <ul>
                                        {t.about?.productFeatures}
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
                            <Phone className="abu-hero-icon" size={64} aria-hidden="true" />
                            <h1 className="abu-hero-title">{t.contact?.title || 'Contact Us'}</h1>
                            <p className="abu-hero-subtitle">{t.contact?.subtitle || 'Get in touch with our team'}</p>
                        </div>
                        {isLoading ? (
                            <div className="abu-loading">
                                <div className="abu-spinner"></div>
                                <p>Loading contact information...</p>
                            </div>
                        ) : (
                            <>
                                <div className="abu-contact-grid">
                                    {contactItems.map((item) => (
                                        <div key={item.key} className="abu-contact-card">
                                            <item.icon className="abu-contact-icon" size={32} aria-hidden="true" />
                                            <h3>{item.label}</h3>
                                            <a href={`tel:${item.value}`} className="abu-phone-link" aria-label={`Call ${item.label}`}>
                                                {item.value}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="abu-contact-grid">
                                    <div className="abu-contact-card">
                                        <MapPin className="abu-contact-icon" aria-hidden="true" />
                                        <h3>{t.contact?.addressLabel || 'Address'}</h3>
                                        <p className="abu-contact-detail">{t.contact?.address || 'No address provided'}</p>
                                    </div>
                                    <div className="abu-contact-card">
                                        <Mail className="abu-contact-icon" aria-hidden="true" />
                                        <h3>{t.contact?.info || 'Information'}</h3>
                                        <a
                                            href={`mailto:${t.contact?.infoEmail || 'info@liderlux.uz'}`}
                                            className="abu-phone-link"
                                            aria-label="Send email"
                                        >
                                            {t.contact?.infoEmail || 'info@liderlux.uz'}
                                        </a>
                                    </div>
                                </div>
                                <div className="abu-social-media">
                                    <h3 className="abu-social-title">{t.contact?.social || 'Follow Us'}</h3>
                                    <div className="abu-social-buttons">
                                        <a
                                            href={mockContactData.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="abu-social-btn abu-instagram"
                                            aria-label="Visit our Instagram"
                                        >
                                            <Instagram size={24} aria-hidden="true" />
                                            Instagram
                                        </a>
                                        <a
                                            href={mockContactData.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="abu-social-btn abu-telegram"
                                            aria-label="Visit our Telegram"
                                        >
                                            <MessageCircle size={24} aria-hidden="true" />
                                            Telegram
                                        </a>
                                    </div>
                                </div>
                                <div className="abu-working-hours-section">
                                    <div className="abu-working-hours-card">
                                        <h3>{t.contact?.workingHours || 'Working Hours'}</h3>
                                        {(t.contact?.hours || []).map((hour, index) => (
                                            <p key={index} className="abu-hour-item">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="abu-content-section">
                        <div className="abu-main-hero">
                            <div className="abu-hero-content">
                                <Factory className="abu-main-logo" size={80} aria-hidden="true" />
                                <h1 className="abu-main-title">{t.home?.title || 'Welcome'}</h1>
                                <p className="abu-main-subtitle">{t.home?.subtitle || 'Discover our services'}</p>
                                <div className="abu-tagline">
                                    <span className="abu-highlight">{t.home?.tagline || 'Quality and Reliability'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="abu-quick-stats">
                            <div className="abu-stat-card">
                                <Award size={32} aria-hidden="true" />
                                <h4>{t.home?.stats?.quality || 'Quality'}</h4>
                                <p>{t.home?.stats?.qualityDesc || 'High-quality products'}</p>
                            </div>
                            <div className="abu-stat-card">
                                <Truck size={32} aria-hidden="true" />
                                <h4>{t.home?.stats?.delivery || 'Delivery'}</h4>
                                <p>{t.home?.stats?.deliveryDesc || 'Fast and reliable'}</p>
                            </div>
                            <div className="abu-stat-card">
                                <Shield size={32} aria-hidden="true" />
                                <h4>{t.home?.stats?.reliability || 'Reliability'}</h4>
                                <p>{t.home?.stats?.reliabilityDesc || 'Trusted services'}</p>
                            </div>
                        </div>

                        <div className="abu-cta-section">
                            <h2>{t.home?.ctaAbout || 'Learn More'}</h2>
                            <div className="abu-cta-buttons">
                                <button
                                    className="abu-cta-btn abu-primary"
                                    onClick={() => setActiveSection('about')}
                                    aria-label="Learn more about us"
                                >
                                    <Users size={20} aria-hidden="true" />
                                    {t.home?.ctaAbout || 'About Us'}
                                </button>
                                <button
                                    className="abu-cta-btn abu-secondary"
                                    onClick={() => setActiveSection('contact')}
                                    aria-label="Contact us"
                                >
                                    <Phone size={20} aria-hidden="true" />
                                    {t.home?.ctaContact || 'Contact Us'}
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


