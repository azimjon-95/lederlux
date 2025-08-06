import React from 'react';
import './style.css';

function Products({ lang = 'ru' }) {
    // Translation object for different languages
    const translations = {
        ru: {
            sectionTitle: 'Продукция',
            products: [
                {
                    title: 'Аммиак',
                    description: 'Высококачественный технический аммиак для промышленности',
                    icon: '🧪',
                },
                {
                    title: 'Карбамид',
                    description: 'Азотные удобрения для повышения урожайности',
                    icon: '🌱',
                },
                {
                    title: 'Нитраты',
                    description: 'Специализированные химические соединения',
                    icon: '⚗️',
                },
            ],
        },
        en: {
            sectionTitle: 'Products',
            products: [
                {
                    title: 'Ammonia',
                    description: 'High-quality technical ammonia for industry',
                    icon: '🧪',
                },
                {
                    title: 'Urea',
                    description: 'Nitrogen fertilizers to increase crop yield',
                    icon: '🌱',
                },
                {
                    title: 'Nitrates',
                    description: 'Specialized chemical compounds',
                    icon: '⚗️',
                },
            ],
        },
        uz: {
            sectionTitle: 'Mahsulotlar',
            products: [
                {
                    title: 'Ammiak',
                    description: 'Sanoat uchun yuqori sifatli texnik ammiak',
                    icon: '🧪',
                },
                {
                    title: 'Karbamid',
                    description: 'Hosildorlikni oshirish uchun azotli oʻgʻitlar',
                    icon: '🌱',
                },
                {
                    title: 'Nitratlar',
                    description: 'Maxsus kimyoviy birikmalar',
                    icon: '⚗️',
                },
            ],
        },
    };

    // Fallback to Russian if the provided lang is not supported
    const selectedLang = translations[lang] || translations.ru;

    return (
        <section className="bez-products-section">
            <div className="bez-container">
                <h2 className="bez-section-item bez-products-title">{selectedLang.sectionTitle}</h2>
                <div className="bez-products-grid">
                    {selectedLang.products.map((product, index) => (
                        <div className="bez-product-card" key={index}>
                            <div className="bez-product-icon">{product.icon}</div>
                            <h3 className="bez-product-title">{product.title}</h3>
                            <p className="bez-product-description">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products;