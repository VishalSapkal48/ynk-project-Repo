import React, { useState,useEffect } from 'react';
import logo from '../../assets/logo.png';

const formConfig = {
  id: 'shop_measurements_form',
  title_mr: 'शॉप मोजमाप फॉर्म',
  title_en: 'Shop Measurements Form',
  fields: [
    {
      id: 'shop_shutter_size',
      question_mr: 'शॉप शटर साइज काय आहे?',
      question_en: 'What is the shop shutter size?',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 10 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 90 }
      ]
    },
    {
      id: 'flooring_size',
      question_mr: 'फ्लोरिंग साइज घेणे',
      question_en: 'Flooring Size',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 10 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 90 },
        {
          id: 'left_wall',
          label_mr: 'डाव्या बाजूची भिंत',
          label_en: 'Left Wall',
          type: 'measurement',
          subfields: [
            { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 90 }
          ]
        },
        {
          id: 'right_wall',
          label_mr: 'उजव्या बाजूची भिंत',
          label_en: 'Right Wall',
          type: 'measurement',
          subfields: [
            { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 200 }
          ]
        },
        {
          id: 'back_wall',
          label_mr: 'पाठीमागील भिंत',
          label_en: 'Back Wall',
          type: 'measurement',
          subfields: [
            { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 50 }
          ]
        },
        {
          id: 'wall_heights',
          label_mr: 'भिंतींची उंची',
          label_en: 'Wall Heights',
          type: 'measurement',
          subfields: [
            { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 50 }
          ]
        },
        {
          id: 'wall_total_sqft',
          label_mr: 'भिंतींचे एकूण चौरस फूट',
          label_en: 'Wall Total sq ft',
          type: 'measurement',
          subfields: [
             { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 50 }
          ]
        }
      ]
    },
    {
      id: 'pop_size',
      question_mr: 'शॉप pop साइज घेणे',
      question_en: 'Shop POP Size',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 50 }
      ]
    },
    {
      id: 'ceiling_size',
      question_mr: 'शॉप सीव्हिलिंग',
      question_en: 'Shop Ceiling',
      type: 'measurement',
      subfields: [
         { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 50 }
      ]
    },
    {
      id: 'shutter_size_2',
      question_mr: 'शॉप शटर',
      question_en: 'Shop Shutter',
      type: 'measurement',
      subfields: [
         { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 15 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 50 }
      ]
    },
    {
      id: 'extra_electrical',
      question_mr: 'एक्स्ट्रा इलेक्ट्रिकल',
      question_en: 'Extra Electrical',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 1 }
      ]
    },
    {
      id: 'main_board_letter_size',
      question_mr: 'मेन बोर्ड लेटर साइज घेणे',
      question_en: 'Main Board Letter Size',
      type: 'measurement',
      subfields: [
      { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 10 },
            { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
            { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 90 }
      ]
    },
    {
      id: 'main_board_acp_panel',
      question_mr: 'मेन बोर्ड acp पॅनल साइझ (board)',
      question_en: 'Main Board ACP Panel Size (board)',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 5 },
        {
          id: 'heights',
          label_mr: 'उंची',
          label_en: 'Heights',
          type: 'measurement',
          subfields: [
            { id: 'height_1', label_mr: '', label_en: 'He', value: 1 },
          
          ]
        },
        {
          id: 'total_sqft',
          label_mr: 'एकूण चौरस फूट',
          label_en: 'Total sq ft',
          type: 'measurement',
          subfields: [
           
            { id: 'total_sqft_6', label_mr: '', label_en: ' ', value: 50 }
          ]
        }
      ]
    },
    {
      id: 'ceiling_details',
      question_mr: 'ceiling',
      question_en: 'Ceiling Details',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 1 },
        { id: 'top_side_length', label_mr: 'वरची बाजू लांबी (फूट)', label_en: 'Top Side Length (ft)', value: 1 },
        { id: 'left_right_sides_length', label_mr: 'डावी आणि उजवी बाजू लांबी (फूट)', label_en: 'Left and Right Two Sides Length (ft)', value: 1 },
        { id: 'canopy_length', label_mr: 'कॅनोपी लांबी (फूट)', label_en: 'Canopy Length (ft)', value: 1 },
        { id: 'back_side_length', label_mr: 'मागची बाजू लांबी (फूट)', label_en: 'Back Side Length (ft)', value: 1 },
        { id: 'shop_partition_length', label_mr: 'शॉप पार्टिशन लांबी (फूट)', label_en: 'Shop Partition Length (ft)', value: 1 },
        {
          id: 'heights',
          label_mr: 'उंची',
          label_en: 'Heights',
          type: 'measurement',
          subfields: [
           
            { id: 'height_6', label_mr: '', label_en: '', value: 1 }
          ]
        },
        {
          id: 'total_sqft',
          label_mr: 'एकूण चौरस फूट',
          label_en: 'Total sq ft',
          type: 'measurement',
          subfields: [
            
            { id: 'total_sqft_6', label_mr: '', label_en: '', value: 1 }
          ]
        }
      ]
    },
    {
      id: 'potmala_partition',
      question_mr: 'potmala partition',
      question_en: 'Potmala Partition',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 1 },
        { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
        { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 1 }
      ]
    },
    {
      id: 'other_partition',
      question_mr: 'other partition',
      question_en: 'Other Partition',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 1 },
        { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
        { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 1 }
      ]
    },
    {
      id: 'shutter_patta',
      question_mr: 'shutter patta',
      question_en: 'Shutter Patta',
      type: 'measurement',
      subfields: [
        { id: 'length', label_mr: 'लांबी (फूट)', label_en: 'Length (ft)', value: 1 },
        { id: 'height', label_mr: 'उंची (फूट)', label_en: 'Height (ft)', value: 1 },
        { id: 'total_sqft', label_mr: 'एकूण चौरस फूट', label_en: 'Total sq ft', value: 1 }
      ]
    }
  ],
  submit_button_mr: 'सबमिट करा',
  submit_button_en: 'Submit',
  navigation_buttons: {
    back_mr: 'मागे',
    back_en: 'Back',
    next_mr: 'पुढे',
    next_en: 'Next'
  },
  submission_message_mr: `
सर आपले खूप खूप धन्यवाद की आपण वरील पूर्ण माहिती आम्हाला दिली आहे आम्ही तुम्हाला प्रोजेक्ट साठी लागणार.
  `,
  submission_message_en: `
Thank you very much, sir, for providing us with all the above information. We will use it for your project.
  `
};

