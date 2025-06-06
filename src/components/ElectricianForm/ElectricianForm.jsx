import React, { useState } from "react";
import logo from "../../assets/logo.png";
import ElectricianFormQuestion from "./ElectricianFormQuestion";
const { table1Data, table2Data, table3Data, config } = ElectricianFormQuestion;


function ElectricianForm() {
  const [language, setLanguage] = useState("en");
  const [currentTable, setCurrentTable] = useState(1);
  const [checklistStatus, setChecklistStatus] = useState({});

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

  // Table data
  
  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  const validateTable = (tableKey) => {
    if (!checklistStatus[tableKey]) {
      window.alert(validationMessages[language].answerRequired);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const currentTableKey = `table${currentTable}`;
    if (validateTable(currentTableKey) && currentTable < 3) {
      setCurrentTable(currentTable + 1);
    }
  };

  const handleBack = () => {
    if (currentTable > 1) {
      setCurrentTable(currentTable - 1);
    }
  };

  const handleSubmit = () => {
    // Check current table first
    const currentTableKey = `table${currentTable}`;
    if (!validateTable(currentTableKey)) {
      return;
    }

    // Check all tables
    const allValid = ["table1", "table2", "table3"].every(
      (key) => checklistStatus[key] === "yes" || checklistStatus[key] === "no"
    );

    if (!allValid) {
      window.alert(validationMessages[language].checkboxRequired);
      return;
    }

    // If all valid, show success alert
    window.alert(validationMessages[language].submitSuccess);
    console.log("Form submitted with checklist status:", checklistStatus);
    // Reset form after successful submission
    setCurrentTable(1);
    setChecklistStatus({});
  };

  const handleCheckboxChange = (table, value) => {
    setChecklistStatus((prev) => ({
      ...prev,
      [table]: value,
    }));
  };

  const renderQuestion = (tableKey) => (
    <div className="flex items-center space-x-4 mt-4">
      <p className="text-sm font-medium text-gray-700">
        {config[language].question}
      </p>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name={`understanding-${tableKey}`}
          checked={checklistStatus[tableKey] === "yes"}
          onChange={() => handleCheckboxChange(tableKey, "yes")}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded-full"
        />
        <span className="text-sm text-gray-700">
          {config[language].yesLabel}
        </span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name={`understanding-${tableKey}`}
          checked={checklistStatus[tableKey] === "no"}
          onChange={() => handleCheckboxChange(tableKey, "no")}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded-full"
        />
        <span className="text-sm text-gray-700">
          {config[language].noLabel}
        </span>
      </label>
    </div>
  );

  const renderTable1 = () => (
    <>
      <table className="w-full border border-gray-300 text-sm mb-6">
        <thead className="bg-blue-100">
          <tr>
            {config[language].table1Headers.map((header, idx) => (
              <th key={idx} className="border border-gray-300 p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table1Data.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="border border-gray-300 p-2">{row.item}</td>
              <td className="border border-gray-300 p-2">{row.company}</td>
              <td className="border border-gray-300 p-2">
                {row.specification}
              </td>
              <td className="border border-gray-300 p-2">{row.qty}</td>
              <td className="border border-gray-300 p-2">{row.work}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderQuestion("table1")}
    </>
  );

  const renderTable2 = () => (
    <>
      <table className="w-full border border-gray-300 text-sm mb-6">
        <thead className="bg-blue-100">
          <tr>
            {config[language].table2Headers.map((header, idx) => (
              <th
                key={idx}
                className="border impenetr border-gray-300 p-2 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table2Data.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="border border-gray-300 p-2">{row.item}</td>
              <td className="border border-gray-300 p-2">{row.company}</td>
              <td className="border border-gray-300 p-2">
                {row.specification}
              </td>
              <td className="border border-gray-300 p-2">{row.qty}</td>
              <td className="border border-gray-300 p-2">{row.work}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderQuestion("table2")}
    </>
  );

  const renderTable3 = () => (
    <>
      <table className="w-full border border-gray-300 text-sm mb-6">
        <thead className="bg-blue-100">
          <tr>
            {config[language].table3Headers.map((header, idx) => (
              <th key={idx} className="border border-gray-300 p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table3Data.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="border border-gray-300 p-2">{row.item}</td>
              <td className="border border-gray-300 p-2">{row.company}</td>
              <td className="border border-gray-300 p-2">
                {row.specification}
              </td>
              <td className="border border-gray-300 p-2">{row.qty}</td>
              <td className="border border-gray-300 p-2">{row.work}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderQuestion("table3")}
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#e3f2fd] p-6 rounded-xl border-blue-200">
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
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
          <h2 className="text-xl font-bold text-left text-gray-700 mb-1">
            {currentTable === 1
              ? config[language].title1
              : currentTable === 2
              ? config[language].title2
              : config[language].title3}
          </h2>

          {currentTable === 1 && renderTable1()}
          {currentTable === 2 && renderTable2()}
          {currentTable === 3 && renderTable3()}

          <div className="flex text-gray-600 justify-between px-4 mt-6 hover:text-blue-600">
            <button
              onClick={handleBack}
              className={`underline ${
                currentTable === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTable === 1}
            >
              {config[language].backButton}
            </button>
            {currentTable !== 3 ? (
              <button
                onClick={handleNext}
                className="bg-[#1e88e5] text-white px-6 py-2 rounded hover:bg-[#1565c0] ml-auto"
              >
                {config[language].nextButton}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-[#34c759] text-white px-6 py-2 rounded hover:bg-[#2ea44f] ml-auto"
              >
                {config[language].submitButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectricianForm;