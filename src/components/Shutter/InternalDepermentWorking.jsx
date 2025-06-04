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
      question_mr: 'डेव्हलपर टीमने सेल्स विभागाला कोटेशन पाठवले का?',
      question_en: 'Did the developer team send the quotation to the sales department?',
      type: 'yesno',
    },
    {
      id: 'sales_to_owner_quotation',
      question_mr: 'सेल्स विभागाने ओनरला कोटेशन पाठवले का?',
      question_en: 'Did the sales department send the quotation to the owner?',
      type: 'yesno',
    },
    {
      id: 'owner_received_quotation',
      question_mr: 'ओनरला कोटेशन प्राप्त झाले का?',
      question_en: 'Did the owner receive the quotation?',
      type: 'yesno',
    },
    {
      id: 'owner_checked_quotation',
      question_mr: 'ओनरने पूर्ण कोटेशन तपासले का?',
      question_en: 'Did the owner check the complete quotation?',
      type: 'yesno',
    },
    {
      id: 'quotation_finalized',
      question_mr: 'ओनर आणि सेल्स विभागामध्ये कोटेशन फायनल झाले का?',
      question_en: 'Was the quotation finalized between the owner and the sales department?',
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
      question_mr: 'इंजिनिअरला ओनरची माहिती मिळाली का?',
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

  const totalQuestions = formConfig.fields.length;

  const handleYesNoChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value === 'yes' ? true : false,
    });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  const handleNext = async () => {
    const currentField = formConfig.fields[currentQuestionIndex];
    // Validate current question
    if (formData[currentField.id] === undefined || formData[currentField.id] === null) {
      alert(
        language === 'mr'
          ? 'कृपया होय किंवा नाही निवडा!'
          : 'Please select Yes or No!'
      );
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Validate all questions before submitting
      const unanswered = formConfig.fields.find((field) => formData[field.id] === undefined || formData[field.id] === null);
      if (unanswered) {
        alert(
          language === 'mr'
            ? 'कृपया सर्व प्रश्नांची उत्तरे द्या!'
            : 'Please answer all questions!'
        );
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
        const response = await axios.post('ApI Calling', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API Response:', response.data);
        alert(language === 'mr' ? 'फॉर्म सबमिट झाला!' : 'Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert(language === 'mr' ? 'फॉर्म सबमिट करण्यात त्रुटी!' : 'Error submitting form!');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
              className="w-4 h-4 text-blue-600"
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
              className="w-4 h-4 text-blue-600"
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
            className="text-sm text-gray-600 underline"
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
            className="text-gray-500 underline"
            disabled={currentQuestionIndex === 0}
          >
            {formConfig.navigation_buttons?.[`back_${language}`] ||
              (language === 'mr' ? 'मागे' : 'Back')}
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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