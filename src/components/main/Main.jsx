import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./main.css";
import factory from "../../assets/factory.jpg";
const Main = ({ lang = "ru" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Language-specific content
  const content = {
    en: {
      slides: [
        { title: "Chemical Products", subtitle: "Learn More", icon: "🌱" },
        { title: "Mineral Fertilizers", subtitle: "Learn More", icon: "⚗️" },
        { title: "Raw Materials", subtitle: "Learn More", icon: "🧪" },
      ],
      about: {
        sectionTitle: "About Us",
        companyTitle: "LiderLux LLC",
        description: [
          "LIDERLUX MCHJ is a modern enterprise operating in the chemical industry, specializing in the production of high-quality chemical raw materials and mineral fertilizers. One of our core areas of activity is the production of technical-grade sodium nitrate (NaNO₃) for industrial applications.",
        ],
        button: "Learn More",
      },
    },
    ru: {
      slides: [
        { title: "Химическая продукция", subtitle: "Подробнее", icon: "🌱" },
        { title: "Минеральные удобрения", subtitle: "Подробнее", icon: "⚗️" },
        { title: "Сырьё", subtitle: "Подробнее", icon: "🧪" },
      ],
      about: {
        sectionTitle: "О компании",
        companyTitle: "ООО «LiderLux»",
        description: [
          "Это современное предприятие, действующее в сфере химической промышленности и специализирующееся на производстве высококачественного химического сырья и минеральных удобрений. Одним из основных направлений нашей деятельности является производство технического нитрата натрия (натрий азотнокислый технический) для промышленных целей.",
        ],
        button: "Подробнее",
      },
    },
    uz: {
      slides: [
        { title: "Kimyoviy mahsulotlar", subtitle: "Batafsil", icon: "🌱" },
        { title: "Mineral o’g’itlar", subtitle: "Batafsil", icon: "⚗️" },
        { title: "Xom ashyo", subtitle: "Batafsil", icon: "🧪" },
      ],
      about: {
        sectionTitle: "Kompaniya haqida",
        companyTitle: "«LiderLux» MCHJ",
        description: [
          "Bu kimyo sanoati sohasida faoliyat yurituvchi, yuqori sifatli kimyoviy xomashyo va mineral o‘g‘itlar ishlab chiqaruvchi zamonaviy korxona. Bizning asosiy yo‘nalishlarimizdan biri — texnik maqsadlar uchun mo‘ljallangan texnik natriy nitrati (natriy azotnokislotali texnik) ishlab chiqarishdir.",
          "Biz o‘z ishlab chiqarish jarayonlarimizda xalqaro sifat standartlariga amal qilgan holda, barqaror va ekologik xavfsiz texnologiyalardan foydalanamiz. Mahsulotlarimiz sanoat, qishloq xo‘jaligi va boshqa yirik tarmoqlar ehtiyojlariga mos ravishda ishlab chiqariladi.",
          "Biz har bir mijozimizga individual yondashuv, barqaror ta’minot va uzoq muddatli hamkorlikni taklif etamiz.",
          "Asosiy maqsadimiz — mahalliy va xalqaro bozorlerde ishonchli, raqobatbardosh kimyoviy mahsulotlar bilan yetakchi bo‘lish.",
          "Asosiy mahsulot: TEXNIK NATRIY NITRATI",
          "Natriy azotnokislotali texnik (NaNO₃)",
          "Sifat: ≥99%",
          "Qo‘llanilishi: portlovchi moddalar, shisha va keramika sanoati, o‘g‘it ishlab chiqarish, metallga ishlov berish va boshqalar",
        ],
        button: "Batafsil",
      },
    },
  };

  // Select content based on lang prop, default to Russian if lang is invalid
  const selectedContent = content[lang] || content.ru;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % selectedContent.slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedContent.slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % selectedContent.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + selectedContent.slides.length) %
        selectedContent.slides.length
    );
  };

  return (
    <div className="bez-website-container">
      {/* Hero Slider */}
      <section className="bez-hero-slider">
        <div className="bez-slider-container">
          <div className="bez-slide bez-slide-active">
            <div className="bez-slide-content">
              <div className="bez-slide-icon">
                {selectedContent.slides[currentSlide].icon}
              </div>
              <h1 className="bez-slide-title">
                {selectedContent.slides[currentSlide].title}
              </h1>
              {/* <button className="bez-slide-button">{selectedContent.slides[currentSlide].subtitle}</button> */}
            </div>
          </div>

          <button
            className="bez-slider-nav bez-slider-prev"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="bez-slider-nav bez-slider-next"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>

          <div className="bez-slider-dots">
            {selectedContent.slides.map((_, index) => (
              <button
                key={index}
                className={`bez-dot ${
                  index === currentSlide ? "bez-dot-active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bez-about-section">
        <div className="bez-container">
          <div className="bez-about-content">
            <div className="bez-about-image">
              <img src={factory} alt="Fuel Station" className="bez-about-img" />
            </div>

            <div className="bez-about-text">
              <h2 className="bez-section-title">
                {selectedContent.about.sectionTitle}
              </h2>
              <h3 className="bez-company-title">
                {selectedContent.about.companyTitle}
              </h3>

              {selectedContent.about.description.map((paragraph, index) => (
                <p key={index} className="bez-about-description">
                  {paragraph}
                </p>
              ))}
              {/* <Link to={`/${lang}/${"about"}`}>
                <button className="bez-about-button">
                  {selectedContent.about.button}
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
