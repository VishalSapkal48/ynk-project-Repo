import { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png'; // Assuming the logo import matches the previous forms
const formConfig = {
  id: 'form_information',
  title_mr: 'आंतर विभागीय कार्य',
  title_en: 'Internal Department Work',
  fields: [
    {
      id: 'developer_quotation',
      question_mr: 'डेवलपर टीमने सेल्स डिपार्टमेंटला कोटेशन पाठवले का?',
      question_en: 'Did the developer team send the quotation to the sales department?',
      type: 'yesno',
    },
    {
      id: 'sales_to_owner_quotation',
      question_mr: 'सेल्स डिपार्टमेंटला ओनरला कोटेशन पाठवले का?',
      question_en: 'Did the sales department send the quotation to the owner?',
      type: 'yesno',
    },
    {
      id: 'owner_received_quotation',
      question_mr: 'ओनरला कोटेशन मिळाले का?',
      question_en: 'Did the owner receive the quotation?',
      type: 'yesno',
    },
    {
      id: 'owner_checked_quotation',
      question_mr: 'ओनर ने पूर्ण कोटेशन चेक केले का?',
      question_en: 'Did the owner check the complete quotation?',
      type: 'yesno',
    },
    {
      id: 'quotation_finalized',
      question_mr: 'ओनर सोबत सेल्स डिपार्टमेंटचे कोटेशन फायनल झाले का?',
      question_en: 'Has the quotation from the sales department been finalized with the owner?',
      type: 'yesno',
    },
    {
      id: 'sample_layout_ready',
      question_mr: 'शॉपचे सॅम्पल लेआउट तयार आहे का?',
      question_en: 'Is the shop sample layout ready?',
      type: 'yesno',
    },
    {
      id: 'layout_discussed_finalized',
      question_mr: 'लेआउट ओनरसोबत चर्चा करून फायनल केले का?',
      question_en: 'Was the layout discussed and finalized with the owner?',
      type: 'yesno',
    },
    {
      id: 'engineer_assigned',
      question_mr: 'लेआउट फायनल झाल्यानंतर त्या साईटसाठी इंजिनिअर नेमले का?',
      question_en: 'Was an engineer assigned to the site after layout finalization?',
      type: 'yesno',
    },
    {
      id: 'engineer_got_owner_info',
      question_mr: '   ओनर माहिती ला इंजिनिअर मिळाले का?',
      question_en: 'Did the engineer get the owner’s information?',
      type: 'yesno',
    },
    {
      id: 'shop_measurement_taken',
      question_mr: 'पूर्ण शॉपचे मोजमाप घेतले आहे का?',
      question_en: 'Has the complete shop measurement been taken?',
      type: 'yesno',
    },
  ],
  submit_button_mr: 'सबमिट करा',
  submit_button_en: 'Submit',
  navigation_buttons: {
    back_mr: 'मागे',
    back_en: 'Back',
    next_mr: 'पुढे',
    next_en: 'Next',
  },
};

export default function InternalDepartmentWorking() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const totalQuestions = formConfig.fields.length;

  // Validation messages
  const validationMessages = {
       en: {
      answerRequired: 'Please provide an answer to the question.',
      followupRequired: 'Please provide a value for the follow-up question.',
      imageRequired: 'Please upload at least one image or video.',
      checkboxRequired: 'Please select at least one option.',
      inputRequired: 'Please specify details for "Other".',
      submitError: 'Failed to submit the form. Please try again.',
      submitSuccess: 'Form submitted successfully!',
      invalidDateFormat: 'Please enter a valid date (YYYY-MM-DD)',
      invalidDate: 'Please enter a valid date',
      pastDate: 'Date cannot be in the past',
    },
    mr: {
      answerRequired: 'कृपया प्रश्नाचे उत्तर द्या.',
      followupRequired: 'कृपया फॉलो-अप प्रश्नासाठी मूल्य प्रदान करा.',
      imageRequired: 'कृपया किमान एक प्रतिमा किंवा व्हिडिओ अपलोड करा.',
      checkboxRequired: 'कृपया किमान एक पर्याय निवडा.',
      inputRequired: 'कृपया "इतर" साठी तपशील निर्दिष्ट करा.',
      submitError: 'फॉर्म सबमिट करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
      submitSuccess: 'फॉर्म यशस्वीपणे सबमिट झाला!',
      invalidDateFormat: 'कृपया वैध तारीख प्रविष्ट करा (YYYY-MM-DD)',
      invalidDate: 'कृपया वैध तारीख प्रविष्ट करा',
      pastDate: 'तारीख भूतकाळातील असू शकत नाही',
    },
  };

  // Validate current field
  const validateCurrentField = (field) => {
    const newErrors = {};
    const id = field.id;

    if (formData[id] === undefined || formData[id] === null) {
      newErrors[id] = validationMessages[language].answerRequired;
    }

    return newErrors;
  };

  // Validate all fields before submission
  const validateAllFields = () => {
    const newErrors = {};
    formConfig.fields.forEach((field) => {
      if (formData[field.id] === undefined || formData[field.id] === null) {
        newErrors[field.id] = validationMessages[language].answerRequired;
      }
    });
    return newErrors;
  };

  const handleYesNoChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value === 'yes',
    });
    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
    setErrors({});
  };

  const handleNext = async () => {
    const currentField = formConfig.fields[currentQuestionIndex];
    const validationErrors = validateCurrentField(currentField);

    if (Object.keys(validationErrors).length > 0) {
      window.alert(validationMessages[language].answerRequired);
      setErrors(validationErrors);
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setErrors({});
    } else {
      const allErrors = validateAllFields();
      if (Object.keys(allErrors).length > 0) {
        window.alert(validationMessages[language].allQuestionsRequired);
        setErrors(allErrors);
        return;
      }

      // Prepare form data with full questions in the selected language
      const formattedData = formConfig.fields.reduce((acc, field) => {
        const question = field[`question_${language}`] || field.question_mr;
        const answer = formData[field.id] === true ? (language === 'mr' ? 'होय' : 'Yes') :
                      formData[field.id] === false ? (language === 'mr' ? 'नाही' : 'No') :
                      (language === 'mr' ? 'उत्तर दिले नाही' : 'Not answered');
        return {
          ...acc,
          [question]: answer,
        };
      }, {});

      console.log('Final submission:', formattedData);

      try {
        const response = await axios.post('/api', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API Response:', response.data);
        window.alert(validationMessages[language].submitSuccess);
      } catch (error) {
        console.error('Error submitting form:', error);
        window.alert(validationMessages[language].submitError);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setErrors({});
    }
  };

  const renderField = (field) => {
    const question = field[`question_${language}`] || field.question_mr;
    const id = field.id;

    return (
      <div key={id} className="mb-6">
        <h3 className="text-lg font-medium text-left text-gray-800 mb-2">{question}</h3>
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
      </div>
    );
  };

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

        <h2 className="text-lg text-center font-bold mb-4">
          {formConfig[`title_${language}`]}
        </h2>

        <div className="mb-4">{renderField(currentField)}</div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className="text-gray-500 underline disabled:text-gray-300 hover:text-blue-600"
            disabled={currentQuestionIndex === 0}
          >
            {formConfig.navigation_buttons?.[`back_${language}`] ||
              (language === 'mr' ? 'मागे' : 'Back')}
          </button>
          <button
            onClick={handleNext}
            className={`${
              currentQuestionIndex < totalQuestions - 1
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700'
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