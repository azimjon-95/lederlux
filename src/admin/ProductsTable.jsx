import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Edit,
} from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../context/productionApi";
import "./css/productList.css";
import "./css/admin.css";
import UpdateProduct from "./UpdateProduct";

// Translation object
const translations = {
  en: {
    title: "Product List",
    addProduct: "New Product",
    loading: "Loading data...",
    noProducts: "No products available",
    image: "Image",
    name: "Name",
    price: "Price",
    updated: "Updated",
    applicationAreas: "Application Areas",
    warranty: "Warranty",
    safety: "Safety Requirements",
    storage: "Storage & Transport",
    usage: "Usage Method",
    actions: "Actions",
    delete: "Delete",
    addProductTitle: "Add New Product",
    basicInfo: "Basic Information",
    productName: "Product Name",
    priceLabel: "Price",
    pricePlaceholder: "0.00",
    applicationAreasLabel: "Application Areas",
    usageMethodLabel: "Usage Method",
    safetyRequirementsLabel: "Safety Requirements",
    storageAndTransportLabel: "Storage and Transport",
    manufacturerWarrantyLabel: "Manufacturer Warranty",
    uploadImages: "Upload Images",
    close: "Close",
    save: "Saving...",
    saveButton: "Save",
    productImages: "Product Images",
    noImage: "No image available",
    imagesCount: "{count} image(s)",
    titleRequired: "Product name (Uzbek) is required",
    priceRequired: "Price is required",
    errorSaving: "Error saving product",
    errorDeleting: "Error deleting product",
    titlePlaceholder: {
      uz: "Name in Uzbek...",
      ru: "Name in Russian...",
      en: "Name in English...",
    },
    areasPlaceholder: {
      uz: "Application areas in Uzbek...",
      ru: "Application areas in Russian...",
      en: "Application areas in English...",
    },
    usagePlaceholder: {
      uz: "Usage method in Uzbek...",
      ru: "Usage method in Russian...",
      en: "Usage method in English...",
    },
    safetyPlaceholder: {
      uz: "Safety requirements in Uzbek...",
      ru: "Safety requirements in Russian...",
      en: "Safety requirements in English...",
    },
    storagePlaceholder: {
      uz: "Storage and transport in Uzbek...",
      ru: "Storage and transport in Russian...",
      en: "Storage and transport in English...",
    },
    warrantyPlaceholder: {
      uz: "Manufacturer warranty in Uzbek...",
      ru: "Manufacturer warranty in Russian...",
      en: "Manufacturer warranty in English...",
    },
  },
  ru: {
    title: "Список продуктов",
    addProduct: "Новый продукт",
    loading: "Загрузка данных...",
    noProducts: "Продукты отсутствуют",
    image: "Изображение",
    name: "Название",
    price: "Цена",
    updated: "Обновлено",
    applicationAreas: "Области применения",
    warranty: "Гарантия",
    safety: "Требования безопасности",
    storage: "Хранение и транспортировка",
    usage: "Способ применения",
    actions: "Действия",
    delete: "Удалить",
    addProductTitle: "Добавить новый продукт",
    basicInfo: "Основная информация",
    productName: "Название продукта",
    priceLabel: "Цена",
    pricePlaceholder: "0.00",
    applicationAreasLabel: "Области применения",
    usageMethodLabel: "Способ применения",
    safetyRequirementsLabel: "Требования безопасности",
    storageAndTransportLabel: "Хранение и транспортировка",
    manufacturerWarrantyLabel: "Гарантия производителя",
    uploadImages: "Загрузить изображения",
    close: "Закрыть",
    save: "Сохранение...",
    saveButton: "Сохранить",
    productImages: "Изображения продукта",
    noImage: "Изображение отсутствует",
    imagesCount: "{count} изображений",
    titleRequired: "Название продукта (на узбекском) обязательно",
    priceRequired: "Цена обязательна",
    errorSaving: "Ошибка при сохранении продукта",
    errorDeleting: "Ошибка при удалении продукта",
    titlePlaceholder: {
      uz: "Название на узбекском...",
      ru: "Название на русском...",
      en: "Название на английском...",
    },
    areasPlaceholder: {
      uz: "Области применения на узбекском...",
      ru: "Области применения на русском...",
      en: "Области применения на английском...",
    },
    usagePlaceholder: {
      uz: "Способ применения на узбекском...",
      ru: "Способ применения на русском...",
      en: "Способ применения на английском...",
    },
    safetyPlaceholder: {
      uz: "Требования безопасности на узбекском...",
      ru: "Требования безопасности на русском...",
      en: "Требования безопасности на английском...",
    },
    storagePlaceholder: {
      uz: "Хранение и транспортировка на узбекском...",
      ru: "Хранение и транспортировка на русском...",
      en: "Хранение и транспортировка на английском...",
    },
    warrantyPlaceholder: {
      uz: "Гарантия производителя на узбекском...",
      ru: "Гарантия производителя на русском...",
      en: "Гарантия производителя на английском...",
    },
  },
  uz: {
    title: "Mahsulotlar Ro'yxati",
    addProduct: "Yangi Mahsulot",
    loading: "Ma'lumotlar yuklanmoqda...",
    noProducts: "Mahsulotlar mavjud emas",
    image: "Rasm",
    name: "Nomi",
    price: "Narx",
    updated: "Yangilangan",
    applicationAreas: "Qo'llanilishi",
    warranty: "Kafolat",
    safety: "Xavfsizlik",
    storage: "Saqlash va Tashish",
    usage: "Foydalanish",
    actions: "Amallar",
    delete: "O'chirish",
    addProductTitle: "Yangi Mahsulot Qo'shish",
    basicInfo: "Asosiy Ma'lumotlar",
    productName: "Mahsulot Nomi",
    priceLabel: "Narx",
    pricePlaceholder: "0.00",
    applicationAreasLabel: "Qo'llash Sohalari",
    usageMethodLabel: "Foydalanish Usuli",
    safetyRequirementsLabel: "Xavfsizlik Talablari",
    storageAndTransportLabel: "Saqlash va Tashish",
    manufacturerWarrantyLabel: "Ishlab Chiqaruvchi Kafolati",
    uploadImages: "Rasmlar Yuklash",
    close: "Yopish",
    save: "Saqlanmoqda...",
    saveButton: "Saqlash",
    productImages: "Mahsulot Rasmlari",
    noImage: "Rasm mavjud emas",
    imagesCount: "{count} rasm",
    titleRequired: "Mahsulot nomi (o'zbek tilida) majburiy",
    priceRequired: "Narx majburiy",
    errorSaving: "Mahsulotni saqlashda xatolik",
    errorDeleting: "Mahsulotni o'chirishda xatolik",
    titlePlaceholder: {
      uz: "O'zbek tilidagi nom...",
      ru: "Rus tilidagi nom...",
      en: "Ingliz tilidagi nom...",
    },
    areasPlaceholder: {
      uz: "O'zbek tilidagi qo'llash sohalari...",
      ru: "Rus tilidagi qo'llash sohalari...",
      en: "Ingliz tilidagi qo'llash sohalari...",
    },
    usagePlaceholder: {
      uz: "O'zbek tilidagi foydalanish usuli...",
      ru: "Rus tilidagi foydalanish usuli...",
      en: "Ingliz tilidagi foydalanish usuli...",
    },
    safetyPlaceholder: {
      uz: "O'zbek tilidagi xavfsizlik talablari...",
      ru: "Rus tilidagi xavfsizlik talablari...",
      en: "Ingliz tilidagi xavfsizlik talablari...",
    },
    storagePlaceholder: {
      uz: "O'zbek tilidagi saqlash va tashish ma'lumotlari...",
      ru: "Rus tilidagi saqlash va tashish ma'lumotlari...",
      en: "Ingliz tilidagi saqlash va tashish ma'lumotlari...",
    },
    warrantyPlaceholder: {
      uz: "O'zbek tilidagi kafolat ma'lumotlari...",
      ru: "Rus tilidagi kafolat ma'lumotlari...",
      en: "Ingliz tilidagi kafolat ma'lumotlari...",
    },
  },
};

