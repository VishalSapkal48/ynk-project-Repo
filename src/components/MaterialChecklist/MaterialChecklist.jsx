import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png'; // Ensure this path is correct
import MaterialCheckListQuestion from './MaterialCheckListQuestion'; // Import the checklist data

function MaterialChecklist() {
  const [agreement, setAgreement] = useState(null);
  const [materialAvailability, setMaterialAvailability] = useState({});
  const [language, setLanguage] = useState('en');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  
  const {
    categories,
     checklistData,
     config
  }=MaterialCheckListQuestion;

  // Filter items for the current category
  const currentCategory = categories[currentCategoryIndex];
  const filteredItems = checklistData.filter(item => item.category === currentCategory);

  const handleAgreementChange = (value) => {
    setAgreement(value);
  };

  const handleAvailabilityChange = (category, no, value) => {
    setMaterialAvailability((prev) => ({
      ...prev,
      [`${category}-${no}`]: value,
    }));
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const handleNext = () => {
    // Validate that all items in the current category have been answered before moving to the next
    const currentItems = checklistData.filter(item => item.category === currentCategory);
    const allCurrentItemsSelected = currentItems.every(
      (item) => materialAvailability[`${item.category}-${item.no}`] !== undefined
    );
    if (!allCurrentItemsSelected) {
      alert(config[language].availabilityError);
      return;
    }
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all items have an availability selection
    const allMaterialsSelected = checklistData.every(
      (item) => materialAvailability[`${item.category}-${item.no}`] !== undefined
    );
    if (!allMaterialsSelected) {
      alert(config[language].availabilityError);
      return;
    }

    // Check agreement only if on the last category
    if (currentCategoryIndex === categories.length - 1 && agreement === null) {
      alert(config[language].agreementError);
      return;
    }

    // Prepare formatted data with full particulars in the selected language
    const formattedData = checklistData.reduce((acc, item) => {
      const particular = item[`particulars_${language}`] || item.particulars_en;
      const availability = materialAvailability[`${item.category}-${item.no}`] === 'yes' ? config[language].availabilityYes :
        materialAvailability[`${item.category}-${item.no}`] === 'no' ? config[language].availabilityNo :
          (language === 'mr' ? 'उत्तर दिले नाही' : 'Not answered');
      return {
        ...acc,
        [particular]: availability,
      };
    }, {
      [config[language].question]: agreement === 'yes' ? config[language].yes :
        agreement === 'no' ? config[language].no :
          (language === 'mr' ? 'उत्तर दिले नाही' : 'Not answered'),
    });

    // Log formatted data to console
    console.log('Form Data:', formattedData);

    // Send form data to API using Axios
    try {
      const response = await axios.post('API Caaling ', {
        materialAvailability,
        agreement,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log the API response to console
      console.log('API Response:', response.data);

      // Show success alert
      alert(config[language].successMessage);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(config[language].errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#dbeeff] p-6 rounded-xl border border-blue-200">
        {/* Header */}
        <div className="bg-white flex justify-between items-center mb-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="YNK Logo" className="h-12 w-12" />
            <h1 className="text-xl font-bold text-gray-800">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-gray-600 underline  hover:text-blue-600 text-sm"
          >
            {language === 'en' ? 'मराठी' : 'English'}
          </button>
        </div>
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-left text-gray-700 mb-1">
            {config[language].title}
          </h2>
          <div className="text-left text-gray-500 mb-4">
            <p>{config[language].branchName}</p>
            <p>{config[language].ownerName}</p>
            <p>{config[language].dateLabel}</p>
            <p>{config[language].mobileLabel}</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {currentCategory}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm mb-6">
              <thead className="bg-blue-100">
                <tr>
                  {config[language].tableHeaders.map((header, idx) => (
                    <th
                      key={idx}
                      className={`border border-gray-300 p-2 ${idx === 4 || idx === 5 ? 'text-center' : 'text-center'
                        }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={`${item.category}-${item.no}`} className="  hover:bg-blue-50">
                    <td className="border border-gray-300 p-2">{item.no}</td>
                    <td className="border border-gray-300 p-2">
                      {language === 'en' ? item.particulars_en : item.particulars_mr}
                    </td>
                    <td className="border border-gray-300 p-2">{item.size}</td>
                    <td className="border border-gray-300 p-2">{item.qty}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <label className="flex items-center justify-center gap-2">
                        <input
                          type="radio"
                          name={`availability-${item.category}-${item.no}`}
                          checked={materialAvailability[`${item.category}-${item.no}`] === 'yes'}
                          onChange={() => handleAvailabilityChange(item.category, item.no, 'yes')}
                        />
                        <span className="text-gray-800">{config[language].availabilityYes}</span>
                      </label>
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <label className="flex items-center justify-center gap-2">
                        <input
                          type="radio"
                          name={`availability-${item.category}-${item.no}`}
                          checked={materialAvailability[`${item.category}-${item.no}`] === 'no'}
                          onChange={() => handleAvailabilityChange(item.category, item.no, 'no')}
                        />
                        <span className="text-gray-800">{config[language].availabilityNo}</span>
                      </label>
                    </td>
                    <td className="border border-gray-300 p-2">
                      {language === 'en' ? item.remarks_en : item.remarks_mr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mb-6">
            <button
              onClick={handleBack}
              disabled={currentCategoryIndex === 0}
              className={`px-6 text-gray-500 underline  hover:text-blue-600 ${currentCategoryIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {config[language].back}
            </button>
            <button
              onClick={handleNext}
              disabled={currentCategoryIndex === categories.length - 1}
              className={`px-6 py-2 rounded text-white   ${currentCategoryIndex === categories.length - 1
                  ? 'bg-gray-400 cursor-not-allowed hover:text-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {config[language].next}
            </button>
          </div>

          {/* Agreement Question and Submit Button (shown only on last category) */}
          {currentCategoryIndex === categories.length - 1 && (
            <>
              <div className="flex items-center gap-6 mb-6">
                <p className="text-gray-700 font-medium">{config[language].question}</p>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="agreement"
                    checked={agreement === 'yes'}
                    onChange={() => handleAgreementChange('yes')}
                  />
                  <span className="text-gray-800">{config[language].yes}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="agreement"
                    checked={agreement === 'no'}
                    onChange={() => handleAgreementChange('no')}
                  />
                  <span className="text-gray-800">{config[language].no}</span>
                </label>
              </div>
              <div className="flex justify-center px-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  {config[language].submit}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MaterialChecklist;