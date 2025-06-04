import React, { useState } from 'react';
import logo from '../../assets/logo.png';

const surveyCompletionConfig = {
  id: "survey_completion",
  title_mr: "सर्वेक्षण पूर्णता सारांश",
  title_en: "Survey Completion Summary",
  fields: [
    {
      id: "q1",
      question_mr: "सर्वेक्षणादरम्यान काही अडचणी आल्या का? तपशील द्या.",
      question_en: "Were there any difficulties during the survey? Provide details.",
      type: "textarea",
      rows: 4
    },
    {
      id: "q2",
      question_mr: "शॉप सेटअपसाठी पुढील पायऱ्या काय आहेत?",
      question_en: "What are the next steps for shop setup?",
      type: "textarea",
      rows: 4
    }
  ],
  submit_button_mr: "सबमिट करा",
  submit_button_en: "Submit",
  navigation_buttons: {
    back_mr: "मागे",
    back_en: "Back",
    next_mr: "पुढे",
    next_en: "Next"
  }
};

export default function SurveyCompletionSummaryForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = surveyCompletionConfig.fields.length;

  const handleChange = (e, id) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('All answers:', formData);
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      console.log('Back button clicked - Navigate to previous form');
    }
  };

  const renderField = (field) => {
    const question = field[`question_${language}`];
    const id = field.id;

    if (field.type === 'textarea') {
      return (
        <div key={id} className="mb-8">
          <h3 className="text-xl font-medium mb-6 text-center text-gray-800">
            {question}
          </h3>
          <textarea
            rows={field.rows}
            name={id}
            placeholder={question}
            onChange={(e) => handleChange(e, id)}
            className="w-full border-2 border-gray-200 rounded-lg p-4 text-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
            value={formData[id] || ''}
          ></textarea>
        </div>
      );
    }

    return null;
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
          <h2 className="text-lg font-bold mb-2">
            {language === 'mr' ? 'धन्यवाद!' : 'Thank You!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'mr'
              ? 'सर्वेक्षण यशस्वीरित्या पूर्ण झाले आहे.'
              : 'Survey has been completed successfully.'}
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

  const currentField = surveyCompletionConfig.fields[currentQuestionIndex];

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
          {surveyCompletionConfig[`title_${language}`]}
        </h2>

        {/* Current Question */}
        <div className="mb-4">{renderField(currentField)}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            className="text-gray-500 underline"
            disabled={currentQuestionIndex === 0}
          >
            {surveyCompletionConfig.navigation_buttons?.[`back_${language}`] ||
              (language === 'mr' ? 'मागे' : 'Back')}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {currentQuestionIndex < totalQuestions - 1
              ? surveyCompletionConfig.navigation_buttons?.[`next_${language}`]
              : surveyCompletionConfig[`submit_button_${language}`]}
          </button>
        </div>
      </div>
    </div>
  );
}