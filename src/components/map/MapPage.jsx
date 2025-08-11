import React, { useState } from "react";
import { MapPin, Target, Search } from "lucide-react";
import "./style.css";

const ManzilMapPage = () => {
  const long = localStorage.getItem("lang") || localStorage.getItem("language")
  const currentLocation = {
    lat: 40.449883,
    lng: 71.82734,
  };

  // Translation object
  const translations = {
    en: {
      title: "LOCATION",
      locationText1: "Fergana Region, Tashlak District",
      locationText2: "Ahshak MFY, Besholish Street",
      coordinates: "Coordinates",
    },
    ru: {
      title: "МЕСТОНАХОЖДЕНИЕ",
      locationText1: "Ферганская область, Ташлакский район",
      locationText2: "Ахшак МФЙ, улица Бешолиш",
      coordinates: "Координаты",
    },
    uz: {
      title: "MANZIL",
      locationText1: "Farg'ona viloyati, Toshloq tumani",
      locationText2: "Ahshak MFY, Besholish ko'chasi",
      coordinates: "Koordinatalar",
    },
  };

  // Select the appropriate translation based on the 'long' prop, default to 'uz' if invalid
  const t = translations[long] || translations.uz;

  return (
    <div className="manzil-container">
      {/* Header */}
      <div className="header">
        <h1 className="title">{t.title}</h1>
      </div>

      {/* Map Container */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7471.768041511876!2d71.82734000000002!3d40.449883!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDI2JzU5LjYiTiA3McKwNDknMzguNCJF!5e1!3m2!1suz!2s!4v1754398596132!5m2!1suz!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Location Info */}
      <div className="location-info">
        <div className="info-item">
          <MapPin className="info-icon" size={20} />
          <div className="info-content">
            <p className="location-text">{t.locationText1}</p>
            <p className="location-text">{t.locationText2}</p>
          </div>
        </div>

        <div className="info-item coordinates">
          <Target className="info-icon" size={20} />
          <div className="info-content">
            <p className="coordinates-text">
              {t.coordinates}: {currentLocation.lat.toFixed(6)},{" "}
              {currentLocation.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManzilMapPage;
