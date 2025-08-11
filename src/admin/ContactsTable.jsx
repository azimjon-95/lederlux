import React, { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Loader2 } from "lucide-react";
import {
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "../context/contactApi";
import "./css/contact.css";

// Translation object
const translations = {
  en: {
    title: "Contacts",
    addContact: "Add Contact",
    loading: "Loading...",
    error: "An error occurred!",
    noContacts: "No contacts found",
    salesDepartment: "Sales Department",
    exportDepartment: "Export Department",
    purchaseDepartment: "Purchase Department",
    hrDepartment: "HR Department",
    infoDesk: "Info Desk",
    reception: "Reception",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    editContact: "Edit Contact",
    newContact: "New Contact",
    cancel: "Cancel",
    save: "Save",
    update: "Update",
    deleteConfirm: "Are you sure you want to delete this contact?",
    salesDepartmentRequired: "Sales Department is required",
    exportDepartmentRequired: "Export Department is required",
    purchaseDepartmentRequired: "Purchase Department is required",
    hrDepartmentRequired: "HR Department is required",
    infoDeskRequired: "Info Desk is required",
    receptionRequired: "Reception is required",
    telegramLink: "Telegram Link",
    whatsappLink: "WhatsApp Link",
    telegramPlaceholder: "https://t.me/username",
    whatsappPlaceholder: "https://wa.me/998901234567",
    submitError: "Error saving contact",
  },
  ru: {
    title: "Контакты",
    addContact: "Добавить контакт",
    loading: "Загрузка...",
    error: "Произошла ошибка!",
    noContacts: "Контакты не найдены",
    salesDepartment: "Отдел продаж",
    exportDepartment: "Отдел экспорта",
    purchaseDepartment: "Отдел закупок",
    hrDepartment: "Отдел кадров",
    infoDesk: "Информационное бюро",
    reception: "Ресепшн",
    actions: "Действия",
    edit: "Редактировать",
    delete: "Удалить",
    editContact: "Редактировать контакт",
    newContact: "Новый контакт",
    cancel: "Отмена",
    save: "Сохранить",
    update: "Обновить",
    deleteConfirm: "Вы уверены, что хотите удалить этот контакт?",
    salesDepartmentRequired: "Отдел продаж обязателен",
    exportDepartmentRequired: "Отдел экспорта обязателен",
    purchaseDepartmentRequired: "Отдел закупок обязателен",
    hrDepartmentRequired: "Отдел кадров обязателен",
    infoDeskRequired: "Информационное бюро обязательно",
    receptionRequired: "Ресепшн обязателен",
    telegramLink: "Ссылка на Telegram",
    whatsappLink: "Ссылка на WhatsApp",
    telegramPlaceholder: "https://t.me/username",
    whatsappPlaceholder: "https://wa.me/998901234567",
    submitError: "Ошибка при сохранении контакта",
  },
  uz: {
    title: "Kontaktlar",
    addContact: "Kontakt Qo'shish",
    loading: "Yuklanmoqda...",
    error: "Xatolik yuz berdi!",
    noContacts: "Kontaktlar topilmadi",
    salesDepartment: "Sotuv Bo'limi",
    exportDepartment: "Eksport Bo'limi",
    purchaseDepartment: "Sotib Olish Bo'limi",
    hrDepartment: "HR Bo'limi",
    infoDesk: "Ma'lumot Byurosi",
    reception: "Qabulxona",
    actions: "Amallar",
    edit: "Tahrirlash",
    delete: "O'chirish",
    editContact: "Kontaktni Tahrirlash",
    newContact: "Yangi Kontakt",
    cancel: "Bekor qilish",
    save: "Saqlash",
    update: "Yangilash",
    deleteConfirm: "Kontaktni o'chirishni xohlaysizmi?",
    salesDepartmentRequired: "Sotuv Bo'limi majburiy",
    exportDepartmentRequired: "Eksport Bo'limi majburiy",
    purchaseDepartmentRequired: "Sotib Olish Bo'limi majburiy",
    hrDepartmentRequired: "HR Bo'limi majburiy",
    infoDeskRequired: "Ma'lumot Byurosi majburiy",
    receptionRequired: "Qabulxona majburiy",
    telegramLink: "Telegram Havolasi",
    whatsappLink: "WhatsApp Havolasi",
    telegramPlaceholder: "https://t.me/username",
    whatsappPlaceholder: "https://wa.me/998901234567",
    submitError: "Kontaktni saqlashda xatolik yuz berdi",
  },
};

const ContactsTable = ({ lang, searchTerm = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    salesDepartment: "",
    exportDepartment: "",
    purchaseDepartment: "",
    // hrDepartment: "",
    // infoDesk: "",s
    // reception: "",
    telegramLink: "",
    whatsappLink: "",
  });
  const [errors, setErrors] = useState({});

  // RTK Query hooks
  const {
    data: contacts = [],
    isLoading,
    error,
    refetch,
  } = useGetContactsQuery();
  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  // Get translations based on lang prop
  const t = translations[lang] || translations.uz;

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.salesDepartment.trim())
      newErrors.salesDepartment = t.salesDepartmentRequired;
    if (!formData.exportDepartment.trim())
      newErrors.exportDepartment = t.exportDepartmentRequired;
    if (!formData.purchaseDepartment.trim())
      newErrors.purchaseDepartment = t.purchaseDepartmentRequired;
    // if (!formData.hrDepartment.trim())
    //   newErrors.hrDepartment = t.hrDepartmentRequired;
    // if (!formData.infoDesk.trim()) newErrors.infoDesk = t.infoDeskRequired;
    // if (!formData.reception.trim()) newErrors.reception = t.receptionRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openModal = (contact = null) => {
    if (contact) {
      setEditingContact(contact);
      setFormData(contact);
    } else {
      setEditingContact(null);
      setFormData({
        salesDepartment: "",
        exportDepartment: "",
        purchaseDepartment: "",
        // hrDepartment: "",
        // infoDesk: "",
        // reception: "",
        telegramLink: "",
        whatsappLink: "",
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
    setFormData({
      salesDepartment: "",
      exportDepartment: "",
      purchaseDepartment: "",
      //   hrDepartment: "",
      //   infoDesk: "",
      //   reception: "",
      telegramLink: "",
      whatsappLink: "",
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingContact) {
        await updateContact({ id: editingContact._id, ...formData }).unwrap();
      } else {
        await createContact(formData).unwrap();
      }
      closeModal();
      refetch();
    } catch (error) {
      console.error("Error saving contact:", error);
      setErrors({ submit: t.submitError });
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      await deleteContact(contactId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Filter contacts based on searchTerm
  const filteredContacts =
    contacts?.innerData?.filter(
      (contact) =>
        contact.salesDepartment
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        contact.exportDepartment
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        contact.purchaseDepartment
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        // contact.hrDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // contact.infoDesk.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // contact.reception.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.telegramLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.whatsappLink.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="vfo-contacts-container">
      <div className="vfo-header">
        <h2 className="vfo-title">{t.title}</h2>
        <button
          className="vfo-btn vfo-btn-primary"
          onClick={() => openModal()}
          disabled={isLoading}
        >
          <Plus size={16} />
          {t.addContact}
        </button>
      </div>

      {isLoading && (
        <div className="vfo-loading">
          <Loader2 size={24} className="vfo-spinner" />
          <span>{t.loading}</span>
        </div>
      )}

      {error && (
        <div className="vfo-error">
          {t.error} {error?.data?.message || "Error loading contacts"}
          <button
            className="vfo-btn vfo-btn-primary vfo-btn-sm"
            onClick={refetch}
          >
            {t.retry || "Retry"}
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="vfo-table-wrapper">
          <table className="vfo-table">
            <thead>
              <tr>
                <th>{t.salesDepartment}</th>
                <th>{t.exportDepartment}</th>
                <th>{t.purchaseDepartment}</th>
                {/* <th>{t.hrDepartment}</th> */}
                {/* <th>{t.infoDesk}</th> */}
                {/* <th>{t.reception}</th> */}
                <th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="vfo-empty">
                    {t.noContacts}
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.salesDepartment}</td>
                    <td>{contact.exportDepartment}</td>
                    <td>{contact.purchaseDepartment}</td>
                    {/* <td>{contact.hrDepartment}</td> */}
                    {/* <td>{contact.infoDesk}</td> */}
                    {/* <td>{contact.reception}</td> */}
                    <td>
                      <div className="vfo-actions">
                        <button
                          className="vfo-btn vfo-btn-edit"
                          onClick={() => openModal(contact)}
                          title={t.edit}
                          disabled={isDeleting || isUpdating}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="vfo-btn vfo-btn-delete"
                          onClick={() => handleDelete(contact._id)}
                          title={t.delete}
                          disabled={isDeleting || isUpdating}
                        >
                          {isDeleting ? (
                            <Loader2 size={14} className="vfo-spinner" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="vfo-modal-overlay" onClick={closeModal}>
          <div className="vfo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vfo-modal-header">
              <h3>{editingContact ? t.editContact : t.newContact}</h3>
              <button
                className="vfo-btn vfo-btn-close"
                onClick={closeModal}
                disabled={isCreating || isUpdating}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="vfo-form">
              <div className="vfo-form-grid">
                <div className="vfo-form-group">
                  <label>{t.salesDepartment} *</label>
                  <input
                    type="text"
                    name="salesDepartment"
                    value={formData.salesDepartment}
                    onChange={handleInputChange}
                    className={`vfo-input ${
                      errors.salesDepartment ? "vfo-input-error" : ""
                    }`}
                    placeholder={t.salesDepartment}
                  />
                  {errors.salesDepartment && (
                    <span className="vfo-error">{errors.salesDepartment}</span>
                  )}
                </div>

                <div className="vfo-form-group">
                  <label>{t.exportDepartment} *</label>
                  <input
                    type="text"
                    name="exportDepartment"
                    value={formData.exportDepartment}
                    onChange={handleInputChange}
                    className={`vfo-input ${
                      errors.exportDepartment ? "vfo-input-error" : ""
                    }`}
                    placeholder={t.exportDepartment}
                  />
                  {errors.exportDepartment && (
                    <span className="vfo-error">{errors.exportDepartment}</span>
                  )}
                </div>

                <div className="vfo-form-group">
                  <label>{t.purchaseDepartment} *</label>
                  <input
                    type="text"
                    name="purchaseDepartment"
                    value={formData.purchaseDepartment}
                    onChange={handleInputChange}
                    className={`vfo-input ${
                      errors.purchaseDepartment ? "vfo-input-error" : ""
                    }`}
                    placeholder={t.purchaseDepartment}
                  />
                  {errors.purchaseDepartment && (
                    <span className="vfo-error">
                      {errors.purchaseDepartment}
                    </span>
                  )}
                </div>

                {/* <div className="vfo-form-group">
                                    <label>{t.hrDepartment} *</label>
                                    <input
                                        type="text"
                                        name="hrDepartment"
                                        value={formData.hrDepartment}
                                        onChange={handleInputChange}
                                        className={`vfo-input ${errors.hrDepartment ? 'vfo-input-error' : ''}`}
                                        placeholder={t.hrDepartment}
                                    />
                                    {errors.hrDepartment && <span className="vfo-error">{errors.hrDepartment}</span>}
                                </div> */}

                {/* <div className="vfo-form-group">
                                    <label>{t.infoDesk} *</label>
                                    <input
                                        type="text"
                                        name="infoDesk"
                                        value={formData.infoDesk}
                                        onChange={handleInputChange}
                                        className={`vfo-input ${errors.infoDesk ? 'vfo-input-error' : ''}`}
                                        placeholder={t.infoDesk}
                                    />
                                    {errors.infoDesk && <span className="vfo-error">{errors.infoDesk}</span>}
                                </div> */}

                {/* <div className="vfo-form-group">
                                    <label>{t.reception} *</label>
                                    <input
                                        type="text"
                                        name="reception"
                                        value={formData.reception}
                                        onChange={handleInputChange}
                                        className={`vfo-input ${errors.reception ? 'vfo-input-error' : ''}`}
                                        placeholder={t.reception}
                                    />
                                    {errors.reception && <span className="vfo-error">{errors.reception}</span>}
                                </div> */}

                <div className="vfo-form-group">
                  <label>{t.telegramLink}</label>
                  <input
                    type="url"
                    name="telegramLink"
                    value={formData.telegramLink}
                    onChange={handleInputChange}
                    placeholder={t.telegramPlaceholder}
                    className="vfo-input"
                  />
                </div>

                <div className="vfo-form-group">
                  <label>{t.whatsappLink}</label>
                  <input
                    type="url"
                    name="whatsappLink"
                    value={formData.whatsappLink}
                    onChange={handleInputChange}
                    placeholder={t.whatsappPlaceholder}
                    className="vfo-input"
                  />
                </div>
              </div>

              {errors.submit && (
                <div className="vfo-error-message">{errors.submit}</div>
              )}

              <div className="vfo-modal-footer">
                <button
                  type="button"
                  className="vfo-btn vfo-btn-secondary"
                  onClick={closeModal}
                  disabled={isCreating || isUpdating}
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="vfo-btn vfo-btn-primary"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? (
                    <Loader2 size={16} className="vfo-spinner" />
                  ) : (
                    <Save size={16} />
                  )}
                  {editingContact ? t.update : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsTable;
