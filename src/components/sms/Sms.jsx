import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  MessageCircle,
  Send,
  Star,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FiX } from "react-icons/fi";

const ContactForm = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    name: "",
    phone: "",
    telegram: "",
    description: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.name || !feedback.phone || !feedback.description) {
      showToast("Iltimos, barcha majburiy maydonlarni to'ldiring!", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const botToken = "8302017578:AAGVgLu6w9vuAzSlUki0nRg0jBI3IKzTH5M"; // O'zingizning bot tokeningizni qo'ying
      const chatId = "-4821339743"; // Guruh yoki kanal ID sini qo'ying
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      const messageText = `
                🆕 *Yangi mijoz xabari!*
                
                👤 *Ism-familiya:* ${feedback.name}
                📞 *Telefon:* ${feedback.phone}
                ${
                  feedback.telegram
                    ? `📱 *Telegram:* @${feedback.telegram}`
                    : ""
                }
                ⭐ *Reyting:* ${feedback.rating}/5
                
                📝 *Xabar:*
                ${feedback.description}
                
                ⏰ *Sana:* ${new Date().toLocaleString("uz-UZ")}
            `.trim();

      const response = await fetch(telegramApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        showToast("Xabar muvaffaqiyatli yuborildi!", "success");
        setIsSubmitted(true);
        setFeedback({
          name: "",
          phone: "",
          telegram: "",
          description: "",
          rating: 5,
        });
      } else {
        throw new Error("Telegram API error");
      }
    } catch (error) {
      showToast("Xabar yuborishda xatolik yuz berdi!", "error");
      console.error("Error sending message to Telegram:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFeedback((prev) => ({
      ...prev,
      rating,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="sms-container">
        <div className="sms-success-page">
          <div className="sms-success-icon">
            <CheckCircle size={80} />
          </div>
          <h2 className="sms-success-title">Xabar yuborildi!</h2>
          <p className="sms-success-text">
            Sizning xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan
            bog'lanamiz.
          </p>
          <button
            className="sms-btn sms-btn-secondary"
            onClick={() => setIsSubmitted(false)}
          >
            Yangi xabar yuborish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sms-container">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`sms-toast sms-toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="sms-form-wrapper">
        <button className="sms-close" onClick={() => navigate("/")}>
          <FiX size={24} />
        </button>

        <div className="sms-header">
          <h1 className="sms-title">Biz bilan bog'laning</h1>
          <p className="sms-subtitle">
            Sizning fikr-mulohazalaringiz biz uchun muhim. Xabar qoldiring!
          </p>
        </div>

        <div className="sms-form">
          <div className="sms-form-group">
            <label className="sms-label">
              <User size={20} />
              Ism-familiya *
            </label>
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleInputChange}
              className="sms-input"
              placeholder="To'liq ismingizni kiriting"
              required
            />
          </div>

          <div className="sms-form-group">
            <label className="sms-label">
              <Phone size={20} />
              Telefon raqami *
            </label>
            <input
              type="tel"
              name="phone"
              value={feedback.phone}
              onChange={handleInputChange}
              className="sms-input"
              placeholder="+998 90 123 45 67"
              required
            />
          </div>

          <div className="sms-form-group">
            <label className="sms-label">
              <MessageCircle size={20} />
              Telegram username
            </label>
            <input
              type="text"
              name="telegram"
              value={feedback.telegram}
              onChange={handleInputChange}
              className="sms-input"
              placeholder="username (@ belgisisiz)"
            />
          </div>

          <div className="sms-form-group">
            <label className="sms-label">
              <Star size={20} />
              Baholang
            </label>
            <div className="sms-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`sms-star ${
                    star <= feedback.rating ? "sms-star-active" : ""
                  }`}
                  onClick={() => handleRatingChange(star)}
                >
                  <Star size={24} />
                </button>
              ))}
            </div>
          </div>

          <div className="sms-form-group">
            <label className="sms-label">
              <MessageCircle size={20} />
              Xabar matni *
            </label>
            <textarea
              name="description"
              value={feedback.description}
              onChange={handleInputChange}
              className="sms-textarea"
              placeholder="Sizning xabaringiz yoki savolingizni yozing..."
              rows="5"
              required
            />
          </div>
          <div className="description_btn">
            <button onClick={() => navigate(-1)} className="description_button">
              Orqaga
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className={`sms-btn sms-btn-primary ${
                isSubmitting ? "sms-btn-loading" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="sms-spinner"></div>
                  Yuborilmoqda...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Xabar yuborish
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
