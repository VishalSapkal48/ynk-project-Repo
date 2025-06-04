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
      id: 'shop_possession',
      question_mr: 'दुकानाचा ताबा तुमच्याकडे आला आहे का?',
      question_en: 'Has the possession of the shop been received?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'दुकानाचा ताबा मिळाला आहे.',
          message_en: 'Shop possession has been received.'
        },
        no: {
          message_mr: 'दुकानाचा ताबा अद्याप मिळाला नाही.',
          message_en: 'Shop possession has not yet been received.',
          fields: [
            {
              id: 'possession_days',
              question_mr: 'किती दिवसांत ताबा मिळेल?',
              question_en: 'In how many days will possession be received?',
              type: 'radio',
              required: true,
              options: [
                { value: '2-4_days', label_mr: '2-4 दिवस', label_en: '2-4 days' },
                { value: 'one_week', label_mr: 'एक आठवडा', label_en: 'One week' },
                { value: 'one_month', label_mr: 'एक महिना', label_en: 'One month' }
              ]
            },
            {
              id: 'call_again_date',
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
                        id: 'call_date',
                        question_mr: 'तारीख प्रविष्ट करा (YYYY-MM-DD)',
                        question_en: 'Enter date (YYYY-MM-DD)',
                        type: 'text',
                        required: true,
                        placeholder_mr: 'उदा. 2025-06-10',
                        placeholder_en: 'e.g., 2025-06-10'
                      }
                    ]
                  }
                },
                {
                  value: 'after_possession',
                  label_mr: 'ताबा मिळाल्यावर मी फोन करेन.',
                  label_en: 'I’ll call you after possession.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'shop_vacant',
      question_mr: 'दुकान पूर्णपणे रिकामे आहे का?',
      question_en: 'Is the shop completely vacant?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'दुकान रिकामे आहे.',
          message_en: 'The shop is vacant.',
          fields: [
            {
              id: 'shop_photo',
              question_mr: 'दुकानाचा संपूर्ण फोटो पाठवा',
              question_en: 'Send a complete photo of the shop',
              type: 'file',
              required: true
            },
            {
              id: 'shop_video',
              question_mr: 'दुकानाचा व्हिडिओ पाठवा',
              question_en: 'Send a video of the shop',
              type: 'file',
              required: true
            }
          ]
        },
        no: {
          message_mr: 'दुकान अद्याप रिकामे झाले नाही.',
          message_en: 'The shop is not yet vacant.',
          fields: [
            {
              id: 'vacate_responsible',
              question_mr: 'दुकान कोण रिकामे करणार आहे?',
              question_en: 'Who will vacate the shop?',
              type: 'radio',
              required: true,
              options: [
                { value: 'shop_owner', label_mr: 'दुकान मालक', label_en: 'Shop owner' },
                { value: 'franchisee', label_mr: 'फ्रँचायझी धारक', label_en: 'Franchisee' },
                { value: 'other', label_mr: 'इतर', label_en: 'Other' }
              ]
            },
            {
              id: 'vacate_days',
              question_mr: 'रिकामे होण्यासाठी किती दिवस लागतील?',
              question_en: 'How many days will it take to vacate?',
              type: 'radio',
              required: true,
              options: [
                { value: '2-4_days', label_mr: '2-4 दिवस', label_en: '2-4 days' },
                { value: 'one_week', label_mr: 'एक आठवडा', label_en: 'One week' },
                { value: 'one_month', label_mr: 'एक महिना', label_en: 'One month' }
              ]
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
                        placeholder_en: 'e.g., 2025-06-10'
                      }
                    ]
                  }
                },
                {
                  value: 'after_vacant',
                  label_mr: 'रिकामे झाल्यावर मी फोन करेन.',
                  label_en: 'I’ll call you after it’s vacant.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'shutter_size',
      question_mr: 'दुकानाचे शटर किती फूट आहे?',
      question_en: 'What is the size of the shop shutter?',
      type: 'radio',
      required: true,
      options: [
        { value: '6ft', label_mr: '6 फूट', label_en: '6 ft.' },
        { value: '8ft', label_mr: '8 फूट', label_en: '8 ft.' },
        { value: '10ft', label_mr: '10 फूट', label_en: '10 ft.' },
        { value: '12ft', label_mr: '12 फूट', label_en: '12 ft.' }
      ]
    },
    {
      id: 'electrical_supply',
      question_mr: 'दुकानात वीज पुरवठा आहे का?',
      question_en: 'Does the shop have electrical supply?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'दुकानात वीज पुरवठा आहे.',
          message_en: 'The shop has electrical supply.',
          fields: [
            {
              id: 'light_photo',
              question_mr: 'दुकानात लाइट चालू असल्याचा फोटो पाठवा',
              question_en: 'Send a photo of the lights on in the shop',
              type: 'file',
              required: true
            },
            {
              id: 'meter_box_photo',
              question_mr: 'मीटर बॉक्सचा फोटो पाठवा',
              question_en: 'Send a photo of the meter box',
              type: 'file',
              required: true
            },
            {
              id: 'mcb_box_photo',
              question_mr: 'MCB बॉक्सचा फोटो पाठवा',
              question_en: 'Send a photo of the MCB box',
              type: 'file',
              required: true
            }
          ]
        },
        no: {
          message_mr: 'दुकानात वीज पुरवठा नाही.',
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
                { value: 'other', label_mr: 'इतर', label_en: 'Other' }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'drainage_connectivity',
      question_mr: 'दुकानात ड्रेनेज कनेक्टिव्हिटी आहे का?',
      question_en: 'Does the shop have drainage connectivity?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'दुकानात ड्रेनेज कनेक्टिव्हिटी आहे.',
          message_en: 'The shop has drainage connectivity.',
          fields: [
            {
              id: 'drainage_photo',
              question_mr: 'ड्रेनेज चालू असल्याचा फोटो पाठवा',
              question_en: 'Send a photo of the drainage working in the shop',
              type: 'file',
              required: true
            }
          ]
        },
        no: {
          message_mr: 'दुकानात ड्रेनेज कनेक्टिव्हिटी नाही.',
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
                { value: 'other', label_mr: 'इतर', label_en: 'Other' }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'water_connectivity',
      question_mr: 'दुकानात पाण्याची कनेक्टिव्हिटी आहे का?',
      question_en: 'Does the shop have water connectivity?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'दुकानात पाण्याची कनेक्टिव्हिटी आहे.',
          message_en: 'The shop has water connectivity.',
          fields: [
            {
              id: 'water_photo',
              question_mr: 'पाण्याची कनेक्टिव्हिटी दर्शवणारा फोटो पाठवा',
              question_en: 'Send a photo of the water connectivity',
              type: 'file',
              required: true
            },
            {
              id: 'water_video',
              question_mr: 'नळाला पाणी चालू असल्याचा व्हिडिओ पाठवा',
              question_en: 'Send a video of water running from the tap in the shop',
              type: 'file',
              required: true
            }
          ]
        },
        no: {
          message_mr: 'दुकानात पाण्याची कनेक्टिव्हिटी नाही.',
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
                { value: 'other', label_mr: 'इतर', label_en: 'Other' }
              ]
            }
          ]
        }
      }
    },
    {
      id: 'earthing_connectivity',
      question_mr: 'दुकानात अर्थिंग कनेक्टिव्हिटी आहे का?',
      question_en: 'Does the shop have earthing connectivity?',
      type: 'yesno',
      required: true,
      followup: {
        yes: {
          message_mr: 'दुकानात अर्थिंग कनेक्टिव्हिटी आहे.',
          message_en: 'The shop has earthing connectivity.',
          fields: [
            {
              id: 'earthing_photo',
              question_mr: 'अर्थिंगचा फोटो पाठवा',
              question_en: 'Send a photo of the earthing connectivity',
              type: 'file',
              required: true
            },
            {
              id: 'earthing_mcb_box',
              question_mr: 'MCB बॉक्सचा फोटो पाठवा',
              question_en: 'Send a photo of the MCB box',
              type: 'file',
              required: true
            }
          ]
        },
        no: {
          message_mr: 'दुकानात अर्थिंग कनेक्टिव्हिटी नाही.',
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
                { value: 'other', label_mr: 'इतर', label_en: 'Other' }
              ]
            }
          ]
        }
      }
    }
  ],
  submit_button_mr: 'सबमिट करा',
  submit_button_en: 'Submit',
  navigation_buttons: {
    back_mr: 'मागे',
    back_en: 'Back',
    next_mr: 'पुढे',
    next_en: 'Next'
  }
};

export default function ShopSetupChecklistForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const totalQuestions = formConfig.fields.length;

  // Validate required fields for the current question
  const validateCurrentField = (field) => {
    const newErrors = {};
    const id = field.id;

    // Check if required field is filled
    if (field.required && (formData[id] === undefined || formData[id] === '')) {
      newErrors[id] = language === 'mr' ? 'हा फिल्ड आवश्यक आहे.' : 'This field is required.';
    }

    // Validate date fields
    if ((id === 'call_date' || id === 'vacate_call_date') && formData[id]) {
      const error = validateDate(formData[id]);
      if (error) newErrors[id] = error;
    }

    // Validate followup fields
    if (field.followup && formData[id] !== undefined) {
      const followup = field.followup[formData[id] ? 'yes' : 'no']?.fields || [];
      followup.forEach(subField => {
        if (subField.required && (formData[subField.id] === undefined || formData[subField.id] === '')) {
          newErrors[subField.id] = language === 'mr' ? 'हा फिल्ड आवश्यक आहे.' : 'This field is required.';
        }
        if (subField.type === 'radio' && subField.options && formData[subField.id]) {
          const selectedOption = subField.options.find(opt => opt.value === formData[subField.id]);
          if (selectedOption?.followup?.fields) {
            selectedOption.followup.fields.forEach(nestedField => {
              if (nestedField.required && (formData[nestedField.id] === undefined || formData[nestedField.id] === '')) {
                newErrors[nestedField.id] = language === 'mr' ? 'हा फिल्ड आवश्यक आहे.' : 'This field is required.';
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

  const validateDate = (dateStr) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) {
      return language === 'mr'
        ? 'कृपया वैध तारीख प्रविष्ट करा (YYYY-MM-DD)'
        : 'Please enter a valid date (YYYY-MM-DD)';
    }

    const inputDate = new Date(dateStr);
    const today = new Date('2025-06-04'); // Current date
    if (isNaN(inputDate.getTime())) {
      return language === 'mr'
        ? 'कृपया वैध तारीख प्रविष्ट करा'
        : 'Please enter a valid date';
    }

    if (inputDate < today) {
      return language === 'mr'
        ? 'तारीख भूतकाळातील असू शकत नाही'
        : 'Date cannot be in the past';
    }

    return null;
  };

  const handleYesNoChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value === 'yes'
    }));
    setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleRadioChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleTextChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setErrors(prev => ({
      ...prev,
      [id]: validateDate(value)
    }));
  };

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      [id]: file
    }));
    setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleLanguageToggle = () => {
    setLanguage(prev => (prev === 'mr' ? 'en' : 'mr'));
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
          'Content-Type': 'multipart/form-data'
        }
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
      setErrors(validationErrors);
      const errorMessages = Object.values(validationErrors).join('\n');
      alert(errorMessages);
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      try {
        setApiError(null);
        const response = await submitFormToAPI(formData);
        console.log('Submission successful:', {
          formData,
          response
        }); // Log only on successful submission
        setIsSubmitted(true);
      } catch (error) {
        setApiError(
          language === 'mr'
            ? 'फॉर्म सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
            : 'An error occurred while submitting the form. Please try again.'
        );
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrors({});
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

          {formData[id] !== undefined && field.followup && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700 mb-2">
                {field.followup[formData[id] ? 'yes' : 'no'][`message_${language}`]}
              </p>
              {field.followup[formData[id] ? 'yes' : 'no'].fields?.map(subField => renderField(subField))}
            </div>
          )}
        </div>
      );
    }

    if (field.type === 'radio') {
      return (
        <div key={id} className="mb-8">
          <h3 className="text-lg font-medium text-left text-gray-800 mb-4">{question}</h3>
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
          </div>
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
            placeholder={field[`placeholder_${language}`] || field.placeholder_mr}
            value={formData[id] || ''}
            onChange={e => handleTextChange(id, e.target.value)}
            className="w-full border-2 rounded-lg p-3 transition-colors border-gray-300 focus:border-blue-500"
          />
        </div>
      );
    }

    if (field.type === 'file') {
      return (
        <div key={id} className="mb-8">
          <h3 className="text-lg font-medium text-left text-gray-800 mb-4">{question}</h3>
          <input
            type="file"
            name={id}
            onChange={e => handleFileChange(id, e)}
            className="w-full text-gray-600"
          />
          {formData[id] && (
            <p className="mt-2 text-gray-600 text-left">
              {language === 'mr' ? 'फाइल निवडली: ' : 'File selected: '} {formData[id].name}
            </p>
          )}
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
          <p className="text-gray-600 mb-6 whitespace-pre-line">
            {formConfig[`submission_message_${language}`]}
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

        <h2 className="text-lg text-center font-bold mb-4">
          {formConfig[`title_${language}`]}
        </h2>

        <div className="mb-4">{renderField(currentField)}</div>

        {apiError && (
          <p className="text-red-500 text-sm mt-2 text-center">{apiError}</p>
        )}

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