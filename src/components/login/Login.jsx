import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Factory,
  Shield,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const translations = {
  uz: {
    title: "Administrator Paneli",
    usernamePlaceholder: "Foydalanuvchi nomi",
    passwordPlaceholder: "Parol",
    submitButton: "Kirish",
    loading: "Tekshirilmoqda...",
    securityBadge: "Xavfsiz ulanish",
    copyright: "© 2025 LiderLux MCHJ. Barcha huquqlar himoyalangan.",
    sidePanelTitle: "texnik natriy nitrati",
    molecularMass: "Molekular massa",
    solubility: "Erishuvchanlik",
    color: "Rang",
    molecularMassValue: "84.99 g/mol",
    solubilityValue: "Yuqori",
    colorValue: "Rangsiz",
    error: "Kirish amalga oshirilmadi. Iltimos, qayta urinib ko'ring.",
  },
  ru: {
    title: "Панель администратора",
    usernamePlaceholder: "Имя пользователя",
    passwordPlaceholder: "Пароль",
    submitButton: "Войти",
    loading: "Проверка...",
    securityBadge: "Безопасное соединение",
    copyright: "© 2025 LiderLux MCHJ. Все права защищены.",
    sidePanelTitle: "Нитрат натрия",
    molecularMass: "Молекулярная масса",
    solubility: "Растворимость",
    color: "Цвет",
    molecularMassValue: "84.99 г/моль",
    solubilityValue: "Высокая",
    colorValue: "Бесцветный",
    error: "Вход не удался. Пожалуйста, повторите попытку.",
  },
  en: {
    title: "Administrator Panel",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    submitButton: "Login",
    loading: "Checking...",
    securityBadge: "Secure Connection",
    copyright: "© 2025 LiderLux MCHJ. All rights reserved.",
    sidePanelTitle: "Sodium Nitrate",
    molecularMass: "Molecular Mass",
    solubility: "Solubility",
    color: "Color",
    molecularMassValue: "84.99 g/mol",
    solubilityValue: "High",
    colorValue: "Colorless",
    error: "Login failed. Please try again.",
  },
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("lang") || localStorage.getItem("language") || "ru"
  );

  useEffect(() => {
    localStorage.setItem("lang", selectedLang);
  }, [selectedLang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (loginError) setLoginError("");
  };

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setLoginError("");
    try {
      const res = await axios.post(
        "https://liderlux-two.vercel.app/api/admin/login",
        formData
      );
      // const res = await axios.post(
      //   "http://localhost:8080/api/admin/login",
      //   formData
      // );
      if (res.data?.innerData) {
        localStorage.setItem("token", res.data.innerData.token);
        navigate(`/admin/${res.data.innerData.token}/dashboard`); // Corrected: Call navigate as a function
      }
    } catch (err) {
      console.log(err);
      setLoginError(
        translations[selectedLang].error || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const t = translations[selectedLang];

  return (
    <div className="log-container">
      <div className="log-background">
        <div className="log-particles"></div>
        <div className="log-grid"></div>
      </div>

      <div className="log-content">
        <div className="log-header">
          <div className="log-logo">
            <Factory className="log-factory-icon" />
            <div className="log-formula">NaNO₃</div>
          </div>
          <h1 className="log-title">LiderLux</h1>
          <p className="log-subtitle">{t.title}</p>
        </div>

        <div className="log-form">
          <div className="log-input-group">
            <div className="log-input-container">
              <User className="log-input-icon" />
              <input
                type="text"
                name="username"
                placeholder={t.usernamePlaceholder}
                value={formData.username}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="log-input"
                required
              />
            </div>
          </div>

          <div className="log-input-group">
            <div className="log-input-container">
              <Lock className="log-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="log-input"
                required
              />
              <button
                type="button"
                className="log-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="log-error">
              <Shield size={16} />
              {loginError}
            </div>
          )}

          <button
            type="button"
            className={`log-submit-btn ${isLoading ? "log-loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className="log-btn-text">
              {isLoading ? t.loading : t.submitButton}
            </span>
            {!isLoading && <ChevronRight className="log-btn-icon" />}
            {isLoading && <div className="log-spinner"></div>}
          </button>
        </div>

        <div className="log-language-selector">
          <p
            className={selectedLang === "uz" ? "log-lang-active" : ""}
            onClick={() => handleLangChange("uz")}
          >
            uz
          </p>
          <p
            className={selectedLang === "ru" ? "log-lang-active" : ""}
            onClick={() => handleLangChange("ru")}
          >
            ru
          </p>
          <p
            className={selectedLang === "en" ? "log-lang-active" : ""}
            onClick={() => handleLangChange("en")}
          >
            en
          </p>
        </div>

        <div className="log-footer">
          <div className="log-security-badge">
            <Shield size={16} />
            <span>{t.securityBadge}</span>
          </div>
          <p className="log-copyright">{t.copyright}</p>
        </div>
      </div>

      <div className="log-side-panel">
        <div className="log-chemical-formula">
          <h3>{t.sidePanelTitle}</h3>
          <div className="log-formula-large">NaNO₃</div>
          <div className="log-properties">
            <div className="log-property">
              <span className="log-property-label">{t.molecularMass}:</span>
              <span className="log-property-value">{t.molecularMassValue}</span>
            </div>
            <div className="log-property">
              <span className="log-property-label">{t.solubility}:</span>
              <span className="log-property-value">{t.solubilityValue}</span>
            </div>
            <div className="log-property">
              <span className="log-property-label">{t.color}:</span>
              <span className="log-property-value">{t.colorValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
