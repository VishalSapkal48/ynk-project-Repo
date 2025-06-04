import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import logo from '../../assets/logo.png'; // Ensure this path is correct

function TermsandCondition() {
  const [agreement, setAgreement] = useState(null);
  const [checkedTerms, setCheckedTerms] = useState({});
  const [language, setLanguage] = useState('en'); // 'en' for English, 'mr' for Marathi
  const [error, setError] = useState(''); // State for error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission status

  // Language configuration object
  const config = {
    en: {
      title: 'Terms and Conditions',
      subheader: 'Please read and accept the terms and conditions below.',
      tableHeaders: ['Sr. No.', 'Description', 'Accept'],
      question: 'Do you agree to the terms and conditions?',
      yes: 'Yes',
      no: 'No',
      submit: 'Submit',
      allCheckedError: 'Please accept all terms and conditions.',
      agreementError: 'Please select whether you agree to the terms and conditions.',
      successMessage: 'Thank you! Your agreement has been recorded.',
      submitError: 'Failed to submit the form. Please try again.',
    },
    mr: {
      title: 'नियम आणि अटी',
      subheader: 'कृपया खालील नियम आणि अटी वाचा आणि स्वीकारा.',
      tableHeaders: ['अनु. क्र.', 'वर्णन', 'स्वीकार'],
      question: 'तुम्ही नियम आणि अटींशी सहमत आहात का?',
      yes: 'होय',
      no: 'नाही',
      submit: 'सबमिट करा',
      allCheckedError: 'कृपया सर्व नियम आणि अटी स्वीकारा.',
      agreementError: 'कृपया नियम आणि अटींशी सहमत आहात की नाही ते निवडा.',
      successMessage: 'धन्यवाद! तुमची संमती नोंदवली गेली आहे.',
      submitError: 'फॉर्म सबमिट करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    },
  };

  const terms = [
    {
      id: 1,
      description_en: 'The validity period of the quotation will be 1 month.',
      description_mr: 'कोटेशनची वैधता कालावधी १ महिना असेल.',
    },
    {
      id: 2,
      description_en: 'GST will be applicable.',
      description_mr: 'जीएसटी लागू असेल.',
    },
    {
      id: 3,
      description_en: 'After 1 month, the quotation may change according to the market price.',
      description_mr: '१ महिन्यानंतर कोटेशन बाजारभावानुसार बदलू शकते.',
    },
    {
      id: 4,
      description_en: 'The prices of branded companies may vary.',
      description_mr: 'ब्रँडेड कंपन्यांच्या किंमती बदलू शकतात.',
    },
    {
      id: 5,
      description_en: 'The validity of the quotation given to the customer will be 20 days.',
      description_mr: 'ग्राहकाला दिलेल्या कोटेशनची वैधता २० दिवस असेल.',
    },
    {
      id: 6,
      description_en: 'If the quotation is not finalized within the given period, the price may change.',
      description_mr: 'जर कोटेशन दिलेल्या कालावधीत अंतिम झाले नाही, तर किंमत बदलू शकते.',
    },
    {
      id: 7,
      description_en: 'The service and warranty of electronic goods will be as per MEG Co. policy.',
      description_mr: 'इलेक्ट्रॉनिक वस्तूंची सेवा व हमी MEG कंपनीच्या धोरणानुसार असेल.',
    },
    {
      id: 8,
      description_en: 'The branch owner should get all civil work done by a local vendor.',
      description_mr: 'शाखेच्या मालकाने सर्व सिव्हिल काम स्थानिक विक्रेत्याकडून करून घ्यावे.',
    },
    {
      id: 9,
      description_en: 'All details about required civil drawings, material brands, and quality will be provided by the company.',
      description_mr: 'आवश्यक सिव्हिल रेखाचित्रे, सामग्री ब्रँड व गुणवत्ता यांची सर्व माहिती कंपनीद्वारे दिली जाईल.',
    },
    {
      id: 10,
      description_en: 'If there is any change in the quotation, the amount may vary.',
      description_mr: 'कोटेशनमध्ये कोणताही बदल झाल्यास रक्कम बदलू शकते.',
    },
  ];

  const handleAgreementChange = (value) => {
    setAgreement(value);
    setError(''); // Clear error when user interacts
  };

  const handleCheckboxChange = (id) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setError(''); // Clear error when user interacts
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
    setError(''); // Clear error when language changes
  };

  const handleSubmit = async () => {
    // Validation: Check if all terms are accepted
    const allChecked = terms.every((term) => checkedTerms[term.id]);
    if (!allChecked) {
      alert(config[language].allCheckedError);
      setError(config[language].allCheckedError);
      return;
    }

    // Validation: Check if agreement is selected
    if (!agreement) {
      alert(config[language].agreementError);
      setError(config[language].agreementError);
      return;
    }

    // Validation: Check if user agreed (yes)
    if (agreement === 'no') {
      alert('You must agree to the terms and conditions to proceed.');
      setError('You must agree to the terms and conditions to proceed.');
      return;
    }

    // Prepare form data
    const formData = {
      checkedTerms,
      agreement,
      language,
    };

    setIsSubmitting(true); // Disable button during submission
    setError(''); // Clear any previous errors

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual backend API URL
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      console.log('Form submission successful:', response.data);
      console.log('Form Data:', formData); // Log form data to verify
      alert(config[language].successMessage); // Show success message via alert
    } catch (error) {
      console.error('Form submission failed:', error);
      alert(config[language].submitError);
      setError(config[language].submitError);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#dbeeff] p-6 rounded-xl border border-blue-200">
        {/* Header */}
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