const ProductList = ({
  lang = localStorage.getItem("lang") || "uz",
  searchTerm = "",
}) => {
  const {
    data: productsData,
    isLoading,
    error: queryError,
    refetch,
  } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const products = productsData?.innerData || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [activeTab, setActiveTab] = useState({
    title: "uz",
    areas: "uz",
    usage: "uz",
    safety: "uz",
    storage: "uz",
    warranty: "uz",
  });

  const [formData, setFormData] = useState({
    title: { uz: "", ru: "", en: "" },
    price: 0,
    applicationAreas: { uz: "", ru: "", en: "" },
    usageMethod: { uz: "", ru: "", en: "" },
    safetyRequirements: { uz: "", ru: "", en: "" },
    storageAndTransport: { uz: "", ru: "", en: "" },
    manufacturerWarranty: { uz: "", ru: "", en: "" },
  });

  const [updateProduct, setUpdateProduct] = useState(false);

  // Get translations based on lang prop
  const t = translations[lang] || translations.uz;

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.uz.trim()) newErrors.titleUz = t.titleRequired;
    // if (formData.price) newErrors.price = t.priceRequired;
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openModal = (type = "product", product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setImageFiles([]);
    setError("");
    setFormErrors({});
    setFormData(
      product
        ? {
            title: product.title,
            price: product.price,
            applicationAreas: product.applicationAreas,
            usageMethod: product.usageMethod,
            safetyRequirements: product.safetyRequirements,
            storageAndTransport: product.storageAndTransport,
            manufacturerWarranty: product.manufacturerWarranty,
          }
        : {
            title: { uz: "", ru: "", en: "" },
            price: 0,
            applicationAreas: { uz: "", ru: "", en: "" },
            usageMethod: { uz: "", ru: "", en: "" },
            safetyRequirements: { uz: "", ru: "", en: "" },
            storageAndTransport: { uz: "", ru: "", en: "" },
            manufacturerWarranty: { uz: "", ru: "", en: "" },
          }
    );
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType("");
    setSelectedProduct(null);
    setImageFiles([]);
    setError("");
    setFormErrors({});
    setFormData({
      title: { uz: "", ru: "", en: "" },
      price: 0,
      applicationAreas: { uz: "", ru: "", en: "" },
      usageMethod: { uz: "", ru: "", en: "" },
      safetyRequirements: { uz: "", ru: "", en: "" },
      storageAndTransport: { uz: "", ru: "", en: "" },
      manufacturerWarranty: { uz: "", ru: "", en: "" },
    });
    document.body.style.overflow = "auto";
  };

  const handleDeleteProduct = async (productId) => {
    if (
      !window.confirm(
        t.deleteConfirm || "Are you sure you want to delete this product?"
      )
    )
      return;
    try {
      await deleteProduct(productId).unwrap();
      refetch();
    } catch (error) {
      setError(t.errorDeleting);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const switchTab = (section, language) => {
    setActiveTab((prev) => ({
      ...prev,
      [section]: language,
    }));
  };

  const handleInputChange = (field, lang, value) => {
    if (field === "price") {
      setFormData((prev) => ({
        ...prev,
        price: value || 0,
      }));
      if (formErrors.price && value) {
        setFormErrors((prev) => ({ ...prev, price: "" }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value,
        },
      }));
      if (
        field === "title" &&
        lang === "uz" &&
        formErrors.titleUz &&
        value.trim()
      ) {
        setFormErrors((prev) => ({ ...prev, titleUz: "" }));
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(
      (file) =>
        !imageFiles.some(
          (existing) =>
            existing.name === file.name && existing.size === file.size
        )
    );
    setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const saveProduct = async () => {
    if (!validateForm()) return;

    try {
      const fd = new FormData();

      // Ko‘p tilli maydonlarni avtomatik append qiluvchi helper
      const appendML = (fieldName, obj) => {
        fd.append(`${fieldName}[uz]`, obj?.uz || "");
        fd.append(`${fieldName}[ru]`, obj?.ru || "");
        fd.append(`${fieldName}[en]`, obj?.en || "");
      };

      // Multi-lang maydonlar
      appendML("title", formData.title);
      appendML("applicationAreas", formData.applicationAreas);
      appendML("usageMethod", formData.usageMethod);
      appendML("safetyRequirements", formData.safetyRequirements);
      appendML("storageAndTransport", formData.storageAndTransport);
      appendML("manufacturerWarranty", formData.manufacturerWarranty);

      // Narx: son ko‘rinishida yuboramiz
      fd.append("price", formData.price || 0);

      // Rasmlar
      (imageFiles || []).forEach((file) => fd.append("images", file));

      // Yuborish
      await createProduct(fd).unwrap();
      refetch();
      closeModal();
    } catch (error) {
      console.error("Save product error:", error);
      setError(t.errorSaving);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen]);

  // Filter products based on searchTerm
  const filteredProducts = products.filter(
    (product) =>
      Object.values(product.title).some((title) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      Object.values(product.applicationAreas).some((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      Object.values(product.usageMethod).some((usage) =>
        usage.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      Object.values(product.safetyRequirements).some((safety) =>
        safety.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      Object.values(product.storageAndTransport).some((storage) =>
        storage.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      Object.values(product.manufacturerWarranty).some((warranty) =>
        warranty.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const LanguageTabs = ({ section, activeLanguage }) => (
    <div className="pred-language-tabs">
      {["uz", "ru", "en"].map((lang) => (
        <button
          key={lang}
          className={`pred-tab ${activeLanguage === lang ? "active" : ""}`}
          onClick={() => switchTab(section, lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className="pred-table-container">
      <div className="pred-table-header">
        <h2 className="pred-table-title">{t.title}</h2>
        <button
          className="pred-btn pred-btn-add"
          onClick={() => openModal("product")}
          disabled={isCreating}
        >
          <Plus size={16} />
          {t.addProduct}
        </button>
      </div>

      {isLoading && (
        <div className="tfu-loading">
          <Loader2 size={24} className="tfu-spinner" />
          <span>{t.loading}</span>
        </div>
      )}

      {queryError && (
        <div className="pred-error">
          {t.error || "Error"}:{" "}
          {queryError?.data?.message || "Error loading products"}
          <button
            className="pred-btn pred-btn-primary pred-btn-sm"
            onClick={refetch}
          >
            {t.retry || "Retry"}
          </button>
        </div>
      )}

      {!isLoading && !queryError && (
        <div className="pred-table-content">
          <table className="pred-table">
            <thead>
              <tr>
                <th>{t.image}</th>
                <th>{t.name}</th>
                <th>{t.price}</th>
                <th>{t.updated}</th>
                <th>{t.applicationAreas}</th>
                <th>{t.warranty}</th>
                <th>{t.safety}</th>
                <th>{t.storage}</th>
                <th>{t.usage}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="pred-image-container">
                        {product.images?.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={`${product.title[lang]} - main`}
                            className="pred-product-img"
                            onClick={() => openModal("product-images", product)}
                          />
                        ) : (
                          <span className="pred-no-img">{t.noImage}</span>
                        )}
                        <span className="pred-img-count">
                          {t.imagesCount.replace(
                            "{count}",
                            product.images.length
                          )}
                        </span>
                      </div>
                    </td>
                    <td>{product.title[lang]}</td>
                    <td>{product.price}</td>
                    <td>
                      {new Date(product.updatedAt).toLocaleDateString(
                        lang === "ru"
                          ? "ru-RU"
                          : lang === "en"
                          ? "en-US"
                          : "uz-UZ"
                      )}
                    </td>
                    <td>{product.applicationAreas[lang]}</td>
                    <td>{product.manufacturerWarranty[lang]}</td>
                    <td>{product.safetyRequirements[lang]}</td>
                    <td>{product.storageAndTransport[lang]}</td>
                    <td>{product.usageMethod[lang]}</td>
                    <td>
                      <div className="pred-actions">
                        <button
                          className="pred-btn pred-btn-delete"
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={isDeleting}
                          title={t.delete}
                        >
                          {isDeleting ? (
                            <Loader2 size={16} className="tfu-spinner" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>

                        <button
                          className="pred-btn"
                          onClick={() => {
                            setUpdateProduct(product);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">{t.noProducts}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {updateProduct && (
        <UpdateProduct data={updateProduct} setCloseModal={setUpdateProduct} />
      )}

      {modalOpen && modalType === "product" && (
        <div
          className="pred-modal"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="pred-modal-content">
            <div className="pred-modal-header">
              <h3>
                <span className="header-icon">📦</span>
                {t.addProductTitle}
              </h3>
              <button className="pred-close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="pred-modal-body">
              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">ℹ️</div>
                  <span>{t.basicInfo}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">📝</span>
                    {t.productName}
                  </label>
                  <LanguageTabs
                    section="title"
                    activeLanguage={activeTab.title}
                  />
                  <div className="tab-content">
                    {activeTab.title === "uz" && (
                      <input
                        type="text"
                        value={formData.title.uz}
                        onChange={(e) =>
                          handleInputChange("title", "uz", e.target.value)
                        }
                        placeholder={t.titlePlaceholder.uz}
                        className={formErrors.titleUz ? "pred-input-error" : ""}
                      />
                    )}
                    {activeTab.title === "ru" && (
                      <input
                        type="text"
                        value={formData.title.ru}
                        onChange={(e) =>
                          handleInputChange("title", "ru", e.target.value)
                        }
                        placeholder={t.titlePlaceholder.ru}
                      />
                    )}
                    {activeTab.title === "en" && (
                      <input
                        type="text"
                        value={formData.title.en}
                        onChange={(e) =>
                          handleInputChange("title", "en", e.target.value)
                        }
                        placeholder={t.titlePlaceholder.en}
                      />
                    )}
                    {formErrors.titleUz && (
                      <span className="pred-error">{formErrors.titleUz}</span>
                    )}
                  </div>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">💰</span>
                    {t.priceLabel}
                  </label>
                  <div className="pred-price-input">
                    <input
                      type="string"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", null, e.target.value)
                      }
                      placeholder={t.pricePlaceholder}
                      className={formErrors.price ? "pred-input-error" : ""}
                    />
                    {/* {formErrors.price && (
                      <span className="pred-error">{formErrors.price}</span>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">⚙️</div>
                  <span>{t.applicationAreasLabel}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">📋</span>
                    {t.applicationAreasLabel}
                  </label>
                  <LanguageTabs
                    section="areas"
                    activeLanguage={activeTab.areas}
                  />
                  <div className="tab-content">
                    {activeTab.areas === "uz" && (
                      <textarea
                        value={formData.applicationAreas.uz}
                        onChange={(e) =>
                          handleInputChange(
                            "applicationAreas",
                            "uz",
                            e.target.value
                          )
                        }
                        placeholder={t.areasPlaceholder.uz}
                      />
                    )}
                    {activeTab.areas === "ru" && (
                      <textarea
                        value={formData.applicationAreas.ru}
                        onChange={(e) =>
                          handleInputChange(
                            "applicationAreas",
                            "ru",
                            e.target.value
                          )
                        }
                        placeholder={t.areasPlaceholder.ru}
                      />
                    )}
                    {activeTab.areas === "en" && (
                      <textarea
                        value={formData.applicationAreas.en}
                        onChange={(e) =>
                          handleInputChange(
                            "applicationAreas",
                            "en",
                            e.target.value
                          )
                        }
                        placeholder={t.areasPlaceholder.en}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">✅</div>
                  <span>{t.usageMethodLabel}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">▶️</span>
                    {t.usageMethodLabel}
                  </label>
                  <LanguageTabs
                    section="usage"
                    activeLanguage={activeTab.usage}
                  />
                  <div className="tab-content">
                    {activeTab.usage === "uz" && (
                      <textarea
                        value={formData.usageMethod.uz}
                        onChange={(e) =>
                          handleInputChange("usageMethod", "uz", e.target.value)
                        }
                        placeholder={t.usagePlaceholder.uz}
                      />
                    )}
                    {activeTab.usage === "ru" && (
                      <textarea
                        value={formData.usageMethod.ru}
                        onChange={(e) =>
                          handleInputChange("usageMethod", "ru", e.target.value)
                        }
                        placeholder={t.usagePlaceholder.ru}
                      />
                    )}
                    {activeTab.usage === "en" && (
                      <textarea
                        value={formData.usageMethod.en}
                        onChange={(e) =>
                          handleInputChange("usageMethod", "en", e.target.value)
                        }
                        placeholder={t.usagePlaceholder.en}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">🛡️</div>
                  <span>{t.safetyRequirementsLabel}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">⚠️</span>
                    {t.safetyRequirementsLabel}
                  </label>
                  <LanguageTabs
                    section="safety"
                    activeLanguage={activeTab.safety}
                  />
                  <div className="tab-content">
                    {activeTab.safety === "uz" && (
                      <textarea
                        value={formData.safetyRequirements.uz}
                        onChange={(e) =>
                          handleInputChange(
                            "safetyRequirements",
                            "uz",
                            e.target.value
                          )
                        }
                        placeholder={t.safetyPlaceholder.uz}
                      />
                    )}
                    {activeTab.safety === "ru" && (
                      <textarea
                        value={formData.safetyRequirements.ru}
                        onChange={(e) =>
                          handleInputChange(
                            "safetyRequirements",
                            "ru",
                            e.target.value
                          )
                        }
                        placeholder={t.safetyPlaceholder.ru}
                      />
                    )}
                    {activeTab.safety === "en" && (
                      <textarea
                        value={formData.safetyRequirements.en}
                        onChange={(e) =>
                          handleInputChange(
                            "safetyRequirements",
                            "en",
                            e.target.value
                          )
                        }
                        placeholder={t.safetyPlaceholder.en}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">🏪</div>
                  <span>{t.storageAndTransportLabel}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">🚛</span>
                    {t.storageAndTransportLabel}
                  </label>
                  <LanguageTabs
                    section="storage"
                    activeLanguage={activeTab.storage}
                  />
                  <div className="tab-content">
                    {activeTab.storage === "uz" && (
                      <textarea
                        value={formData.storageAndTransport.uz}
                        onChange={(e) =>
                          handleInputChange(
                            "storageAndTransport",
                            "uz",
                            e.target.value
                          )
                        }
                        placeholder={t.storagePlaceholder.uz}
                      />
                    )}
                    {activeTab.storage === "ru" && (
                      <textarea
                        value={formData.storageAndTransport.ru}
                        onChange={(e) =>
                          handleInputChange(
                            "storageAndTransport",
                            "ru",
                            e.target.value
                          )
                        }
                        placeholder={t.storagePlaceholder.ru}
                      />
                    )}
                    {activeTab.storage === "en" && (
                      <textarea
                        value={formData.storageAndTransport.en}
                        onChange={(e) =>
                          handleInputChange(
                            "storageAndTransport",
                            "en",
                            e.target.value
                          )
                        }
                        placeholder={t.storagePlaceholder.en}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">🏆</div>
                  <span>{t.manufacturerWarrantyLabel}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">🥇</span>
                    {t.manufacturerWarrantyLabel}
                  </label>
                  <LanguageTabs
                    section="warranty"
                    activeLanguage={activeTab.warranty}
                  />
                  <div className="tab-content">
                    {activeTab.warranty === "uz" && (
                      <textarea
                        value={formData.manufacturerWarranty.uz}
                        onChange={(e) =>
                          handleInputChange(
                            "manufacturerWarranty",
                            "uz",
                            e.target.value
                          )
                        }
                        placeholder={t.warrantyPlaceholder.uz}
                      />
                    )}
                    {activeTab.warranty === "ru" && (
                      <textarea
                        value={formData.manufacturerWarranty.ru}
                        onChange={(e) =>
                          handleInputChange(
                            "manufacturerWarranty",
                            "ru",
                            e.target.value
                          )
                        }
                        placeholder={t.warrantyPlaceholder.ru}
                      />
                    )}
                    {activeTab.warranty === "en" && (
                      <textarea
                        value={formData.manufacturerWarranty.en}
                        onChange={(e) =>
                          handleInputChange(
                            "manufacturerWarranty",
                            "en",
                            e.target.value
                          )
                        }
                        placeholder={t.warrantyPlaceholder.en}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="pred-form-section">
                <div className="pred-section-header">
                  <div className="pred-section-icon">🖼️</div>
                  <span>{t.uploadImages}</span>
                </div>
                <div className="pred-form-group">
                  <label>
                    <span className="pred-label-icon">📸</span>
                    {t.uploadImages}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imageFiles.length > 0 && (
                    <div className="pred-image-preview">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="pred-image-item">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="pred-preview-img"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {error && <div className="pred-error">{error}</div>}
            </div>

            <div className="pred-modal-footer">
              <button className="pred-btn pred-btn-close" onClick={closeModal}>
                ✕ {t.close}
              </button>
              <button
                className="pred-btn pred-btn-save"
                onClick={saveProduct}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 size={16} className="tfu-spinner" />
                    {t.save}
                  </>
                ) : (
                  <>💾 {t.saveButton}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && modalType === "product-images" && (
        <div className="pred-modal">
          <div className="pred-modal-content">
            <h3>{t.productImages}</h3>
            <div className="pred-image-gallery">
              {selectedProduct.images?.length > 0 ? (
                <div className="pred-gallery-container">
                  <button
                    className="pred-btn pred-gallery-nav"
                    onClick={handlePrevImage}
                    disabled={selectedProduct.images.length <= 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={`${selectedProduct.title[lang]} - ${
                      currentImageIndex + 1
                    }`}
                    className="pred-gallery-img"
                  />
                  <button
                    className="pred-btn pred-gallery-nav"
                    onClick={handleNextImage}
                    disabled={selectedProduct.images.length <= 1}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <span className="pred-no-img">{t.noImage}</span>
              )}
              <div className="pred-gallery-info">
                <span>
                  {selectedProduct.images?.length > 0
                    ? `${currentImageIndex + 1} / ${
                        selectedProduct.images.length
                      }`
                    : "0 / 0"}
                </span>
              </div>
            </div>
            <div className="pred-modal-actions">
              <button onClick={closeModal} className="pred-btn pred-btn-close">
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
