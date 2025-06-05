import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';

const formConfig = {
  id: 'shop_setup_checklist',
  title_mr: 'दुकान सेटअप तपासणी यादी',
  title_en: 'Shop Setup Checklist',
  submission_message_mr: 'तुमचा फॉर्म यशस्वीपणे सबमिट झाला आहे!\nआम्ही लवकरच तुमच्याशी संपर्क साधू.',
  submission_message_en: 'Your form has been successfully submitted!\nWe will contact you soon.',
  fields: [
    {
     "id": "shop_possession",
      "question_mr": "शॉप चा ताबा आपल्याकडे आला आहेका,आपल्याला मिळाला आहे का?",
      "question_en": "Has the possession of the shop been received?",
      "type": "yesno",
      "required": true,
      "followup": {
        "yes": {
          "message_mr": "शॉप ताबा मिळाला आहे.",
          "message_en": "Shop possession has been received."
        },
        "no": {
          "message_mr": "शॉप ताबा अद्याप मिळाला नाही.",
          "message_en": "Shop possession has not yet been received.",
          "fields": [
            {
              "id": "possession_days",
              "question_mr": "किती दिवसामध्ये ताबा भेटणार आहे ?",
              "question_en": "In how many days will possession be received?",
              "type": "radio",
              "required": true,
              "options": [
                { "value": "2-4_days", "label_mr": "2-4 दिवस", "label_en": "2-4 days" },
                { "value": "one_week", "label_mr": "एक आठवडा", "label_en": "One week" },
                { "value": "one_month", "label_mr": "एक महिना", "label_en": "One month" }
              ]
            },
            {
              "id": "call_again_date",
              "question_mr": "पुन्हा फोन किती तारखेला करू?",
              "question_en": "On which date should I call again?",
              "type": "radio",
              "required": true,
              "options": [
                {
                  "value": "specific_date",
                  "label_mr": "या तारखेला फोन करा",
                  "label_en": "Call on this date",
                  "followup": {
                    "fields": [
                      {
                        "id": "call_date",
                        "question_mr": "तारीख प्रविष्ट करा (YYYY-MM-DD)",
                        "question_en": "Enter date (YYYY-MM-DD)",
                        "type": "text",
                        "required": true,
                        "placeholder_mr": "उदा. 2025-06-10",
                        "placeholder_en": "e.g., 2025-06-10"
                      }
                    ]
                  }
                },
                {
                  "value": "after_possession",
                  "label_mr": " खाली झाल्यानंतर मी तुम्हाला फोन करतो.",
                  "label_en": "I’ll call you after possession."
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'shop_vacant',
      question_mr: 'शॉप पूर्णपणे रिकामे आहे का?',
      question_en: 'Is the shop completely vacant?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'शॉप मोकळे आहे.',
          message_en: 'The shop is vacant.',
          fields: [
            {
              id: 'shop_photo',
              question_mr: 'शॉप संपूर्ण फोटो पाठवा',
              question_en: 'Send a complete photo of the shop',
              type: 'file',
              required: true,
            },
            {
              id: 'shop_video',
              question_mr: 'शॉप व्हिडिओ पाठवा',
              question_en: 'Send a video of the shop',
              type: 'file',
              required: true,
            },
          ],
        },
        no: {
          message_mr: 'शॉप नाही खाली झाले अजून.',
          message_en: 'The shop is not yet vacant.',
          fields: [
            {
              id: 'vacate_responsible',
              question_mr: 'शॉप कोण रिकामे करणार आहे?',
              question_en: 'Who will vacate the shop?',
              type: 'radio',
              required: true,
              options: [
                { value: 'shop_owner', label_mr: 'दुकान मालक', label_en: 'Shop owner' },
                { value: 'franchisee', label_mr: 'फ्रँचायझी धारक', label_en: 'Franchisee' },
                { value: 'other', label_mr: 'इतर', label_en: 'Other' },
              ],
            },
            {
              id: 'vacate_days',
              question_mr: 'किती दिवस लागतील खाली होण्यासाठी',
              question_en: 'How many days will it take to vacate?',
              type: 'radio',
              required: true,
              options: [
                { value: '2-4_days', label_mr: '2-4 दिवस', label_en: '2-4 days' },
                { value: 'one_week', label_mr: 'एक आठवडा', label_en: 'One week' },
                { value: 'one_month', label_mr: 'एक महिना', label_en: 'One month' },
              ],
            },
            {
              id: 'call_again_vacate',
              question_mr: 'पुन्हा फोन कधी करावा?',
              question_en: 'When should we call again?',
              type: 'radio',
              required: true,
              options: [
                {
                  value: 'specific_date',
                  label_mr: 'या तारखेला फोन करा',
                  label_en: 'Call on this date',
                  followup: {
                    fields: [
                      {
                        id: 'vacate_call_date',
                        question_mr: 'तारीख प्रविष्ट करा (YYYY-MM-DD)',
                        question_en: 'Enter date (YYYY-MM-DD)',
                        type: 'text',
                        required: true,
                        placeholder_mr: 'उदा. 2025-06-10',
                        placeholder_en: 'e.g., 2025-06-10',
                      },
                    ],
                  },
                },
                {
                  value: 'after_vacant',
                  label_mr: ' खाली झाल्यानंतर मी तुम्हाला फोन करतो.',
                  label_en: 'I’ll call you after it’s vacant.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      id: 'shutter_size',
      question_mr: 'शॉप चा शटर किती फूट आहे?',
      question_en: 'What is the size of the shop shutter?',
      type: 'radio',
      required: true,
      options: [
        { value: '6ft', label_mr: '6 फूट', label_en: '6 ft.' },
        { value: '8ft', label_mr: '8 फूट', label_en: '8 ft.' },
        { value: '10ft', label_mr: '10 फूट', label_en: '10 ft.' },
        { value: '12ft', label_mr: '12 फूट', label_en: '12 ft.' },
      ],
    },
    {
      id: 'electrical_supply',
      question_mr: 'शॉप वीज पुरवठा आहे का?',
      question_en: 'Does the shop have electrical supply?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'शॉप वीज पुरवठा आहे.',
          message_en: 'The shop has electrical supply.',
          fields: [
            {
              id: 'light_photo',
              question_mr: 'शॉप लाइट चालू असल्याचा फोटो पाठवा',
              question_en: 'Send a photo of the lights on in the shop',
              type: 'file',
              required: true,
            },
            {
              id: 'meter_box_photo',
              question_mr: 'मीटर बॉक्सचा फोटो पाठवा',
              question_en: 'Send a photo of the meter box',
              type: 'file',
              required: true,
            },
            {
              id: 'mcb_box_photo',
              question_mr: 'MCB बॉक्सचा फोटो पाठवा',
              question_en: 'Send a photo of the MCB box',
              type: 'file',
              required: true,
            },
          ],
        },
        no: {
          message_mr: 'शॉप वीज पुरवठा नाही.',
          message_en: 'The shop does not have electrical supply.',
          fields: [
            {
              id: 'electrical_responsible',
              question_mr: 'वीज पुरवठा कोण घेऊन देणार आहे?',
              question_en: 'Who will provide the electrical supply?',
              type: 'radio',
              required: true,
              options: [
                { value: 'shop_owner', label_mr: 'दुकान मालक', label_en: 'Shop owner' },
                { value: 'franchisee', label_mr: 'फ्रँचायझी धारक', label_en: 'Franchisee' },
                { value: 'other', label_mr: 'इतर', label_en: 'Other' },
              ],
            },
          ],
        },
      },
    },
    {
      id: 'drainage_connectivity',
      question_mr: 'शॉप ड्रेनेज कनेक्टिव्हिटी आहे का?',
      question_en: 'Does the shop have drainage connectivity?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'शॉप ड्रेनेज कनेक्टिव्हिटी आहे.',
          message_en: 'The shop has drainage connectivity.',
          fields: [
            {
              id: 'drainage_photo',
              question_mr: 'ड्रेनेज चालू असल्याचा फोटो पाठवा',
              question_en: 'Send a photo of the drainage working in the shop',
              type: 'file',
              required: true,
            },
          ],
        },
        no: {
          message_mr: 'शॉप ड्रेनेज कनेक्टिव्हिटी नाही.',
          message_en: 'The shop does not have drainage connectivity.',
          fields: [
            {
              id: 'drainage_responsible',
              question_mr: 'ड्रेनेज कनेक्टिव्हिटी कोण घेऊन देणार आहे?',
              question_en: 'Who will provide the drainage connectivity?',
              type: 'radio',
              required: true,
              options: [
                { value: 'shop_owner', label_mr: 'दुकान मालक', label_en: 'Shop owner' },
                { value: 'franchisee', label_mr: 'फ्रँचायझी धारक', label_en: 'Franchisee' },
                { value: 'other', label_mr: 'इतर', label_en: 'Other' },
              ],
            },
          ],
        },
      },
    },
    {
      id: 'water_connectivity',
      question_mr: 'शॉप पाण्याची कनेक्टिव्हिटी आहे का?',
      question_en: 'Does the shop have water connectivity?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'शॉप पाण्याची कनेक्टिव्हिटी आहे.',
          message_en: 'The shop has water connectivity.',
          fields: [
            {
              id: 'water_photo',
              question_mr: 'पाण्याची कनेक्टिव्हिटी दर्शवणारा फोटो पाठवा',
              question_en: 'Send a photo of the water connectivity',
              type: 'file',
              required: true,
            },
            {
              id: 'water_video',
              question_mr: 'नळाला पाणी चालू असल्याचा व्हिडिओ पाठवा',
              question_en: 'Send a video of water running from the tap in the shop',
              type: 'file',
              required: true,
            },
          ],
        },
        no: {
          message_mr: 'शॉप पाण्याची कनेक्टिव्हिटी नाही.',
          message_en: 'The shop does not have water connectivity.',
          fields: [
            {
              id: 'water_responsible',
              question_mr: 'पाण्याची कनेक्टिव्हिटी कोण घेऊन देणार आहे?',
              question_en: 'Who will provide the water connectivity?',
              type: 'radio',
              required: true,
              options: [
                { value: 'shop_owner', label_mr: 'दुकान मालक', label_en: 'Shop owner' },
                { value: 'franchisee', label_mr: 'फ्रँचायझी धारक', label_en: 'Franchisee' },
                { value: 'other', label_mr: 'इतर', label_en: 'Other' },
              ],
            },
          ],
        },
      },
    },
    {
      id: 'earthing_connectivity',
      question_mr: 'शॉप अर्थिंग कनेक्टिव्हिटी आहे का?',
      question_en: 'Does the shop have earthing connectivity?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'शॉप अर्थिंग कनेक्टिव्हिटी आहे.',
          message_en: 'The shop has earthing connectivity.',
          fields: [
            {
              id: 'earthing_photo',
              question_mr: 'अर्थिंगचा फोटो पाठवा',
              question_en: 'Send a photo of the earthing connectivity',
              type: 'file',
              required: true,
            },
            {
              id: 'earthing_mcb_box',
              question_mr: 'MCB बॉक्सचा फोटो पाठवा',
              question_en: 'Send a photo of the MCB box',
              type: 'file',
              required: true,
            },
          ],
        },
        no: {
          message_mr: 'शॉप अर्थिंग कनेक्टिव्हिटी नाही.',
          message_en: 'The shop does not have earthing connectivity.',
          fields: [
            {
              id: 'earthing_responsible',
              question_mr: 'अर्थिंग कनेक्टिव्हिटी कोण घेऊन देणार आहे?',
              question_en: 'Who will provide the earthing connectivity?',
              type: 'radio',
              required: true,
              options: [
                { value: 'shop_owner', label_mr: 'दुकान मालक', label_en: 'Shop owner' },
                { value: 'franchisee', label_mr: 'फ्रँचायझी धारक', label_en: 'Franchisee' },
                { value: 'other', label_mr: 'इतर', label_en: 'Other' },
              ],
            },
          ],
        },
      },
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
export default function ShopSetupChecklistForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const totalQuestions = formConfig.fields.length;

  // Validation messages (unchanged)
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
    setErrors({}); // Clear errors on language change
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

    try {
      const response = await axios.post('/api', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
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
            {/* Removed inline error display: {errors[id] && <p className="text-red-500 text-sm mt-2">{errors[id]}</p>} */}
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
                    className={`ml-2 text-base ${
                      formData[id] === option.value ? 'text-gray-700 font-medium' : 'text-gray-600'
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
            {/* Removed inline error display: {errors[id] && <p className="text-red-500 text-sm mt-2">{errors[id]}</p>} */}
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
              className={`w-full border-2 rounded-lg p-3 transition-colors ${
                errors[id] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {/* Removed inline error display: {errors[id] && <p className="text-red-500 text-sm mt-2">{errors[id]}</p>} */}
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
            {/* Removed inline error display: {errors[id] && <p className="text-red-500 text-sm mt-2">{errors[id]}</p>} */}
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
            className={`${
              currentQuestionIndex < totalQuestions - 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
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