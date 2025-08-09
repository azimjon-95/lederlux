import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Phone, Mail } from "lucide-react";
import { Select } from "antd";
import {
  toggleSearchPanel,
  setSearchQuery,
} from "../../context/actions/authSearch"; // Adjust path as needed
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/download.svg";
import "./style.css";

const { Option } = Select;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isSearchOpen, searchQuery } = useSelector((state) => state.search);
  const [language, setLanguage] = useState("ru");
  const searchPanelRef = useRef(null);

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    const validLangs = ["ru", "en", "uz"];
    const isValidLang = validLangs.includes(pathLang);

    if (isValidLang) {
      setLanguage(pathLang);
      localStorage.setItem("lang", pathLang);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        searchPanelRef.current &&
        !searchPanelRef.current.contains(event.target)
      ) {
        dispatch(toggleSearchPanel());
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, dispatch]);

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("lang", value);
    navigate(`/${value}`);
  };

  const handleSearchInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="bez-header">
      <div className="bez-header-top-content">
        <Link to="/" className="bez-contact-img">
          <img src={logo} alt="Company logo" />
        </Link>
        <a href="mailto:liderlux.info@gmail.com" className="bez-contact-info">
          <Mail size={16} />
          <span>liderlux.info@gmail.com</span>
        </a>
      </div>

      <div className="bez-header-actions">
        <Link to={`/${language}/${"contact"}`} className="bez-btn-icon">
          <Phone size={16} />
        </Link>
        <div className="bez-search-panel-box" ref={searchPanelRef}>
          {isSearchOpen && (
            <div className="bez-search-panel">
              <input
                type="text"
                className="bez-search-input"
                placeholder={
                  language === "ru"
                    ? "Введите запрос..."
                    : language === "en"
                      ? "Enter your search..."
                      : "Qidiruv so'zini kiriting..."
                }
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          )}
          <button
            className="bez-btn-search"
            onClick={() => dispatch(toggleSearchPanel())}
          >
            <Search size={16} />
            <span>
              {language === "ru"
                ? "Поиск"
                : language === "en"
                  ? "Search"
                  : "Qidirish"}
            </span>
          </button>
        </div>
        <div className="bez-language-selector">
          <Select value={language} onChange={handleLanguageChange}>
            <Option value="ru">Русский</Option>
            <Option value="en">English</Option>
            <Option value="uz">O'zbekcha</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default Header;


