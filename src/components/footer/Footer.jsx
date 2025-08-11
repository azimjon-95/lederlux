import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Footer({ lang = "ru" }) {
  // Translation object for different languages
  const translations = {
    ru: {
      contacts: {
        title: "Контакты",
        company: "«LIDERLUX» MCHJ",
        address: "Узбекистан, г. Фергана",
        email: "liderlux.info@gmail.com",
      },
      products: {
        title: "Каталог товаров",
        items: ["Продукция", "О натриевом нитрате"],
      },
      about: {
        title: "О компании",
        items: ["О нас", "Контакты", "Карта"],
      },
      copyright: "© 2025 ООО Лидерлюкс. Все права защищены.",
    },
    en: {
      contacts: {
        title: "Contacts",
        company: "LIDERLUX LLC",
        address: "Uzbekistan, Fergana",
        email: "liderlux.info@gmail.com",
      },
      products: {
        title: "Products section",
        items: ["products", "About Sodium Nitrate"],
      },
      about: {
        title: "About the Company",
        items: ["About", "Contact", "Map"],
      },
      copyright: "© 2025 Liderlux LLC. All rights reserved.",
    },
    uz: {
      contacts: {
        title: "Aloqa",
        company: "«LIDERLUX» MCHJ",
        address: "Oʻzbekiston, Fargʻona",
        email: "liderlux.info@gmail.com",
      },
      products: {
        title: "Mahsulotlar bo'limi",
        items: ["mahsulotlar", "Natriy Nitrat haqida"],
        // items: ["Mineral o’g’itlar", "Nitratlar"],
      },
      about: {
        title: "Kompaniya haqida",
        items: ["Biz haqimizda", "Aloqa", "Xarita"],
      },
      copyright: "© 2025 Liderlux MCHJ. Barcha huquqlar himoyalangan.",
    },
  };

  // Fallback to Russian if the provided lang is not supported
  const selectedLang = translations[lang] || translations.ru;

  // Route paths for the "About" section (lowercase for consistency)
  const aboutRoutes = ["about", "contact", "map"];
  const prodactRoutes = ["products", "nitrat"];

  return (
    <footer className="bez-footer">
      <div className="bez-container">
        <div className="bez-footer-content">
          <div className="bez-footer-section">
            <h4 className="bez-footer-title">{selectedLang.contacts.title}</h4>
            <p>{selectedLang.contacts.company}</p>
            <p>{selectedLang.contacts.address}</p>
            <p>{selectedLang.contacts.email}</p>
          </div>
          <div className="bez-footer-section">
            <h4 className="bez-footer-title">{selectedLang.products.title}</h4>
            <ul className="bez-footer-links">
              {selectedLang.products.items.map((item, index) => (
                <li key={index}>
                  <Link to={`/${lang}/${prodactRoutes[index]}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bez-footer-section">
            <h4 className="bez-footer-title">{selectedLang.about.title}</h4>
            <ul className="bez-footer-links">
              {selectedLang.about.items.map((item, index) => (
                <li key={index}>
                  <Link to={`/${lang}/${aboutRoutes[index]}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bez-footer-bottom">
          <p>{selectedLang.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
