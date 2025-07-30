import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Circle,
  CloudSun,
  Moon,
  Search,
  User,
  Clock,
  Briefcase,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  MessageSquareText,
  Sun,
} from "lucide-react";
import { createContactAPI } from "@/services2/operations/contact";
const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    yourAge: "",
    gender: "",
    isFirstConsultation: "yes", // Default to 'yes'
    consultationType: "skin", // Default to 'skin'
    preferredDate: "2025-07-30", // Default to today's date
    preferredTime: "10 AM -12 PM", // Default to first slot
    phoneNumber: "",
    emailAddress: "",
    yourMessage: "",
    yourAddress: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleButtonClick = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data before API call:", formData);

    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      // Replace with your actual API endpoint
      const response = await createContactAPI(dataToSend);
      if (response?.data?.success) {
        setFormData({
          doctorName: "",
          yourAge: "",
          gender: "",
          isFirstConsultation: "yes",
          consultationType: "skin",
          preferredDate: "2025-07-30",
          preferredTime: "10 AM -12 PM",
          phoneNumber: "",
          emailAddress: "",
          yourMessage: "",
          yourAddress: "",
        });
      } else {
        const error = await response.json();
        alert(
          "Error booking consultation: " + (error.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Network error or API call failed:", error);
      alert("Could not connect to the server. Please try again later.");
    }
  };

  // Define the custom dark color
  const primaryDark = "#6a1817";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-4xl border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8 pb-4 relative">
          <span className="relative z-10">Book Your Consultation</span>
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full"
            style={{ backgroundColor: primaryDark }}
          ></span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Select Doctor */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <label
              htmlFor="doctorName"
              className="block text-lg font-bold text-gray-800 mb-3 flex items-center"
            >
              <Stethoscope className="mr-3 text-indigo-600" size={24} /> Select
              Your Doctor
            </label>
            <div className="relative">
              <select
                id="doctorName"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out text-base bg-white"
              >
                <option value="" disabled>
                  -- Please choose a doctor --
                </option>
                <option value="Dr. Mayank Bajpai">
                  Dr. Mayank Bajpai MBBS MD [Dermatology]
                </option>
                <option value="Dr. Shyam Rathoria">
                  Dr. Shyam Rathoria MD [Dermatology]
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tell us about yourself */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <User className="mr-3 text-indigo-600" size={24} /> Tell Us About
              Yourself
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="yourAge"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Age
                </label>
                <input
                  type="number"
                  id="yourAge"
                  name="yourAge"
                  placeholder="e.g., 30"
                  value={formData.yourAge}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Gender
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out text-base bg-white"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consulting for the first time? */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <Search className="mr-3 text-indigo-600" size={24} /> Consulting
              for the first time?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className={`flex-1 py-3 px-6 rounded-full border-2 transition-all duration-300 text-lg font-semibold flex items-center justify-center ${
                  formData.isFirstConsultation === "yes"
                    ? "text-white border-primaryDark shadow-lg"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor:
                    formData.isFirstConsultation === "yes"
                      ? primaryDark
                      : undefined,
                }}
                onClick={() => handleButtonClick("isFirstConsultation", "yes")}
              >
                {formData.isFirstConsultation === "yes" ? (
                  <CheckCircle className="inline mr-2" size={20} />
                ) : (
                  <Circle className="inline mr-2" size={20} />
                )}{" "}
                Yes
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-6 rounded-full border-2 transition-all duration-300 text-lg font-semibold flex items-center justify-center ${
                  formData.isFirstConsultation === "no"
                    ? "text-white border-primaryDark shadow-lg"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor:
                    formData.isFirstConsultation === "no"
                      ? primaryDark
                      : undefined,
                }}
                onClick={() => handleButtonClick("isFirstConsultation", "no")}
              >
                {formData.isFirstConsultation === "no" ? (
                  <CheckCircle className="inline mr-2" size={20} />
                ) : (
                  <Circle className="inline mr-2" size={20} />
                )}{" "}
                No
              </button>
            </div>
          </div>

          {/* Where can we help you? */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <Briefcase className="mr-3 text-indigo-600" size={24} /> Where Can
              We Help You?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 relative h-40 ${
                  formData.consultationType === "skin"
                    ? "border-primaryDark text-gray-900 font-semibold shadow-xl scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    formData.consultationType === "skin"
                      ? "#f0f4f8"
                      : undefined,
                }}
                onClick={() => handleButtonClick("consultationType", "skin")}
              >
                <img
                  src="https://assets.website-files.com/64b5f884a441113e015865bb/64b5f884a441113e01586616_Medical%20Icon%203.svg"
                  loading="lazy"
                  width="60"
                  alt=""
                  className="mb-3"
                />
                <span className="text-lg">Skin Consultation</span>
                {formData.consultationType === "skin" && (
                  <CheckCircle
                    className="absolute top-3 right-3 text-indigo-600"
                    size={24}
                  />
                )}
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 relative h-40 ${
                  formData.consultationType === "hair"
                    ? "border-primaryDark text-gray-900 font-semibold shadow-xl scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    formData.consultationType === "hair"
                      ? "#f0f4f8"
                      : undefined,
                }}
                onClick={() => handleButtonClick("consultationType", "hair")}
              >
                <img
                  src="https://assets.website-files.com/64b5f884a441113e015865bb/64b5f884a441113e01586612_Medical%20Icon%202.svg"
                  loading="lazy"
                  width="60"
                  alt=""
                  className="mb-3"
                />
                <span className="text-lg">Hair Consultation</span>
                {formData.consultationType === "hair" && (
                  <CheckCircle
                    className="absolute top-3 right-3 text-indigo-600"
                    size={24}
                  />
                )}
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 relative h-40 ${
                  formData.consultationType === "other"
                    ? "border-primaryDark text-gray-900 font-semibold shadow-xl scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    formData.consultationType === "other"
                      ? "#f0f4f8"
                      : undefined,
                }}
                onClick={() => handleButtonClick("consultationType", "other")}
              >
                <img
                  src="https://assets.website-files.com/64b5f884a441113e015865bb/64b5f884a441113e0158661c_Medical%20Icon%201.svg"
                  loading="lazy"
                  width="60"
                  alt=""
                  className="mb-3"
                />
                <span className="text-lg">General Inquiry</span>
                {formData.consultationType === "other" && (
                  <CheckCircle
                    className="absolute top-3 right-3 text-indigo-600"
                    size={24}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Contact Information & Preferred Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-bold text-gray-800 mb-3 flex items-center"
              >
                <Phone className="mr-3 text-indigo-600" size={24} /> Phone
                Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="e.g., +91 9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm text-base bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-lg font-bold text-gray-800 mb-3 flex items-center"
              >
                <Mail className="mr-3 text-indigo-600" size={24} /> Email
                Address
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                placeholder="e.g., your.email@example.com"
                value={formData.emailAddress}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm text-base bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="yourAddress"
                className="block text-lg font-bold text-gray-800 mb-3 flex items-center"
              >
                <MapPin className="mr-3 text-indigo-600" size={24} /> Your
                Address
              </label>
              <textarea
                id="yourAddress"
                name="yourAddress"
                placeholder="Enter your full address"
                value={formData.yourAddress}
                onChange={handleChange}
                rows="3"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm text-base bg-white"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="yourMessage"
                className="block text-lg font-bold text-gray-800 mb-3 flex items-center"
              >
                <MessageSquareText className="mr-3 text-indigo-600" size={24} />{" "}
                Your Message (Optional)
              </label>
              <textarea
                id="yourMessage"
                name="yourMessage"
                placeholder="Briefly describe your concerns or questions"
                value={formData.yourMessage}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm text-base bg-white"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-lg font-bold text-gray-800 mb-3 flex items-center"
              >
                <Calendar className="mr-3 text-indigo-600" size={24} /> Select
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm text-base bg-white"
              />
            </div>
          </div>

          {/* Available Slots */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <Clock className="mr-3 text-indigo-600" size={24} /> Available
              Slots
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 relative h-40 ${
                  formData.preferredTime === "10 AM -12 PM"
                    ? "border-primaryDark text-gray-900 font-semibold shadow-xl scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    formData.preferredTime === "10 AM -12 PM"
                      ? "#fcf8e3"
                      : undefined,
                }}
                onClick={() =>
                  handleButtonClick("preferredTime", "10 AM -12 PM")
                }
              >
                <CloudSun className="mb-2 text-yellow-600" size={36} />
                <span className="text-lg">10 AM - 12 PM</span>
                {formData.preferredTime === "10 AM -12 PM" && (
                  <span className="absolute -bottom-3 px-4 py-1.5 bg-yellow-200 text-yellow-900 text-sm rounded-full shadow-md">
                    Slots Available
                  </span>
                )}
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 relative h-40 ${
                  formData.preferredTime === "12 PM -3 PM"
                    ? "border-primaryDark text-gray-900 font-semibold shadow-xl scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    formData.preferredTime === "12 PM -3 PM"
                      ? "#fcf8e3"
                      : undefined,
                }}
                onClick={() =>
                  handleButtonClick("preferredTime", "12 PM -3 PM")
                }
              >
                <Sun className="mb-2 text-yellow-600" size={36} />
                <span className="text-lg">12 PM - 3 PM</span>
                {formData.preferredTime === "12 PM -3 PM" && (
                  <span className="absolute -bottom-3 px-4 py-1.5 bg-yellow-200 text-yellow-900 text-sm rounded-full shadow-md">
                    Slots Available
                  </span>
                )}
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 relative h-40 ${
                  formData.preferredTime === "3 PM -7 PM"
                    ? "border-primaryDark text-gray-900 font-semibold shadow-xl scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    formData.preferredTime === "3 PM -7 PM"
                      ? "#fcf8e3"
                      : undefined,
                }}
                onClick={() => handleButtonClick("preferredTime", "3 PM -7 PM")}
              >
                <Moon className="mb-2 text-yellow-600" size={36} />
                <span className="text-lg">3 PM - 7 PM</span>
                {formData.preferredTime === "3 PM -7 PM" && (
                  <span className="absolute -bottom-3 px-4 py-1.5 bg-yellow-200 text-yellow-900 text-sm rounded-full shadow-md">
                    Slots Available
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="py-3 px-8 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold text-lg shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out"
              onClick={() => window.history.back()}
            >
              BACK
            </button>
            <button
              type="submit"
              className="py-3 px-8 rounded-full text-white font-semibold text-lg shadow-lg hover:brightness-110 transition duration-300 ease-in-out transform hover:scale-105"
              style={{ backgroundColor: primaryDark }}
            >
              BOOK NOW
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
