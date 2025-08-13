// Products.jsx
import React, { useState } from "react";
import "./style.css";
import ProductSinglePage from "../singlePage/ProductSinglePage"; // Import single page component
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../context/productionApi";

function Products({ lang = "ru", title }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { data: productsData, isLoading, error } = useGetProductsQuery();

  // Translation object for UI elements
  const translations = {
    ru: {
      // mahsulotlar bo'limi
      sectionTitle: "Каталог товаров",
      detailsButton: "Подробнее",
      currency: "$",
      loading: "Загрузка...",
      error: "Ошибка при загрузке продуктов",
    },
    en: {
      sectionTitle: "Products Section",
      detailsButton: "Details",
      currency: "sum",
      loading: "Loading...",
      error: "Error loading products",
    },
    uz: {
      sectionTitle: "Mahsulotlar bo'limi",
      detailsButton: "Batafsil",
      currency: "$",
      loading: "Yuklanmoqda...",
      error: "Mahsulotlarni yuklashda xatolik",
    },
  };

  const selectedLang = translations[lang] || translations.ru;

  // Loading state with skeleton cards
  if (isLoading || error) {
    return (
      <section className="bez-products-section">
        <div className="bez-container">
          {title === undefined && (
            <h2 className="bez-section-item bez-products-title">
              {selectedLang.sectionTitle}
            </h2>
          )}

          <div className="bez-products-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="bez-product-card bez-skeleton-card" key={index}>
                <div className="bez-product-image bez-skeleton-image">
                  <div className="bez-skeleton-shimmer"></div>
                </div>

                <div className="bez-product-content">
                  <div className="bez-skeleton-title">
                    <div className="bez-skeleton-shimmer"></div>
                  </div>

                  <div className="bez-skeleton-description">
                    <div className="bez-skeleton-line">
                      <div className="bez-skeleton-shimmer"></div>
                    </div>
                    <div className="bez-skeleton-line">
                      <div className="bez-skeleton-shimmer"></div>
                    </div>
                    <div className="bez-skeleton-line bez-skeleton-line-short">
                      <div className="bez-skeleton-shimmer"></div>
                    </div>
                  </div>

                  <div className="bez-product-price-box">
                    <div className="bez-skeleton-price">
                      <div className="bez-skeleton-shimmer"></div>
                    </div>

                    <div className="bez-skeleton-button">
                      <div className="bez-skeleton-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bez-products-section">
        <div className="bez-container">
          <div className="bez-error">
            <div className="bez-error-icon">⚠️</div>
            <p>{selectedLang.error}</p>
            <button
              className="bez-retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Single product view - using separate component
  if (selectedProduct) {
    return (
      <ProductSinglePage
        product={selectedProduct}
        lang={lang}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  // Products list view
  return (
    <section className="bez-products-section">
      <div className="bez-container">
        {title === undefined && (
          <h2 className="bez-section-item bez-products-title">
            {selectedLang.sectionTitle}
          </h2>
        )}

        <div className="bez-products-grid">
          {productsData?.innerData?.map((product, index) => (
            <div className="bez-product-card" key={product._id || index}>
              <div className="bez-product-image">
                <img
                  src={product.images?.[0]}
                  alt={product.title?.[lang] || product.title?.ru}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="bez-image-overlay">
                  <button
                    className="bez-quick-view"
                    onClick={() =>
                      navigate(
                        `/${product.title?.[lang] || product.title?.ru}`,
                        { state: { product } }
                      )
                    }
                    title="Быстрый просмотр"
                  ></button>
                </div>
              </div>

              <div className="bez-product-content">
                <h3 className="bez-product-title">
                  {product.title?.[lang] || product.title?.ru}
                </h3>

                <p className="bez-product-description">
                  {product.applicationAreas?.[lang] ||
                    product.applicationAreas?.ru}
                </p>

                <div className="bez-product-price-box">
                  <div className="bez-product-price">
                    {product.price}
                    {/* {selectedLang.currency} */}
                  </div>

                  <button
                    className="bez-details-button"
                    onClick={() =>
                      navigate(
                        `/${product.title?.[lang] || product.title?.ru}`,
                        { state: { product } }
                      )
                    }
                  >
                    {selectedLang.detailsButton}
                  </button>
                </div>
              </div>
            </div>
          )) || []}
        </div>
      </div>
    </section>
  );
}

export default Products;