export default function ShopMeasurementsForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('mr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalQuestions = formConfig.fields.length;

  // Initialize formData with default values from formConfig
  useEffect(() => {
    const initialFormData = {};
    const initializeFormData = (fields, parentId = '') => {
      fields.forEach((field) => {
        const id = parentId ? `${parentId}_${field.id}` : field.id;
        if (field.subfields) {
          field.subfields.forEach((subfield) => {
            const subId = `${id}_${subfield.id}`;
            if (subfield.type === 'measurement' && subfield.subfields) {
              initializeFormData(subfield.subfields, subId);
            } else {
              initialFormData[subId] = subfield.value || '';
            }
          });
        }
      });
    };
    initializeFormData(formConfig.fields);
    setFormData(initialFormData);
  }, []);

  const handleTextChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Final submission:', formData);
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderField = (field, parentId = '') => {
    const question = field[` question_${language}`] || field.question_mr;
    const id = parentId ? `${parentId}_${field.id}` : field.id;

    if (field.type === 'measurement') {
      return (
        <div key={id} className="mb-8">
    
             <h3 className="text-xl mb-6 text-gray-800 text-left">{question}</h3>

          <div className="flex flex-wrap gap-4">
            {field.subfields?.map((subfield) => {
              const subfieldLabel = subfield[`label_${language}`] || subfield.label_mr;
              const subId = `${id}_${subfield.id}`;

              if (subfield.type === 'measurement' && subfield.subfields) {
                // Render nested subfields recursively
                return (
                  <div key={subId} className="flex flex-col text-left">
                    <label className=" text-gray-600 text-lg mb-2">{subfieldLabel}</label>
                    <div className="flex  flex-wrap gap-4">
                      {subfield.subfields.map((nestedField) => {
                        const nestedLabel = nestedField[`label_${language}`] || nestedField.label_mr;
                        const nestedId = `${subId}_${nestedField.id}`;
                        return (
                          <div key={nestedId} className="flex flex-col items-center">
                            <label className="text-gray-600 text-lg mb-2">{nestedLabel}</label>
                            <input
                              type="number"
                              name={nestedId}
                              value={formData[nestedId] ?? nestedField.value}
                              onChange={(e) => handleTextChange(nestedId, e.target.value)}
                              className="w-24 border-2 border-gray-200 rounded-lg p-2 text-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <div key={subId} className="flex flex-col">
                  <label className="text-gray-600 text-lg mb-2">{subfieldLabel}</label>
                  <input
                    type="number"
                    name={subId}
                    value={formData[subId] ?? subfield.value}
                    onChange={(e) => handleTextChange(subId, e.target.value)}
                    className="w-24 border-2 border-gray-200 rounded-lg p-2 text-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex bg-[#e3f2fd]">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex mx-auto mb-4">
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
          {formConfig[`title_${language}`]}
        </h2>

        {/* Current Question */}
        <div className="mb-4">{renderField(currentField)}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            className="text-gray-500 underline disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
          >
            {formConfig.navigation_buttons?.[`back_${language}`] ||
              (language === 'mr' ? 'मागे' : 'Back')}
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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