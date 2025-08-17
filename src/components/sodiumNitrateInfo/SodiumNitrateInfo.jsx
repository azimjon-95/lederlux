import React, { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Truck,
  Package,
  Award,
  Leaf,
  Eye,
  ChevronDown,
  ChevronUp,
  Droplets,
  Flame,
  Users,
  Factory,
  Beaker,
  Car,
} from "lucide-react";
import "./style.css";

const translations = {
  uz: {
    header: {
      titleOne: "NATRIY NITRATI",
      titleSub: "Natriy nitrat – oq rangli kristall modda bo‘lib, suvda yaxshi eriydi. U asosan qishloq xo‘jaligida mineral o‘g‘it sifatida, sanoatda shisha, keramika, portlovchi moddalar va kimyoviy reaktivlar tayyorlashda qo‘llaniladi.",
      title: "TEXNIK NATRIY NITRATI",
      subtitle: "",
      chemicalFormula: "NaNO₃",
      badges: {
        toxic: "Zaharli",
        flammable: "Yong'inga xavfli",
        hygroscopic: "Gigroskopik",
      },
    },
    sections: [
      { id: "safety", label: "Xavfsizlik" },
      { id: "transport", label: "Tashish va Saqlash" },
      { id: "application", label: "Qo'llash" },
      { id: "usage", label: "Foydalanish" },
    ],
    safety: {
      title: "Xavfsizlik Talablari",
      hazards: {
        title: "Asosiy Xavflar",
        items: [
          "Zaharli modda",
          "Yonuvchan emas, lekin yong'inga xavfli",
          "Kuchli oksidlovchi vosita",
          "Yonuvchan materiallarning o'z-o'zidan yonishini ta'minlaydi",
          "Terini qichishtitish ta'siriga ega",
        ],
      },
      protection: {
        title: "Himoya Vositalari",
        items: [
          "Maxsus kiyim va poyabzal",
          "Qo'llar uchun himoya (qo'lqoplar)",
          "Yuz va ko'zlar uchun himoya",
          "Ishdan keyin qo'llarni yaxshilab yuvish",
        ],
      },
      fire: {
        title: "Yong'in Holatida",
        items: [
          "Ko'p miqdorda suv",
          "OXP yoki OP tipidagi o't o'chirish vositalari",
          "Azot gazi",
          "Quruq qum",
          "Asbestli mato",
        ],
      },
    },
    transport: {
      title: "Tashish va Saqlash",
      transport: {
        title: "Tashish Talablari",
        items: [
          "Yopiq temir yo'l vagonlarida",
          "Yopiq transport vositalarida",
          "Xavfli yuklarni tashish qoidalariga muvofiq",
          "Har qanday turdagi palletlar yordamida",
          "Ikki pog'onada joylashtirish mumkin",
        ],
      },
      storage: {
        title: "Saqlash Sharoitlari",
        items: [
          "Yopiq omborda saqlash",
          "Qadoqlangan holda",
          "Quruq joyda",
          "Bolalar va hayvonlardan uzoqda",
          "Organik yonuvchan moddalardan alohida",
        ],
      },
      warranty: {
        title: "Ishlab Chiqaruvchi Kafolati",
        text: "GOST 828-77 talablariga muvofiqlik kafolatlanadi",
        highlight: "Yaroqlilik muddati: Cheklanmagan",
      },
    },
    application: {
      title: "Qo'llash Sohalari",
      overview:
        "texnik natriy nitrati (chili selitra) kimyo, shisha, metallurgiya va boshqa sanoat tarmoqlari uchun mo'ljallangan.",
      gradeA: {
        title: "A Markasi",
        text: "Yuqori sifatli qo'llash:",
        items: [
          "Metalllarni payvandlash va lehimlashda flyus tayyorlash",
          "Reaktivlar ishlab chiqarish",
          "Pirotexnik aralashmalar",
          "Optik shisha va kristall ishlab chiqarish",
          "Oksidlanuvchi moddalar miqdori cheklangan ishlab chiqarish",
        ],
      },
      gradeB: {
        title: "Б Markasi",
        text: "Umumiy sanoat qo'llanishi:",
        items: [
          "Metalllarni o'yish (travlenie)",
          "Volfram chiqindilarini eritish",
          "Texnik shishalarni tozalash",
          "Chakana savdo (o'g'it sifatida)",
        ],
      },
    },
    usage: {
      title: "Foydalanish Usuli",
      timing: {
        title: "Qo'llash Vaqti",
        text: "Erta bahorda tuproqni haydashda va ekish (sochish) paytida qatorlarga solinadi",
      },
      dosage: {
        title: "Dozalar",
        items: [
          { crop: "Stolda, em-xashak va shakar lavlagi", dose: "50 g/m²" },
          { crop: "Sabzavot ekinlari", dose: "40 g/m²" },
          { crop: "Gul va bezak o'simliklari", dose: "35-40 g/m²" },
        ],
      },
      liquid: {
        title: "Suyuq Ozuqa",
        recipe: {
          title: "Eritmani tayyorlash:",
          text: "100 g natriy selitra + 10 l suv = 10 m² uchun eritma",
          measurements: {
            title: "O'lchov birliklari:",
            items: [
              "1 choy qoshiq = 5 g",
              "1 osh qoshiq = 15 g",
              "1 gugurt qutisi = 25 g",
            ],
          },
        },
      },
      safety: {
        title: "Xavfsizlik Eslatmasi",
        text: "Muhim:",
        items: [
          "Rezina qo'lqoplar ishlatish",
          "Ishdan keyin qo'llarni yaxshilab yuvish",
          "Quruq joyda saqlash",
          "Bolalar va hayvonlardan uzoqda tutish",
        ],
      },
    },
  },
  ru: {
    header: {
      titleOne: "НАТРИЙ НИТРАТ",
      titleSub: "Натрий нитрат – белое кристаллическое вещество, хорошо растворимое в воде. Используется в основном в сельском хозяйстве как минеральное удобрение, а также в промышленности для производства стекла, керамики, взрывчатых веществ и химических реактивов.",
      title: "НАТРИЙ АЗОТНОКИСЛЫЙ ТЕХНИЧЕСКИЙ",
      subtitle: "",
      chemicalFormula: "NaNO₃",
      badges: {
        toxic: "Токсично",
        flammable: "Огнеопасно",
        hygroscopic: "Гигроскопично",
      },
    },
    sections: [
      { id: "safety", label: "Безопасность" },
      { id: "transport", label: "Транспортировка и хранение" },
      { id: "application", label: "Применение" },
      { id: "usage", label: "Использование" },
    ],
    safety: {
      title: "Требования к безопасности",
      hazards: {
        title: "Основные опасности",
        items: [
          "Токсичное вещество",
          "Не горючее, но пожароопасное",
          "Сильный окислитель",
          "Способствует самовозгоранию горючих материалов",
          "Вызывает раздражение кожи",
        ],
      },
      protection: {
        title: "Средства защиты",
        items: [
          "Специальная одежда и обувь",
          "Защита для рук (перчатки)",
          "Защита для лица и глаз",
          "Тщательное мытье рук после работы",
        ],
      },
      fire: {
        title: "В случае пожара",
        items: [
          "Большое количество воды",
          "Огнетушители типа ОХП или ОП",
          "Азотный газ",
          "Сухой песок",
          "Асбестовая ткань",
        ],
      },
    },
    transport: {
      title: "Транспортировка и хранение",
      transport: {
        title: "Требования к транспортировке",
        items: [
          "В закрытых железнодорожных вагонах",
          "В закрытых транспортных средствах",
          "В соответствии с правилами перевозки опасных грузов",
          "С использованием любых типов поддонов",
          "Допускается размещение в два яруса",
        ],
      },
      storage: {
        title: "Условия хранения",
        items: [
          "Хранение в закрытом складе",
          "В упакованном виде",
          "В сухом месте",
          "Вдали от детей и животных",
          "Отдельно от органических горючих веществ",
        ],
      },
      warranty: {
        title: "Гарантия производителя",
        text: "Гарантируется соответствие ГОСТ 828-77",
        highlight: "Срок годности: Неограничен",
      },
    },
    application: {
      title: "Области применения",
      overview:
        "Натрий нитрат (чилийская селитра) предназначен для химической, стекольной, металлургической и других отраслей промышленности.",
      gradeA: {
        title: "Марка А",
        text: "Высококачественное применение:",
        items: [
          "Изготовление флюсов для сварки и пайки металлов",
          "Производство реактивов",
          "Пиротехнические смеси",
          "Производство оптического стекла и кристаллов",
          "Производство с ограниченным содержанием окисляемых веществ",
        ],
      },
      gradeB: {
        title: "Марка Б",
        text: "Общее промышленное применение:",
        items: [
          "Травление металлов",
          "Плавка отходов вольфрама",
          "Очистка технического стекла",
          "Розничная торговля (в качестве удобрения)",
        ],
      },
    },
    usage: {
      title: "Способ использования",
      timing: {
        title: "Время применения",
        text: "Ранней весной при вспашке почвы и во время посева (разбросом) в ряды",
      },
      dosage: {
        title: "Дозировки",
        items: [
          { crop: "Столовая, кормовая и сахарная свекла", dose: "50 г/м²" },
          { crop: "Овощные культуры", dose: "40 г/м²" },
          { crop: "Цветы и декоративные растения", dose: "35-40 г/м²" },
        ],
      },
      liquid: {
        title: "Жидкая подкормка",
        recipe: {
          title: "Приготовление раствора:",
          text: "100 г натриевой селитры + 10 л воды = раствор для 10 м²",
          measurements: {
            title: "Единицы измерения:",
            items: [
              "1 чайная ложка = 5 г",
              "1 столовая ложка = 15 г",
              "1 спичечный коробок = 25 г",
            ],
          },
        },
      },
      safety: {
        title: "Напоминание о безопасности",
        text: "Важно:",
        items: [
          "Использовать резиновые перчатки",
          "Тщательно мыть руки после работы",
          "Хранить в сухом месте",
          "Держать вдали от детей и животных",
        ],
      },
    },
  },
  en: {
    header: {
      titleOne: "SODIUM NITRATE",
      titleSub: "Sodium nitrate is a white crystalline substance, highly soluble in water. It is primarily used in agriculture as a mineral fertilizer and in industry for the production of glass, ceramics, explosives, and chemical reagents.",
      title: "TECHNICAL SODIUM NITRATE",
      subtitle: "",
      chemicalFormula: "NaNO₃",
      badges: {
        toxic: "Toxic",
        flammable: "Fire hazard",
        hygroscopic: "Hygroscopic",
      },
    },
    sections: [
      { id: "safety", label: "Safety" },
      { id: "transport", label: "Transport and Storage" },
      { id: "application", label: "Applications" },
      { id: "usage", label: "Usage" },
    ],
    safety: {
      title: "Safety Requirements",
      hazards: {
        title: "Main Hazards",
        items: [
          "Toxic substance",
          "Non-flammable but fire-hazardous",
          "Strong oxidizer",
          "Promotes spontaneous combustion of flammable materials",
          "Causes skin irritation",
        ],
      },
      protection: {
        title: "Protective Equipment",
        items: [
          "Special clothing and footwear",
          "Hand protection (gloves)",
          "Face and eye protection",
          "Thorough hand washing after work",
        ],
      },
      fire: {
        title: "In Case of Fire",
        items: [
          "Large amounts of water",
          "OXP or OP type fire extinguishers",
          "Nitrogen gas",
          "Dry sand",
          "Asbestos cloth",
        ],
      },
    },
    transport: {
      title: "Transport and Storage",
      transport: {
        title: "Transport Requirements",
        items: [
          "In closed railway wagons",
          "In closed vehicles",
          "In accordance with hazardous goods transport regulations",
          "Using any type of pallets",
          "Can be stacked in two tiers",
        ],
      },
      storage: {
        title: "Storage Conditions",
        items: [
          "Store in a closed warehouse",
          "In packaged form",
          "In a dry place",
          "Away from children and animals",
          "Separate from organic flammable substances",
        ],
      },
      warranty: {
        title: "Manufacturer's Warranty",
        text: "Compliance with GOST 828-77 is guaranteed",
        highlight: "Shelf life: Unlimited",
      },
    },
    application: {
      title: "Application Areas",
      overview:
        "Sodium nitrate (Chile saltpeter) is intended for chemical, glass, metallurgical, and other industries.",
      gradeA: {
        title: "Grade A",
        text: "High-quality applications:",
        items: [
          "Preparation of fluxes for welding and soldering metals",
          "Production of reagents",
          "Pyrotechnic mixtures",
          "Production of optical glass and crystals",
          "Production with limited oxidizable substances",
        ],
      },
      gradeB: {
        title: "Grade B",
        text: "General industrial applications:",
        items: [
          "Metal etching",
          "Melting tungsten waste",
          "Cleaning technical glass",
          "Retail trade (as fertilizer)",
        ],
      },
    },
    usage: {
      title: "Usage Instructions",
      timing: {
        title: "Application Timing",
        text: "Early spring during soil plowing and sowing (scattering) in rows",
      },
      dosage: {
        title: "Dosages",
        items: [
          { crop: "Table, fodder, and sugar beets", dose: "50 g/m²" },
          { crop: "Vegetable crops", dose: "40 g/m²" },
          { crop: "Flowers and ornamental plants", dose: "35-40 g/m²" },
        ],
      },
      liquid: {
        title: "Liquid Fertilizer",
        recipe: {
          title: "Solution Preparation:",
          text: "100 g sodium nitrate + 10 L water = solution for 10 m²",
          measurements: {
            title: "Measurement Units:",
            items: [
              "1 teaspoon = 5 g",
              "1 tablespoon = 15 g",
              "1 matchbox = 25 g",
            ],
          },
        },
      },
      safety: {
        title: "Safety Reminder",
        text: "Important:",
        items: [
          "Use rubber gloves",
          "Wash hands thoroughly after work",
          "Store in a dry place",
          "Keep away from children and animals",
        ],
      },
    },
  },
};

