import { useState } from 'react';
import axios from 'axios'; // Import Axios
import logo from '../../assets/logo.png';

const shutterConditionConfig = {
  id: 'shutter_condition',
  title_mr: 'शॉप शटर स्थिती',
  title_en: 'Shop Shutter Condition',
  fields: [
    {
      id: 'q1',
      question_mr: 'शटरची सर्व्हिसिंग केलेली आहे का?',
      question_en: 'Has the shutter servicing been done?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          type: 'details',
          message_mr: 'सर्व्हिसिंग आणि ग्रीसिंग केले आहे का?',
          message_en: 'Has servicing and greasing been done?',
          fields: [
            {
              id: 'servicing_details',
              question_mr: 'सर्व्हिसिंग आणि ग्रीसिंग पूर्ण झाले आहे का?',
              question_en: 'Is servicing and greasing completed?',
              type: 'yesno',
              required: true,
            },
          ],
        },
        no: {
          type: 'guide',
          message_mr: 'सर्व्हिसिंग आवश्यक आहे. कृपया कारण नमूद करा.',
          message_en: 'Servicing is required. Please specify the reason.',
          fields: [
            {
              id: 'servicing_reason',
              question_mr: 'सर्व्हिसिंग न करण्याचे कारण काय?',
              question_en: 'Reason for not servicing?',
              type: 'text',
              required: true,
            },
          ],
        },
      },
    },
    {
      id: 'q13',
      question_mr: 'शटरचा फोटो किंवा व्हिडिओ अपलोड करा',
      question_en: 'Upload a photo or video of the shutter',
      type: 'file',
      accept: 'image/*,video/*',
      required: true,
    },
    {
      id: 'q14',
      question_mr: 'शटरची दुरुस्ती केली आहे का?',
      question_en: 'Has the shutter repairing been done?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          type: 'details',
          message_mr: 'दुरुस्ती पूर्ण झाली आहे का?',
          message_en: 'Is repairing completed?',
          fields: [
            {
              id: 'repairing_details',
              question_mr: 'दुरुस्ती पूर्ण झाली आहे का?',
              question_en: 'Is repairing completed?',
              type: 'yesno',
              required: true,
            },
          ],
        },
        no: {
          type: 'guide',
          message_mr: 'दुरुस्ती आवश्यक आहे. कृपया कारण नमूद करा.',
          message_en: 'Repairing is required. Please specify the reason.',
          fields: [
            {
              id: 'repairing_reason',
              question_mr: 'दुरुस्ती न करण्याचे कारण काय?',
              question_en: 'Reason for not repairing?',
              type: 'text',
              required: true,
            },
          ],
        },
      },
    },
    {
      id: 'q15',
      question_mr: 'शटर बदलले आहे का?',
      question_en: 'Has the shutter been replaced?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          type: 'details',
          message_mr: 'नवीन शटर बसवले आहे का?',
          message_en: 'Has a new shutter been installed?',
          fields: [
            {
              id: 'replacement_details',
              question_mr: 'नवीन शटर बसवले आहे का?',
              question_en: 'Is the new shutter installed?',
              type: 'yesno',
              required: true,
            },
          ],
        },
        no: {
          type: 'guide',
          message_mr: 'शटर बदलणे आवश्यक आहे. कृपया कारण नमूद करा.',
          message_en: 'Shutter replacement is required. Please specify the reason.',
          fields: [
            {
              id: 'replacement_reason',
              question_mr: 'शटर न बदलण्याचे कारण काय?',
              question_en: 'Reason for not replacing the shutter?',
              type: 'text',
              required: true,
            },
          ],
        },
      },
    },
    {
      id: 'q16',
      question_mr: 'शटरचा फोटो किंवा व्हिडिओ अपलोड करा',
      question_en: 'Upload a photo or video of the shutter',
      type: 'file',
      accept: 'image/*,video/*',
      required: true,
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

export default function ShutterConditionForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const totalQuestions = shutterConditionConfig.fields.length;

  // Log "world" to console to verify execution
  console.log('world');

  const validateField = (field, value) => {
    if (field.required) {
      if (field.type === 'yesno' && value === undefined) {
        return language === 'mr' ? 'कृपया होय किंवा नाही निवडा' : 'Please select Yes or No';
      }
      if (field.type === 'text' && (!value || value.trim() === '')) {
        return language === 'mr' ? 'कृपया कारण प्रविष्ट करा' : 'Please enter a reason';
      }
      if (field.type === 'file' && !value) {
        return language === 'mr' ? 'कृपया फाइल अपलोड करा' : 'Please upload a file';
      }
    }
    return null;
  };

  const validateFollowupFields = (followupFields) => {
    const newErrors = {};
    followupFields.forEach((subField) => {
      const error = validateField(subField, formData[subField.id]);
      if (error) {
        newErrors[subField.id] = error;
      }
    });
    return newErrors;
  };

  const handleYesNoChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value === 'yes',
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  const handleTextChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: validateField({ type: 'text', required: true }, value),
    }));
  };

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [id]: file,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: validateField({ type: 'file', required: true }, file),
    }));
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const handleNext = () => {
    const currentField = shutterConditionConfig.fields[currentQuestionIndex];
    const error = validateField(currentField, formData[currentField.id]);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [currentField.id]: error,
      }));
      return;
    }

    // Validate followup fields if they exist
    if (formData[currentField.id] !== undefined && currentField.followup) {
      const followup = currentField.followup[formData[currentField.id] ? 'yes' : 'no'];
      const followupErrors = validateFollowupFields(followup.fields || []);
      if (Object.keys(followupErrors).length > 0) {
        setErrors((prev) => ({
          ...prev,
          ...followupErrors,
        }));
        return;
      }
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Validate all fields before submission
      const allErrors = {};
      shutterConditionConfig.fields.forEach((field) => {
        const error = validateField(field, formData[field.id]);
        if (error) {
          allErrors[field.id] = error;
        }
        if (formData[field.id] !== undefined && field.followup) {
          const followup = field.followup[formData[field.id] ? 'yes' : 'no'];
          const followupErrors = validateFollowupFields(followup.fields || []);
          Object.assign(allErrors, followupErrors);
        }
      });

      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors);
        alert(
          language === 'mr'
            ? 'कृपया सर्व आवश्यक फील्ड तपासा'
            : 'Please check all required fields'
        );
        return;
      }

      // Prepare FormData for Axios submission
      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submissionData.append(key, value);
        } else {
          submissionData.append(key, value);
        }
      });

      // Submit form data using Axios
      axios
        .post('https://your-api-endpoint.com/submit', submissionData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('Form submitted successfully:', response.data);
          setIsSubmitted(true);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          alert(
            language === 'mr'
              ? 'फॉर्म सबमिट करताना त्रुटी आली'
              : 'Error submitting form'
          );
        });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderField = (field) => {
    const question = field[`question_${language}`] || field.question_mr;
    const id = field.id;

    if (field.type === 'yesno') {
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
          {errors[id] && (
            <p className="mt-2 text-red-500 text-sm">{errors[id]}</p>
          )}
          {/* Followup Fields */}
          {formData[id] !== undefined && field.followup && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700 mb-2">
                {field.followup[formData[id] ? 'yes' : 'no'][`message_${language}`]}
              </p>
              {field.followup[formData[id] ? 'yes' : 'no'].fields?.map((subField) => renderField(subField))}
            </div>
          )}
        </div>
      );
    }

    if (field.type === 'text') {
      return (
        <div key={id} className="mb-8">
          <h3 className="text-lg font-medium text-left text-gray-800 mb-4">{question}</h3>
          <input
            type="text"
            name={id}
            placeholder={question}
            value={formData[id] || ''}
            onChange={(e) => handleTextChange(id, e.target.value)}
            className={`w-full border-2 rounded-lg p-3 text-base focus:outline-none transition-colors ${
              errors[id] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors[id] && (
            <p className="mt-2 text-red-500 text-sm">{errors[id]}</p>
          )}
        </div>
      );
    }

    if (field.type === 'file') {
      return (
        <div key={id} className="mb-8">
          <h3 className="text-lg font-medium text-left text-gray-800 mb-4">{question}</h3>
          <div className="w-full border-2 border-gray-300 rounded-lg p-3 text-base focus-within:border-blue-500 transition-colors">
            <input
              type="file"
              name={id}
              accept={field.accept}
              onChange={(e) => handleFileChange(id, e)}
              className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-colors"
            />
            {formData[id] && (
              <p className="mt-2 text-gray-600 text-left">
                {language === 'mr' ? 'फाइल निवडली: ' : 'File selected: '} {formData[id].name}
              </p>
            )}
            {errors[id] && (
              <p className="mt-2 text-red-500 text-sm">{errors[id]}</p>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const currentField = shutterConditionConfig.fields[currentQuestionIndex];

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

        {/* Submission Confirmation */}
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-lg font-bold text-green-600">
              {language === 'mr' ? 'फॉर्म यशस्वीरित्या सबमिट झाला!' : 'Form submitted successfully!'}
            </h2>
          </div>
        ) : (
          <>
            {/* Title */}
            <h2 className="text-lg text-center font-bold mb-4">
              {shutterConditionConfig[`title_${language}`]}
            </h2>

            {/* Current Question */}
            <div className="mb-4">{renderField(currentField)}</div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleBack}
                className="text-gray-500 underline disabled:text-gray-300"
                disabled={currentQuestionIndex === 0}
              >
                {shutterConditionConfig.navigation_buttons?.[`back_${language}`] ||
                  (language === 'mr' ? 'मागे' : 'Back')}
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {currentQuestionIndex < totalQuestions - 1
                  ? shutterConditionConfig.navigation_buttons?.[`next_${language}`]
                  : shutterConditionConfig[`submit_button_${language}`]}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}