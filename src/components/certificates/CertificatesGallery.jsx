import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Гувохнома from "../../assets/cert/guvohnoma_page-0001.jpg";
import Паспорт from "../../assets/cert/Паспорт.jpg";
import Сертификат from "../../assets/cert/Сертификат.jpg";
import "./style.css";

const CertificatesGallery = ({ lang }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Translation object for ru, en, uz
  const translations = {
    en: {
      subtitle: "Official Documentation & Quality Certifications",
      viewCertificate: "View Certificate",
      certificateDetails: "Certificate Details",
      company: "Company",
      location: "Location",
      status: "Status",
      type: "Type",
      active: "Active",
      companyName: "LIDERLUX LLC",
      locationValue: "Ferghana region, Tashlak district",
      certificates: [
        {
          id: 1,
          title: "Legal Certificate",
          type: "Legal Certificate",
          description: "LIDERLUX LLC Legal Entity Certificate",
          image: Гувохнома,
        },
        {
          id: 2,
          title: "ISO 9001:2015 Certificate",
          type: "Quality Management",
          description: "LIDERLUX LLC - Production of sodium nitrate",
          image: Сертификат,
        },
        {
          id: 3,
          title: "Quality Certificate",
          type: "Product Passport",
          description: "SODIUM NITRATE TECHNICAL GOST 828-77",
          image: Паспорт,
        },
      ],
    },
    ru: {
      subtitle: "Официальная документация и сертификаты качества",
      viewCertificate: "Посмотреть сертификат",
      certificateDetails: "Детали сертификата",
      company: "Компания",
      location: "Местоположение",
      status: "Статус",
      type: "Тип",
      active: "Активен",
      companyName: "ООО LIDERLUX",
      locationValue: "Ферганская область, Ташлакский район",
      certificates: [
        {
          id: 1,
          title: "Сертификат юридического лица",
          type: "Юридический сертификат",
          description: "Сертификат юридического лица ООО LIDERLUX",
          image: Гувохнома,
        },
        {
          id: 2,
          title: "Сертификат ISO 9001:2015",
          type: "Управление качеством",
          description: "ООО LIDERLUX - Производство нитрата натрия",
          image: Сертификат,
        },
        {
          id: 3,
          title: "Паспорт качества",
          type: "Паспорт продукта",
          description: "ТЕХНИЧЕСКИЙ НИТРАТ НАТРИЯ ГОСТ 828-77",
          image: Паспорт,
        },
      ],
    },
    uz: {
      subtitle: "Rasmiy hujjatlar va sifat sertifikatlari",
      viewCertificate: "Sertifikatni ko'rish",
      certificateDetails: "Sertifikat tafsilotlari",
      company: "Kompaniya",
      location: "Joylashuv",
      status: "Holati",
      type: "Turi",
      active: "Faol",
      companyName: "LIDERLUX MChJ",
      locationValue: "Farg'ona viloyati, Toshloq tumani",
      certificates: [
        {
          id: 1,
          title: "Yuridik shaxs guvohnomasi",
          type: "Yuridik sertifikat",
          description: "LIDERLUX MChJ yuridik shaxs sertifikati",
          image: Гувохнома,
        },
        {
          id: 2,
          title: "ISO 9001:2015 sertifikati",
          type: "Sifat boshqaruvi",
          description: "LIDERLUX MChJ - texnik natriy nitrati ishlab chiqarish",
          image: Сертификат,
        },
        {
          id: 3,
          title: "Sifat passporti",
          type: "Mahsulot pasporti",
          description: "TEXNIK texnik natriy nitrati GOST 828-77",
          image: Паспорт,
        },
      ],
    },
  };

  // Fallback to English if lang is not supported
  const t = translations[lang] || translations.en;

  const openCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsZoomed(false); // Reset zoom state when opening a new certificate
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setIsZoomed(false); // Reset zoom state when closing
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="set-container">
      <div className="set-header">
        <p className="set-subtitle">{t.subtitle}</p>
      </div>

      <div className="set-gallery">
        {t.certificates.map((certificate, index) => (
          <div
            key={certificate.id}
            className={`set-certificate-card ${isLoaded ? "set-animate-in" : ""
              }`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => openCertificate(certificate)}
          >
            <div className="set-certificate-image">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="set-real-certificate-image"
              />
            </div>
            <div className="set-certificate-info">
              <h3 className="set-certificate-title">{certificate.title}</h3>
              <p className="set-certificate-description">
                {certificate.description}
              </p>
              <div className="set-view-button">
                <span>{t.viewCertificate}</span>
                <span className="set-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCertificate && (
        <div className="set-modal-overlay" onClick={closeCertificate}>
          <div
            className="set-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="set-close-button" onClick={closeCertificate}>
              <X size={24} />
            </button>
            <div className="set-modal-header">
              <h2>{selectedCertificate.title}</h2>
              <span className="set-modal-type">{selectedCertificate.type}</span>
            </div>
            <div className="set-modal-body">
              <div className="set-modal-image">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className={`set-modal-certificate-image ${isZoomed ? "zoomed" : ""
                    }`}
                  onClick={toggleZoom}
                  style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
                />
              </div>
              <div className="set-certificate-details">
                <h3>{t.certificateDetails}</h3>
                <div className="set-details-grid">
                  <div className="set-detail-item">
                    <span className="set-label">{t.company}</span>
                    <span className="set-value">{t.companyName}</span>
                  </div>
                  <div className="set-detail-item">
                    <span className="set-label">{t.location}</span>
                    <span className="set-value">{t.locationValue}</span>
                  </div>
                  <div className="set-detail-item">
                    <span className="set-label">{t.status}</span>
                    <span className="set-value set-active">{t.active}</span>
                  </div>
                  <div className="set-detail-item">
                    <span className="set-label">{t.type}</span>
                    <span className="set-value">
                      {selectedCertificate.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .set-real-certificate-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 15px;
          border: 2px solid #e1e5e9;
          transition: transform 0.3s ease;
        }

        .set-modal-certificate-image {
          width: 100%;
          max-height: 400px;
          object-fit: contain;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .set-modal-certificate-image.zoomed {
          transform: scale(2);
        }

        .set-certificate-info {
          text-align: center;
        }

        .set-view-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #667eea;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .set-arrow {
          transition: transform 0.3s ease;
        }

        .set-modal-image {
          margin-bottom: 2rem;
          overflow: auto;
          max-height: 400px; /* Matches max-height of image */
        }
      `}</style>
    </div>
  );
};

export default CertificatesGallery;
