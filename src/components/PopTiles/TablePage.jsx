import React, { useState } from "react";
import logo from "../../assets/logo.png"; // Ensure this path is correct
import PopTIlesQuestion from "./PopTilesQuestion";
 const {
   formData,
    config
 }= PopTIlesQuestion;

// A simple Modal component (kept in case it's used elsewhere, but not used for alerts)
const Modal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-auto text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// Validation messages
const validationMessages = {
  en: {
    answerRequired: "Please provide an answer to the question.",
    followupRequired: "Please provide a value for the follow-up question.",
    imageRequired: "Please upload at least one image or video.",
    checkboxRequired: "Please select at least one option.",
    inputRequired: 'Please specify details for "Other".',
    submitError: "Failed to submit the form. Please try again.",
    submitSuccess: "Form submitted successfully!",
    invalidDateFormat: "Please enter a valid date (YYYY-MM-DD)",
    invalidDate: "Please enter a valid date",
    pastDate: "Date cannot be in the past",
  },
  mr: {
    answerRequired: "कृपया प्रश्नाचे उत्तर द्या.",
    followupRequired: "कृपया फॉलो-अप प्रश्नासाठी मूल्य प्रदान करा.",
    imageRequired: "कृपया किमान एक प्रतिमा किंवा व्हिडिओ अपलोड करा.",
    checkboxRequired: "कृपया किमान एक पर्याय निवडा.",
    inputRequired: 'कृपया "इतर" साठी तपशील निर्दिष्ट करा.',
    submitError: "फॉर्म सबमिट करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    submitSuccess: "फॉर्म यशस्वीपणे सबमिट झाला!",
    invalidDateFormat: "कृपया वैध तारीख प्रविष्ट करा (YYYY-MM-DD)",
    invalidDate: "कृपया वैध तारीख प्रविष्ट करा",
    pastDate: "तारीख भूतकाळातील असू शकत नाही",
  },
};

function TablePage() {
  const [step, setStep] = useState(1);
  const [agreement, setAgreement] = useState(null);
  const [language, setLanguage] = useState("en"); // 'en' for English, 'mr' for Marathi
  const [alertMessage, setAlertMessage] = useState(null); // State for the custom alert message (not used for alerts)


  const handleAgreementChange = (value) => {
    setAgreement(value);
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  const handleNext = () => {
    if (agreement === null) {
      window.alert(validationMessages[language].answerRequired);
      return;
    }
    setStep((prev) => prev + 1);
    setAgreement(null);
  };

  const handleBack = () => {
    if (step === 1) return;
    setStep((prev) => prev - 1);
    setAgreement(null);
  };

  const handleSubmit = () => {
    if (agreement === null) {
      window.alert(validationMessages[language].answerRequired);
      return;
    }
    window.alert(validationMessages[language].submitSuccess);
    setStep(1);
    setAgreement(null);
  };

  const renderTable = (data) => (
    <table className="w-full border border-gray-300 text-sm mb-6">
      <thead className="bg-blue-100">
        <tr>
          {config[language].tableHeaders.map((header, idx) => (
            <th key={idx} className="border border-gray-300 p-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.no} className="hover:bg-blue-50">
            <td className="border border-gray-300 p-2">{item.no}</td>
            <td className="border border-gray-300 p-2">
              {language === "en" ? item.particulars_en : item.particulars_mr}
            </td>
            <td className="border border-gray-300 p-2">
              {language === "en" ? item.company_en : item.company_mr}
            </td>
            <td className="border border-gray-300 p-2">{item.specification}</td>
            <td className="border border-gray-300 p-2">{item.qty}</td>
            <td className="border border-gray-300 p-2">
              {language === "en" ? item.work_en : item.work_mr}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#e3f2fd] p-6 rounded-xl border-blue-200">
        {/* Header */}
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="YNK Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-gray-600 underline hover:text-blue-600"
          >
            {language === "mr" ? "English" : "मराठी"}
          </button>
        </div>

        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-1">
            {config[language].title}
          </h2>
          <h3 className="text-lg text-center text-gray-600 mb-6">
            {step === 1
              ? config[language].subtitles.popWork
              : step === 2
              ? config[language].subtitles.tilesWork
              : config[language].subtitles.gasPiping}
          </h3>

          {/* Form 1: POP Work */}
          {step === 1 && renderTable(formData.popWork)}

          {/* Form 2: Tiles Work */}
          {step === 2 && renderTable(formData.tilesWork)}

          {/* Form 3: Gas Piping */}
          {step === 3 && renderTable(formData.gasPiping)}

          <div className="flex items-center gap-6 mb-6">
            <p className="text-gray-700 font-medium">
              {config[language].question}
            </p>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="agreement"
                checked={agreement === "yes"}
                onChange={() => handleAgreementChange("yes")}
                className=""
              />
              <span className="text-gray-800">{config[language].yes}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="agreement"
                checked={agreement === "no"}
                onChange={() => handleAgreementChange("no")}
                className=""
              />
              <span className="text-gray-800">{config[language].no}</span>
            </label>
          </div>

          <div className="flex justify-between">
            <div>
              <button
                onClick={handleBack}
                className={`text-gray-600 py-2 rounded flex items-center gap-2 underline hover:text-blue-600${
                  step === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={step === 1}
              >
               
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                 
                  />
                </svg>
                {config[language].back}
              </button>
            </div>
            <div>
              <button
                onClick={step < 3 ? handleNext : handleSubmit}
                className={`text-white px-6 py-2 rounded ${
                  step < 3
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {step < 3 ? config[language].next : config[language].submit}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal component is kept but not used for alerts */}
      <Modal message={alertMessage} onClose={() => setAlertMessage(null)} />
    </div>
  );
}

export default TablePage;
