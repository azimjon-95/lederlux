import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import Products from "../products/Products";

function ProductSinglePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lang =
    localStorage.getItem("lang") || localStorage.getItem("lang") || "ru"; // Default to Russian if no language is set

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // yoki "smooth"
    });
  }, [location.pathname]);

  // Translation object for UI elements
  const translations = {
    ru: {
      backButton: "Назад к продуктам",
      price: "Цена",
      applicationAreas: "Области применения",
      usageMethod: "Способ применения",
      safetyRequirements: "Требования безопасности",
      manufacturerWarranty: "Гарантия производителя",
      storageAndTransport: "Хранение и транспортировка",
      currency: "$",
      imageGallery: "Галерея изображений",
      productDetails: "Детали продукта",
      specifications: "Технические характеристики",
      errorMessage: "Продукт не найден", // Added error message
      added: "Добавлено",
    },
    en: {
      backButton: "Back to Products",
      price: "Price",
      applicationAreas: "Application Areas",
      usageMethod: "Usage Method",
      safetyRequirements: "Safety Requirements",
      manufacturerWarranty: "Manufacturer Warranty",
      storageAndTransport: "Storage and Transport",
      currency: "sum",
      imageGallery: "Image Gallery",
      productDetails: "Product Details",
      specifications: "Specifications",
      errorMessage: "Product not found", // Added error message
      added: "Added",
    },
    uz: {
      backButton: "Mahsulotlarga qaytish",
      price: "Narxi",
      applicationAreas: "Qo'llash sohalari",
      usageMethod: "Foydalanish usuli",
      safetyRequirements: "Xavfsizlik talablari",
      manufacturerWarranty: "Ishlab chiqaruvchi kafolati",
      storageAndTransport: "Saqlash va tashish",
      currency: "$",
      imageGallery: "Rasm galereyasi",
      productDetails: "Mahsulot tafsilotlari",
      specifications: "Texnik xususiyatlari",
      errorMessage: "Mahsulot topilmadi", // Added error message
      added: "Qo'shilgan",
    },
  };

  const selectedLang = translations[lang] || translations.ru;

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (!product) {
    return (
      <div className="bez-single-error">
        <p>{selectedLang.errorMessage}</p>
        <button onClick={() => navigate(-1)} className="bez-back-button">
          {selectedLang.backButton}
        </button>
      </div>
    );
  }

  return (
    <div className="bez-single-page">
      <div className="bez-single-container">
        {/* Header with back button */}
        <div className="bez-single-header">
          <button className="bez-back-button" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {selectedLang.backButton}
          </button>
        </div>

        {/* Main content */}
        <div className="bez-single-content">
          {/* Image Gallery Section */}
          <div className="bez-single-gallery">
            <div className="bez-main-image">
              <img
                src={
                  product.images?.[currentImageIndex] ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={product.title?.[lang] || product.title?.ru || "Product"}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=No+Image";
                }}
              />

              {/* Navigation arrows for multiple images */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    className="bez-image-nav bez-prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="bez-image-nav bez-next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="bez-thumbnails">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`bez-thumbnail ${
                      currentImageIndex === index ? "bez-active" : ""
                    }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img
                      src={image}
                      alt={`${
                        product.title?.[lang] || product.title?.ru || "Product"
                      } ${index + 1}`}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x80?text=No+Image";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information Section */}
          <div className="bez-single-info">
            <div className="bez-single-title-section">
              <h1 className="bez-single-title">
                {product.title?.[lang] || product.title?.ru || "No Title"}
              </h1>

              <div className="bez-single-price">
                <span className="bez-price-label">{selectedLang.price}:</span>
                <span className="bez-price-value">
                  {product.price
                    ? //  ${selectedLang.currency}
                      `${product.price}
                     `
                    : "N/A"}
                </span>
              </div>
            </div>

            {/* Product specifications */}
            <div className="bez-single-specs">
              <h2 className="bez-specs-title">{selectedLang.specifications}</h2>

              <div className="bez-specs-grid">
                <div className="bez-spec-item">
                  <div className="bez-spec-header">
                    <div className="bez-spec-icon">📍</div>
                    <h3>{selectedLang.applicationAreas}</h3>
                  </div>
                  <p>
                    {product.applicationAreas?.[lang] ||
                      product.applicationAreas?.ru ||
                      "N/A"}
                  </p>
                </div>

                <div className="bez-spec-item">
                  <div className="bez-spec-header">
                    <div className="bez-spec-icon">🔧</div>
                    <h3>{selectedLang.usageMethod}</h3>
                  </div>
                  <p>
                    {product.usageMethod?.[lang] ||
                      product.usageMethod?.ru ||
                      "N/A"}
                  </p>
                </div>

                <div className="bez-spec-item">
                  <div className="bez-spec-header">
                    <div className="bez-spec-icon">⚠️</div>
                    <h3>{selectedLang.safetyRequirements}</h3>
                  </div>
                  <p>
                    {product.safetyRequirements?.[lang] ||
                      product.safetyRequirements?.ru ||
                      "N/A"}
                  </p>
                </div>

                <div className="bez-spec-item">
                  <div className="bez-spec-header">
                    <div className="bez-spec-icon">🛡️</div>
                    <h3>{selectedLang.manufacturerWarranty}</h3>
                  </div>
                  <p>
                    {product.manufacturerWarranty?.[lang] ||
                      product.manufacturerWarranty?.ru ||
                      "N/A"}
                  </p>
                </div>

                <div className="bez-spec-item">
                  <div className="bez-spec-header">
                    <div className="bez-spec-icon">📦</div>
                    <h3>{selectedLang.storageAndTransport}</h3>
                  </div>
                  <p>
                    {product.storageAndTransport?.[lang] ||
                      product.storageAndTransport?.ru ||
                      "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional product information */}
            <div className="bez-single-additional">
              <div className="bez-product-meta">
                <div className="bez-meta-item">
                  <span>ID:</span>
                  <span>{product._id || "N/A"}</span>
                </div>
                {product.createdAt && (
                  <div className="bez-meta-item">
                    <span>{selectedLang.added || "Qo'shilgan"}:</span>
                    <span>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products title="title" lang={lang} />
    </div>
  );
}

export default ProductSinglePage;
