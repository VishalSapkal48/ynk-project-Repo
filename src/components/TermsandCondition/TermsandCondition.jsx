import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { TermsandConditionQuestion as config, terms } from './TermsandConditionQuestion';

function TermsandCondition() {
  const [agreement, setAgreement] = useState(null);
  const [checkedTerms, setCheckedTerms] = useState({});
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAgreementChange = (value) => {
    setAgreement(value);
    setError('');
  };

  const handleCheckboxChange = (id) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setError('');
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
    setError('');
  };

  const handleSubmit = async () => {
    const allChecked = terms.every((term) => checkedTerms[term.id]);
    if (!allChecked) {
      alert(config[language].allCheckedError);
      setError(config[language].allCheckedError);
      return;
    }

    if (!agreement) {
      alert(config[language].agreementError);
      setError(config[language].agreementError);
      return;
    }

    if (agreement === 'no') {
      alert('You must agree to the terms and conditions to proceed.');
      setError('You must agree to the terms and conditions to proceed.');
      return;
    }

    const formData = {
      checkedTerms,
      agreement,
      language,
    };

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/API CAlling', formData);
      console.log('Form submission successful:', response.data);
      alert(config[language].successMessage);
    } catch (error) {
      console.error('Form submission failed:', error);
      alert(config[language].submitError);
      setError(config[language].submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#dbeeff] p-6 rounded-xl border border-blue-200">
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

        <div className="px-6 py-6 bg-[#dbeeff]">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-1">
            {config[language].title}
          </h2>
          <p className="text-center text-gray-500 mb-6">{config[language].subheader}</p>

          <table className="w-full border border-gray-300 text-sm mb-6">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">{config[language].tableHeaders[0]}</th>
                <th className="border border-gray-300 p-2 text-left">{config[language].tableHeaders[1]}</th>
                <th className="border border-gray-300 p-2 text-center">{config[language].tableHeaders[2]}</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term) => (
                <tr key={term.id} className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-2">{term.id}</td>
                  <td className="border border-gray-300 p-2 text-left">
                    {language === 'en' ? term.description_en : term.description_mr}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={!!checkedTerms[term.id]}
                      onChange={() => handleCheckboxChange(term.id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center gap-6 mb-6">
            <p className="text-gray-700 font-medium">{config[language].question}</p>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="agreement"
                checked={agreement === 'yes'}
                onChange={() => handleAgreementChange('yes')}
                className="accent-blue-600"
              />
              <span className="text-gray-800">{config[language].yes}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="agreement"
                checked={agreement === 'no'}
                onChange={() => handleAgreementChange('no')}
                className="accent-blue-600"
              />
              <span className="text-gray-800">{config[language].no}</span>
            </label>
          </div>

          <div className="flex justify-center px-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded text-white transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : config[language].submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsandCondition;
