import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import ShopSetupChecklistFormQuestion from './ShopSetupChecklistFormQuestion'; // Importing the form configuration

const {
  formConfig,
  validationMessages
} = ShopSetupChecklistFormQuestion;

export default function ShopSetupChecklistForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const totalQuestions = formConfig.fields.length;

  // Validate current field (unchanged)
  const validateCurrentField = (field) => {
    const newErrors = {};
    const id = field.id;

    if (field.required && (formData[id] === undefined || formData[id] === '')) {
      newErrors[id] = validationMessages[language].answerRequired;
    }

    if ((id === 'call_date' || id === 'vacate_call_date') && formData[id]) {
      const error = validateDate(formData[id]);
      if (error) newErrors[id] = error;
    }

    if (field.type === 'file' && field.required && !formData[id]) {
      newErrors[id] = validationMessages[language].imageRequired;
    }

    if (field.followup && formData[id] !== undefined) {
      const followup = field.followup[formData[id] ? 'yes' : 'no']?.fields || [];
      followup.forEach(subField => {
        if (subField.required && (formData[subField.id] === undefined || formData[subField.id] === '')) {
          newErrors[subField.id] = validationMessages[language].followupRequired;
        }
        if (subField.type === 'file' && subField.required && !formData[subField.id]) {
          newErrors[subField.id] = validationMessages[language].imageRequired;
        }
        if (subField.type === 'radio' && subField.options && formData[subField.id]) {
          const selectedOption = subField.options.find(opt => opt.value === formData[subField.id]);
          if (selectedOption?.followup?.fields) {
            selectedOption.followup.fields.forEach(nestedField => {
              if (nestedField.required && (formData[nestedField.id] === undefined || formData[nestedField.id] === '')) {
                newErrors[nestedField.id] = validationMessages[language].followupRequired;
              }
              if (nestedField.type === 'text' && formData[nestedField.id]) {
                const error = validateDate(formData[nestedField.id]);
                if (error) newErrors[nestedField.id] = error;
              }
            });
          }
        }
      });
    }

    return newErrors;
  };

  // Validate date (unchanged)
  const validateDate = (dateStr) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) {
      return validationMessages[language].invalidDateFormat;
    }

    const inputDate = new Date(dateStr);
    const today = new Date('2025-06-04'); // Current date
    if (isNaN(inputDate.getTime())) {
      return validationMessages[language].invalidDate;
    }

    if (inputDate < today) {
      return validationMessages[language].pastDate;
    }

    return null;
  };

  // Handlers (unchanged except for handleNext)
  const handleYesNoChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value === 'yes',
    }));
    setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleRadioChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleTextChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [id]: validateDate(value),
    }));
  };

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      [id]: file,
    }));
    setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleLanguageToggle = () => {
    setLanguage(prev => (prev === 'mr' ? 'en' : 'mr'));
    setErrors({});
  };

  const submitFormToAPI = async (data) => {
    const formDataToSend = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] instanceof File) {
        formDataToSend.append(key, data[key], data[key].name);
      } else {
        formDataToSend.append(key, data[key]);
      }
    });
  };

  const handleNext = async () => {
    const currentField = formConfig.fields[currentQuestionIndex];
    const validationErrors = validateCurrentField(currentField);

    if (Object.keys(validationErrors).length > 0) {
      // Combine all error messages into a single alert
      const errorMessages = Object.values(validationErrors).join('\n');
      window.alert(errorMessages);
      setErrors(validationErrors); // Still store errors for internal state management
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setErrors({}); // Clear errors when moving to the next question
    } else {
      try {
        setApiError(null);
        const response = await submitFormToAPI(formData);
        console.log('Submission successful:', { formData, response });
        setIsSubmitted(true);
      } catch (error) {
        window.alert(validationMessages[language].submitError); // Use alert for API errors too
        setApiError(validationMessages[language].submitError);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const renderField = (field) => {
    const question = field[`question_${language}`] || field.question_mr;
    const id = field.id;

    return (
      <div key={id} className="mb-6">
        <h3 className="text-lg font-medium text-left text-gray-800 mb-2">{question}</h3>
        {field.type === 'yesno' && (
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name={id}
                checked={formData[id] === true}
                onChange={() => handleYesNoChange(id, 'yes')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className={`text-base ${formData[id] === true ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                {language === 'mr' ? 'होय' : 'Yes'}
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name={id}
                checked={formData[id] === false}
                onChange={() => handleYesNoChange(id, 'no')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className={`text-base ${formData[id] === false ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                {language === 'mr' ? 'नाही' : 'No'}
              </span>
            </label>
          </div>
        )}

        {field.type === 'radio' && (
          <div className="flex flex-col space-y-4">
            {field.options.map(option => (
              <label key={option.value} className="flex cursor-pointer">
                <div className="flex items-center px-4 py-2 rounded-lg transition-all">
                  <input
                    type="radio"
                    name={id}
                    checked={formData[id] === option.value}
                    onChange={() => handleRadioChange(id, option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    className={`ml-2 text-base ${formData[id] === option.value ? 'text-gray-700 font-medium' : 'text-gray-600'
                      }`}
                  >
                    {option[`label_${language}`] || option.label_mr}
                  </span>
                </div>
                {formData[id] === option.value && option.followup && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 w-full">
                    {option.followup.fields?.map(subField => renderField(subField))}
                  </div>
                )}
              </label>
            ))}
          </div>
        )}

        {field.type === 'text' && (
          <div>
            <input
              type="text"
              name={id}
              placeholder={field[`placeholder_${language}`] || field.placeholder_mr}
              value={formData[id] || ''}
              onChange={e => handleTextChange(id, e.target.value)}
              className={`w-full border-2 rounded-lg p-3 transition-colors ${errors[id] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
            />
          </div>
        )}

        {field.type === 'file' && (
          <div>
            <input
              type="file"
              name={id}
              onChange={e => handleFileChange(id, e)}
              className={`w-full text-gray-600 ${errors[id] ? 'border-red-500' : ''}`}
              accept={id.includes('video') ? 'video/*' : 'image/*'}
            />
            {formData[id] && (
              <p className="mt-2 text-gray-600 text-left">
                {language === 'mr' ? 'फाइल निवडली: ' : 'File selected: '} {formData[id].name}
              </p>
            )}
          </div>
        )}
        {formData[id] !== undefined && field.followup && field.type === 'yesno' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-700 mb-2">{field.followup[formData[id] ? 'yes' : 'no'][`message_${language}`]}</p>
            {field.followup[formData[id] ? 'yes' : 'no'].fields?.map(subField => renderField(subField))}
          </div>
        )}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e3f2fd]">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-2">{language === 'mr' ? 'धन्यवाद!' : 'Thank You!'}</h2>
          <p className="text-gray-600 mb-6 whitespace-pre-line">
            {formConfig[`submission_message_${language}`] || validationMessages[language].submitSuccess}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentQuestionIndex(0);
              setFormData({});
              setErrors({});
              setApiError(null);
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
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="YNK Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-gray-600 underline hover:text-blue-600"
          >
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>
        </div>
        <h2 className="text-lg text-center  font-bold mb-2">{formConfig[`title_${language}`]}</h2>
        <div className="mb-4">{renderField(currentField)}</div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            className="text-gray-500 underline disabled:text-gray-300 hover:text-blue-600"
            disabled={currentQuestionIndex === 0}
          >
            {formConfig.navigation_buttons?.[`back_${language}`] || (language === 'mr' ? 'मागे' : 'Back')}
          </button>
          <button
            onClick={handleNext}
            className={`${currentQuestionIndex < totalQuestions - 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
              } text-white px-4 py-2 rounded font-medium`}
          >
            {currentQuestionIndex < totalQuestions - 1
              ? formConfig.navigation_buttons?.[`next_${language}`] || (language === 'mr' ? 'पुढे' : 'Next')
              : formConfig[`submit_button_${language}`] || (language === 'mr' ? 'सबमिट करा' : 'Submit')}
          </button>
        </div>
      </div>
    </div>
  );
}