import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch } from "react-redux"; // Add this import
import { productApi } from "./context/productionApi"; // Adjust the import path if needed
import Header from "./components/header/Header";
import HomePage from "./components/Home";
import UniversalInfoPage from "./components/about/About";
import Footer from "./components/footer/Footer";
import ManzilMapPage from "./components/map/MapPage";
import ContactForm from "./components/sms/Sms";
import AdminLogin from "./components/login/Login";
import AdminDashboard from "./admin/Dashboard";
import ProductSinglePage from "./components/singlePage/ProductSinglePage";
// import './style.css';
import SodiumNitrateInfo from "./components/sodiumNitrateInfo/SodiumNitrateInfo";
import Products from "./components/products/Products";

// Simulated token validation function (replace with your actual logic)
const validateToken = (token) => {
  // Example: Check if token exists and is valid (e.g., via API or localStorage)
  // For demo, assume tokens are stored in localStorage or validated via an API
  return token && token.length > 0; // Replace with real validation
};

// Protected Route Component
function ProtectedRoute({ element }) {
  const { token } = useParams(); // Get token from URL
  const isAuthenticated = validateToken(token);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/ru/admin/servoce" replace />
  );
}

function RedirectToLang() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    const validLangs = ["ru", "en", "uz"];
    const storedLang = localStorage.getItem("lang");

    if (pathLang === "") {
      const lang =
        storedLang && validLangs.includes(storedLang) ? storedLang : "ru";
      localStorage.setItem("lang", lang);
      navigate(`/${lang}`, { replace: true });
    } else if (pathLang === "oz") {
      localStorage.setItem("lang", "uz");
      navigate("/uz", { replace: true });
    } else if (!validLangs.includes(pathLang)) {
      localStorage.setItem("lang", "ru");
      navigate("/ru", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this to get dispatch
  const lang = location.pathname.split("/")[1];
  const token = localStorage.getItem("token");

  const isSmsPage = location.pathname.includes("/sms");
  const isAdminLoginPage = location.pathname.includes("/admin/servoce");
  const isAdminDashboardPage = location.pathname.includes(
    `/admin/${token}/dashboard`
  );

  // Prefetch products data on app load
  useEffect(() => {
    dispatch(productApi.endpoints.getProducts.initiate());
  }, [dispatch]); // Runs once on mount, caches data via RTK Query

  const handleChatClick = () => {
    navigate(`/${lang}/sms`);
  };

  return (
    <>
      {/* Admin sahifada Header ko‘rsatilmaydi */}
      {!isAdminLoginPage && !isAdminDashboardPage && <Header />}

      <Routes>
        <Route path="/" element={<RedirectToLang />} />
        <Route path="/:lang/:contact" element={<UniversalInfoPage />} />
        <Route path="/:lang/map" element={<ManzilMapPage lang={lang} />} />
        <Route
          path="/:lang/nitrat"
          element={<SodiumNitrateInfo lang={lang} />}
        />
        <Route path="/:lang/products" element={<Products lang={lang} />} />
        <Route path="/:lang/sms" element={<ContactForm lang={lang} />} />
        <Route
          path="/admin/:token/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/:lang/admin/service"
          element={<AdminLogin lang={lang} />}
        />
        <Route path="/:name" element={<ProductSinglePage lang={lang} />} />
        <Route path="/ru" element={<HomePage lang="ru" />} />
        <Route path="/en" element={<HomePage lang="en" />} />
        <Route path="/uz" element={<HomePage lang="uz" />} />
        <Route path="*" element={<RedirectToLang />} />
      </Routes>

      {/* Admin sahifada Footer ko‘rsatilmaydi */}
      {!isAdminLoginPage && !isAdminDashboardPage && <Footer lang={lang} />}

      {/* SMS sahifada chat tugmasi ko‘rsatilmaydi */}
      {!isSmsPage && !isAdminLoginPage && !isAdminDashboardPage && (
        <div className="chat-button-container" onClick={handleChatClick}>
          <div className="chat-ripples">
            <div className="ripple ripple-1"></div>
            <div className="ripple ripple-2"></div>
            <div className="ripple ripple-3"></div>
          </div>
          <div className="chat-button">
            <div className="chat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;