const SodiumNitrateInfo = ({ lang = "uz" }) => {
  const [activeSection, setActiveSection] = useState("safety");
  const [expandedCards, setExpandedCards] = useState({});

  const t = translations[lang] || translations.uz; // Fallback to Uzbek if lang is invalid

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="sodium-nitrate-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="chemical-formula">
            <Beaker className="formula-icon" />
            <span>{t.header.chemicalFormula}</span>
          </div>
          <h1>{t.header.titleOne}</h1>
          <h3>({t.header.title})</h3>
          <p>{t.header.titleSub}</p>


          <p className="subtitle">{t.header.subtitle}</p>
          <div className="header-badges">
            <span className="badge warning">
              <AlertTriangle size={16} />
              {t.header.badges.toxic}
            </span>
            <span className="badge danger">
              <Flame size={16} />
              {t.header.badges.flammable}
            </span>
            <span className="badge info">
              <Droplets size={16} />
              {t.header.badges.hygroscopic}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          {t.sections.map((section) => {
            const Icon = sections.find((s) => s.id === section.id)?.icon;
            return (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? "active" : ""
                  }`}
                onClick={() => setActiveSection(section.id)}
              >
                {Icon && <Icon size={20} />}
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        {/* Safety Section */}
        {activeSection === "safety" && (
          <div className="section">
            <h2 className="section-title">
              <Shield className="section-icon" />
              {t.safety.title}
            </h2>

            <div className="cards-grid">
              <div className="card warning-card">
                <div className="card-header">
                  <AlertTriangle className="card-icon" />
                  <h3>{t.safety.hazards.title}</h3>
                </div>
                <div className="card-content">
                  <ul>
                    {t.safety.hazards.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card protection-card">
                <div className="card-header">
                  <Users className="card-icon" />
                  <h3>{t.safety.protection.title}</h3>
                </div>
                <div className="card-content">
                  <ul>
                    {t.safety.protection.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card fire-card">
                <div className="card-header">
                  <Flame className="card-icon" />
                  <h3>{t.safety.fire.title}</h3>
                </div>
                <div className="card-content">
                  <p>{t.safety.fire.title}:</p>
                  <ul>
                    {t.safety.fire.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transport Section */}
        {activeSection === "transport" && (
          <div className="section">
            <h2 className="section-title">
              <Truck className="section-icon" />
              {t.transport.title}
            </h2>

            <div className="cards-grid">
              <div className="card transport-card">
                <div className="card-header">
                  <Car className="card-icon" />
                  <h3>{t.transport.transport.title}</h3>
                </div>
                <div className="card-content">
                  <ul>
                    {t.transport.transport.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card storage-card">
                <div className="card-header">
                  <Package className="card-icon" />
                  <h3>{t.transport.storage.title}</h3>
                </div>
                <div className="card-content">
                  <ul>
                    {t.transport.storage.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card warranty-card">
                <div className="card-header">
                  <Award className="card-icon" />
                  <h3>{t.transport.warranty.title}</h3>
                </div>
                <div className="card-content">
                  <p>{t.transport.warranty.text}</p>
                  <div className="highlight">
                    <strong>{t.transport.warranty.highlight}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Section */}
        {activeSection === "application" && (
          <div className="section">
            <h2 className="section-title">
              <Factory className="section-icon" />
              {t.application.title}
            </h2>

            <div className="application-overview">
              <p>{t.application.overview}</p>
            </div>

            <div className="cards-grid">
              <div className="card grade-a-card">
                <div className="card-header">
                  <div className="grade-badge">A</div>
                  <h3>{t.application.gradeA.title}</h3>
                  <button
                    className="expand-btn"
                    onClick={() => toggleCard("gradeA")}
                  >
                    {expandedCards.gradeA ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
                <div
                  className={`card-content ${expandedCards.gradeA ? "expanded" : ""
                    }`}
                >
                  <p>
                    <strong>{t.application.gradeA.text}</strong>
                  </p>
                  <ul>
                    {t.application.gradeA.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card grade-b-card">
                <div className="card-header">
                  <div className="grade-badge">{lang === "uz" ? "Б" : "B"}</div>
                  <h3>{t.application.gradeB.title}</h3>
                  <button
                    className="expand-btn"
                    onClick={() => toggleCard("gradeB")}
                  >
                    {expandedCards.gradeB ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
                <div
                  className={`card-content ${expandedCards.gradeB ? "expanded" : ""
                    }`}
                >
                  <p>
                    <strong>{t.application.gradeB.text}</strong>
                  </p>
                  <ul>
                    {t.application.gradeB.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage Section */}
        {activeSection === "usage" && (
          <div className="section">
            <h2 className="section-title">
              <Leaf className="section-icon" />
              {t.usage.title}
            </h2>

            <div className="usage-timing">
              <div className="timing-card">
                <h3>{t.usage.timing.title}</h3>
                <p>{t.usage.timing.text}</p>
              </div>
            </div>

            <div className="cards-grid">
              <div className="card dosage-card">
                <div className="card-header">
                  <Eye className="card-icon" />
                  <h3>{t.usage.dosage.title}</h3>
                </div>
                <div className="card-content">
                  <div className="dosage-list">
                    {t.usage.dosage.items.map((item, index) => (
                      <div className="dosage-item" key={index}>
                        <span className="crop">{item.crop}</span>
                        <span className="dose">{item.dose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card liquid-card">
                <div className="card-header">
                  <Droplets className="card-icon" />
                  <h3>{t.usage.liquid.title}</h3>
                </div>
                <div className="card-content">
                  <div className="recipe">
                    <p>
                      <strong>{t.usage.liquid.recipe.title}</strong>
                    </p>
                    <p>{t.usage.liquid.recipe.text}</p>

                    <div className="measurements">
                      <h4>{t.usage.liquid.recipe.measurements.title}</h4>
                      <ul>
                        {t.usage.liquid.recipe.measurements.items.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card safety-reminder-card">
                <div className="card-header">
                  <Shield className="card-icon" />
                  <h3>{t.usage.safety.title}</h3>
                </div>
                <div className="card-content">
                  <div className="safety-points">
                    <p>
                      <strong>{t.usage.safety.text}</strong>
                    </p>
                    <ul>
                      {t.usage.safety.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define sections for icons (unchanged from original)
const sections = [
  { id: "safety", icon: Shield },
  { id: "transport", icon: Truck },
  { id: "application", icon: Factory },
  { id: "usage", icon: Leaf },
];

export default SodiumNitrateInfo;
