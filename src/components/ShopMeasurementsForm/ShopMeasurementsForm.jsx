import React, { useState,useEffect } from 'react';
import logo from '../../assets/logo.png';
import formConfig from './ShopMeasurementsFormQuestion'; // Importing the form configuration


export default function ShopMeasurementsForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalQuestions = formConfig.fields.length;

  // Initialize formData with default values from formConfig
  useEffect(() => {
    const initialFormData = {};
    const initializeFormData = (fields, parentId = '') => {
      fields.forEach((field) => {
        const id = parentId ? `${parentId}_${field.id}` : field.id;
        if (field.subfields) {
          field.subfields.forEach((subfield) => {
            const subId = `${id}_${subfield.id}`;
            if (subfield.type === 'measurement' && subfield.subfields) {
              initializeFormData(subfield.subfields, subId);
            } else {
              initialFormData[subId] = subfield.value || '';
            }
          });
        }
      });
    };
    initializeFormData(formConfig.fields);
    setFormData(initialFormData);
  }, []);

  const handleTextChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Final submission:', formData);
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderField = (field, parentId = '') => {
    const question = field[` question_${language}`] || field.question_mr;
    const id = parentId ? `${parentId}_${field.id}` : field.id;

    if (field.type === 'measurement') {
      return (
        <div key={id} className="mb-8">
    
             <h3 className="text-xl mb-6 text-gray-800 text-left">{question}</h3>

          <div className="flex flex-wrap gap-4">
            {field.subfields?.map((subfield) => {
              const subfieldLabel = subfield[`label_${language}`] || subfield.label_mr;
              const subId = `${id}_${subfield.id}`;

              if (subfield.type === 'measurement' && subfield.subfields) {
                // Render nested subfields recursively
                return (
                  <div key={subId} className="flex flex-col text-left">
                    <label className=" text-gray-600 text-lg mb-2">{subfieldLabel}</label>
                    <div className="flex  flex-wrap gap-4">
                      {subfield.subfields.map((nestedField) => {
                        const nestedLabel = nestedField[`label_${language}`] || nestedField.label_mr;
                        const nestedId = `${subId}_${nestedField.id}`;
                        return (
                          <div key={nestedId} className="flex flex-col items-center">
                            <label className="text-gray-600 text-lg mb-2">{nestedLabel}</label>
                            <input
                              type="number"
                              name={nestedId}
                              value={formData[nestedId] ?? nestedField.value}
                              onChange={(e) => handleTextChange(nestedId, e.target.value)}
                              className="w-24 border-2 border-gray-200 rounded-lg p-2 text-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <div key={subId} className="flex flex-col">
                  <label className="text-gray-600 text-lg mb-2">{subfieldLabel}</label>
                  <input
                    type="number"
                    name={subId}
                    value={formData[subId] ?? subfield.value}
                    onChange={(e) => handleTextChange(subId, e.target.value)}
                    className="w-24 border-2 border-gray-200 rounded-lg p-2 text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex bg-[#e3f2fd]">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-2">
            {language === 'mr' ? 'धन्यवाद!' : 'Thank You!'}
          </h2>
          <p className="text-gray-600 mb-6 whitespace-pre-line">
            {formConfig[`submission_message_${language}`]}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentQuestionIndex(0);
              setFormData({});
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
          >
            {language === 'mr' ? 'नवीन सर्वेक्षण' : 'New Survey'}
          </button>
        </div>
      </div>
    );
  }

  const currentField = formConfig.fields[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#e3f2fd] p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="YNK Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-gray-600 underline"
          >
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg text-center font-bold mb-4">
          {formConfig[`title_${language}`]}
        </h2>

        {/* Current Question */}
        <div className="mb-4">{renderField(currentField)}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            className="text-gray-500 underline disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
          >
            {formConfig.navigation_buttons?.[`back_${language}`] ||
              (language === 'mr' ? 'मागे' : 'Back')}
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {currentQuestionIndex < totalQuestions - 1
              ? formConfig.navigation_buttons?.[`next_${language}`]
              : formConfig[`submit_button_${language}`]}
          </button>
        </div>
      </div>
    </div>
  );
}