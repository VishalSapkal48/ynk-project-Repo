import { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png'; // Ensure this path is correct
import CivilWorkChecklistFormQuestion from './CivilWorkChecklistFormQuestion';

const {
  questions,
  tableData1,
  tableData2,
  tableData3,
  tableData4,
  tableData5,
  
  equipmentConfig
} = CivilWorkChecklistFormQuestion;

export default function CivilWorkChecklistForm() {
  const [formData, setFormData] = useState({
    step1_understood: null,
    step2_understood: null,
    step3_understood: null,
    step4_understood: null,
    step5_understood: null,
  });
  const [language, setLanguage] = useState('mr');
  const [step, setStep] = useState(1);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const handleYesNoChange = (stepKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: value,
    }));
  };

  const handleNext = () => {
    const currentQuestionKey = questions[step - 1].key;
    if (formData[currentQuestionKey] === null) {
      alert(
        language === 'mr'
          ? 'कृपया सर्व प्रश्नांची उत्तरे द्या!'
          : 'Please answer all questions!'
      );
      return;
    }
    if (step < questions.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const unanswered = questions.find((q) => formData[q.key] === null);
    if (unanswered) {
      alert(
        language === 'mr'
          ? 'कृपया सर्व प्रश्नांची उत्तरे द्या!'
          : 'Please answer all questions!'
      );
      return;
    }

    const formattedData = questions.reduce((acc, q) => {
      const question = q[`question_${language}`];
      const answer =
        formData[q.key] === true
          ? language === 'mr'
            ? 'होय'
            : 'Yes'
          : formData[q.key] === false
          ? language === 'mr'
            ? 'नाही'
            : 'No'
          : language === 'mr'
          ? 'उत्तर दिले नाही'
          : 'Not answered';
      return {
        ...acc,
        [question]: answer,
      };
    }, {});

    console.log('Submitted Data:', formattedData);

    try {
      // Replace 'API call' with your actual API endpoint
      const response = await axios.post( 'API CALLING...', // Placeholder; replace with actual endpoint
        { ...formData, language },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);
      alert(
        language === 'mr'
          ? 'फॉर्म यशस्वीरित्या सबमिट झाला!'
          : 'Form submitted successfully!'
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        language === 'mr'
          ? `फॉर्म सबमिट करण्यात त्रुटी: ${error.message}`
          : `Error submitting form: ${error.message}`
      );
    }
  };

  const renderTable = (data) => (
    <div className="overflow-x-auto mt-2">
      <table className="table-auto w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-center">
              {language === 'mr' ? 'उपकरण' : 'Item'}
            </th>
            <th className="border px-4 py-2 text-center">
              {language === 'mr' ? 'कंपनी' : 'Company'}
            </th>
            <th className="border px-4 py-2 text-center">
              {language === 'mr' ? 'विशिष्टता' : 'Specification'}
            </th>
            <th className="border px-4 py-2 text-center">
              {language === 'mr' ? 'प्रमाण' : 'Qty'}
            </th>
            {data.some((row) => row.work) && (
              <th className="border px-4 py-2 text-center">
                {language === 'mr' ? 'काम' : 'Work'}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{row.item}</td>
              <td className="border px-4 py-2">{row.company}</td>
              <td className="border px-4 py-2">{row.specification}</td>
              <td className="border px-4 py-2">{row.qty}</td>
              {data.some((row) => row.work) && (
                <td className="border px-4 py-2">{row.work || '-'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const yesNoQuestion = (stepKey, questionText) => (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-md font-medium mb-2 sm:mb-0">{questionText}</p>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={stepKey}
            checked={formData[stepKey] === true}
            onChange={() => handleYesNoChange(stepKey, true)}
            aria-label={language === 'mr' ? 'होय' : 'Yes'}
          />
          {language === 'mr' ? 'होय' : 'Yes'}
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={stepKey}
            checked={formData[stepKey] === false}
            onChange={() => handleYesNoChange(stepKey, false)}
            aria-label={language === 'mr' ? 'नाही' : 'No'}
          />
          {language === 'mr' ? 'नाही' : 'No'}
        </label>
      </div>
    </div>
  );

  const stepConfig = [
    {
      step: 1,
      title: language === 'mr' ? 'उपकरणांची यादी' : 'Equipment List',
      table: tableData1,
      questionKey: 'step1_understood',
    },
    {
      step: 2,
      title: language === 'mr' ? 'इंटरनेट माहिती' : 'Internet Details',
      table: tableData2,
      questionKey: 'step2_understood',
    },
    {
      step: 3,
      title: language === 'mr' ? 'स्पीकर आणि ॲम्प्लिफायर माहिती' : 'Speaker and Amplifier Details',
      table: tableData3,
      questionKey: 'step3_understood',
    },
    {
      step: 4,
      title: language === 'mr' ? 'पेंट आणि लोगो माहिती' : 'Paint and Logo Details',
      table: tableData4,
      questionKey: 'step4_understood',
    },
    {
      step: 5,
      title: language === 'mr' ? 'पाण्याच्या टाकी आणि नळ माहिती' : 'Water Tank and Plumbing Details',
      table: tableData5,
      questionKey: 'step5_understood',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-[#e3f2fd] p-6 rounded-xl shadow-md">
        <div className="bg-white flex justify-between items-center mb-4 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="YNK Logo"
              className="h-10 w-10"
              onError={(e) => {
                console.error('Failed to load logo:', e);
                e.target.src = '/fallback-logo.png'; // Fallback image
              }}
            />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-gray-600 underline hover:text-blue-600"
            aria-label={language === 'mr' ? 'Switch to English' : 'Switch to Marathi'}
          >
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>
        </div>
        <h2 className="text-center text-lg font-semibold mb-6">
          {equipmentConfig[`title_${language}`]}
        </h2>

        {stepConfig.map(
          (config) =>
            step === config.step && (
              <div key={config.step}>
                <h3 className="mb-3 font-medium text-gray-700">{config.title}</h3>
                {renderTable(config.table)}
                {yesNoQuestion(
                  config.questionKey,
                  questions[config.step - 1][`question_${language}`]
                )}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className="text-gray-600 px-4 py-2 bg-transparent border-none hover:text-blue-600 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={equipmentConfig[`back_button_${language}`]}
                  >
                    {equipmentConfig[`back_button_${language}`]}
                  </button>
                  {step === questions.length ? (
                    <button
                      onClick={handleSubmit}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none"
                      aria-label={equipmentConfig[`submit_button_${language}`]}
                    >
                      {equipmentConfig[`submit_button_${language}`]}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                      aria-label={equipmentConfig[`next_button_${language}`]}
                    >
                      {equipmentConfig[`next_button_${language}`]}
                    </button>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}