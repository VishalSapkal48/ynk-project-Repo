import React, { useState } from "react";
import logo from "../../assets/logo.png"; // Ensure this path is correct
import InspectionChecklistQuestion from "./InspectionChecklistQuestion";

const {
  firstImageData,
  secondImageData,
  thirdImageData,
  config,
}  = InspectionChecklistQuestion;

function InspectionChecklist() {
  const [language, setLanguage] = useState("en"); // 'en' for English, 'mr' for Marathi
  const [currentTable, setCurrentTable] = useState("first"); // 'first', 'second', or 'third'
  const [checklistStatus, setChecklistStatus] = useState({}); // Initialize empty to require manual selection

  // Data for the first image (Inspection Checklist)
 

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  const validateCurrentTable = () => {
    let dataToValidate = [];
    let tableName = "";
    if (currentTable === "first") {
      dataToValidate = firstImageData;
      tableName = "first";
    } else if (currentTable === "second") {
      dataToValidate = secondImageData;
      tableName = "second";
    } else if (currentTable === "third") {
      dataToValidate = thirdImageData;
      tableName = "third";
    }

    const unselectedItems = dataToValidate.filter((item, index) => {
      const groupKey = `${tableName}-${
        item.no !== undefined && item.no !== null && item.no !== ""
          ? item.no
          : `index${index}`
      }-${index}`;
      return (
        !checklistStatus[`${groupKey}-done`] &&
        !checklistStatus[`${groupKey}-pending`] &&
        !checklistStatus[`${groupKey}-notapplicable`]
      );
    });

    return unselectedItems.length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentTable()) {
      window.alert(config[language].validationMessage);
      return;
    }

    if (currentTable === "first") {
      setCurrentTable("second");
    } else if (currentTable === "second") {
      setCurrentTable("third");
    }
  };

  const handleBack = () => {
    if (currentTable === "third") {
      setCurrentTable("second");
    } else if (currentTable === "second") {
      setCurrentTable("first");
    }
  };

  const handleChecklistChange = (table, no, index, status) => {
    const groupKey = `${table}-${
      no !== undefined && no !== null && no !== "" ? no : `index${index}`
    }-${index}`;
    setChecklistStatus((prev) => {
      const newStatus = { ...prev };
      ["done", "pending", "notapplicable"].forEach((option) => {
        const key = `${groupKey}-${option}`;
        if (option === status) {
          newStatus[key] = true;
        } else {
          delete newStatus[key];
        }
      });
      return newStatus;
    });
  };

  const handleSubmit = () => {
    if (!validateCurrentTable()) {
      window.alert(config[language].validationMessage);
      return;
    }
    window.alert(config[language].popupMessage);
  };

  const renderTable = (data, tableName, title) => (
    <>
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
          {data.map((item, index) => (
            <tr
              key={`${
                item.no !== undefined && item.no !== null && item.no !== ""
                  ? item.no
                  : `index${index}`
              }-${index}`}
              className="hover:bg-blue-50"
            >
              <td className="border border-gray-300 p-2">{item.no}</td>
              <td className="border border-gray-300 p-2">
                {language === "en" ? item.item_en : item.item_mr}
              </td>
              <td className="border border-gray-300 p-2">
                {(language === "en"
                  ? item.checking_points_en
                  : item.checking_points_mr
                )?.length > 0
                  ? (language === "en"
                      ? item.checking_points_en
                      : item.checking_points_mr
                    ).join(", ")
                  : "-"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="radio"
                  name={`${tableName}-${
                    item.no !== undefined && item.no !== null && item.no !== ""
                      ? item.no
                      : `index${index}`
                  }-${index}`}
                  checked={
                    checklistStatus[
                      `${tableName}-${
                        item.no !== undefined &&
                        item.no !== null &&
                        item.no !== ""
                          ? item.no
                          : `index${index}`
                      }-${index}-done`
                    ] || false
                  }
                  onChange={() =>
                    handleChecklistChange(tableName, item.no, index, "done")
                  }
                  className="accent-gray-600"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="radio"
                  name={`${tableName}-${
                    item.no !== undefined && item.no !== null && item.no !== ""
                      ? item.no
                      : `index${index}`
                  }-${index}`}
                  checked={
                    checklistStatus[
                      `${tableName}-${
                        item.no !== undefined &&
                        item.no !== null &&
                        item.no !== ""
                          ? item.no
                          : `index${index}`
                      }-${index}-pending`
                    ] || false
                  }
                  onChange={() =>
                    handleChecklistChange(tableName, item.no, index, "pending")
                  }
                  className="accent-gray-600"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="radio"
                  name={`${tableName}-${
                    item.no !== undefined && item.no !== null && item.no !== ""
                      ? item.no
                      : `index${index}`
                  }-${index}`}
                  checked={
                    checklistStatus[
                      `${tableName}-${
                        item.no !== undefined &&
                        item.no !== null &&
                        item.no !== ""
                          ? item.no
                          : `index${index}`
                      }-${index}-notapplicable`
                    ] || false
                  }
                  onChange={() =>
                    handleChecklistChange(
                      tableName,
                      item.no,
                      index,
                      "notapplicable"
                    )
                  }
                  className="accent-gray-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between px-4 text">
        <button
          onClick={handleBack}
          className={`underline text-grey-600 hover:text-blue-800 ${
            currentTable === "first" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentTable === "first"}
        >
          {config[language].backButton}
        </button>
        <div className="flex space-x-4">
          {currentTable !== "third" && (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {config[language].nextButton}
            </button>
          )}
          {currentTable === "third" && (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              {config[language].submitButton}
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#e3f2fd] p-6 rounded-xl border-blue-200">
        {/* Header Section */}
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="YNK Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-grey-600 underline hover:text-blue-800"
          >
            {language === "mr" ? "English" : "मराठी"}
          </button>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-left text-gray-700 mb-1">
            {currentTable === "first"
              ? config[language].titleFirst
              : currentTable === "second"
              ? config[language].titleSecond
              : config[language].titleThird}
          </h2>
          <div className="text-left text-gray-500 mb-6">
            <p>{config[language].branchName}</p>
            <p>{config[language].ownerName}</p>
            <p>{config[language].dateLabel}</p>
            <p>{config[language].mobileLabel}</p>
          </div>

          {/* Render the appropriate table */}
          {currentTable === "first" &&
            renderTable(firstImageData, "first", config[language].titleFirst)}
          {currentTable === "second" &&
            renderTable(
              secondImageData,
              "second",
              config[language].titleSecond
            )}
          {currentTable === "third" &&
            renderTable(thirdImageData, "third", config[language].titleThird)}
        </div>
      </div>
    </div>
  );
}

export default InspectionChecklist;
